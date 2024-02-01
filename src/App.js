import './App.css';
import TopButtons from './Component/TopButtons';
import Inputs from './Component/Inputs'
import TimeandLocation from './Component/TimeandLocation';
import TemperatureAndDetails from './Component/TemperatureAndDetails';
import Forecast from './Component/Forecast';
// import getWeatherData from './Services/weatherService';
import getFormattedWeatherData from './Services/weatherService';
// import UilReact from '@iconscout/react-unicons/icons/uil-react';

function App() {

  const fetchWeather = async () => {    // defines an asynchronous function named fetchWeather. The async keyword indicates that the function will use await to handle promises asynchronously.
    const data = await getFormattedWeatherData({ q: 'london' }); // This line calls the getFormattedWeatherData function with the infoType set to 'weather' and the 
    //searchParams object specifying the city as London (q: 'london'). this makes use of both the infoType and the searchParam
    console.log(data);
  }
  fetchWeather();
  return (
    <div className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400">

      <TopButtons />
      <Inputs />

      <TimeandLocation />
      <TemperatureAndDetails />

      <Forecast title='hourly forecast' />
      <Forecast title='daily forecast' />
    </div>
  );
}

export default App;
