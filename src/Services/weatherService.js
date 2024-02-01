const API_KEY = 'd5fd0bf5ecb574540fc0f91eaa395dee'; //authenticate and authorize access to the OpenWeatherMap API.
const BASE_URL = 'https://api.openweathermap.org/data/2.5'// declares another constant variable BASE_URL and assigns it the base URL of the OpenWeatherMap API. It specifies the version and subpath of the API that will be used to make requests.

const getWeatherData = (infoType, searchParams) => { //defines a function named getWeatherData that takes two parameters: infoType and searchParams. This function is responsible for fetching weather data from the OpenWeatherMap API.
    const url = new URL(BASE_URL + '/' + infoType) //It represents the specific endpoint for retrieving weather data based on the provided infoType parameter.
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY }) // This line sets the search property of the URL object. It uses the URLSearchParams constructor to create a query string with the provided searchParams object, including the API_KEY as the appid parameter.
    //appid: This is the API key used for authentication and authorization to access the OpenWeatherMap API
    console.log(url);
    return fetch(url)
        .then((res) => res.json())
        .then((data) => data)
    //makes an HTTP GET request to the constructed URL using the fetch function.
    // It sends the request to the OpenWeatherMap API and retrieves the response. 
    //The response is then converted to JSON format using the json() method. 
    //The resulting data is returned from the function.
}

const formatCurrentWeather = (data) => {
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed }
    } = data

    const { main: details, icon } = [0]

    return { lat, lon, temp, feels_like, temp_max, humidity, country, sunrise, sunset, details, icon, speed }
};

const formatForecastWeather = (data) => {
    let { timezone, daily, hourly } = data;
    daily = daily.slice(1, 6).map((d) => {
        return {
            title: formatToLocalTime(d.dt, timezone, "ccc"),
            temp: d.temp.day,
            icon: d.weather[0].icon,
        }
    });

    hourly = hourly.slice(1, 6).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
            temp: d.temp.day,
            icon: d.weather[0].icon
        }
    });
    return { timezone, daily, hourly }
};

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData //This line calls the getWeatherData function with the infoType set to 'weather' and the provided searchParams. 
        ('weather', searchParams).then(formatCurrentWeather)


    const { lat, lon } = formattedCurrentWeather

    const formattedForecastWeather = await getWeatherData('onecall', {
        lat, lon, exclude: "current,minutely,alerts",
        units: searchParams.units,

    }).then(formatForecastWeather);
    return { ...formattedCurrentWeather, ...formattedForecastWeather }
}

const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
export default getFormattedWeatherData