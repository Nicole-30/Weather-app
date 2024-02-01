import React from 'react';

function TopButtons() {


    const cities = [
        {
            id: 1,
            title: 'Paris'
        },
        {
            id: 2,
            title: 'Toronto'
        },
        {
            id: 3,
            title: 'New York'
        },
        {
            id: 4,
            title: 'Tokyo'
        },
        {
            id: 5,
            title: 'Sydney'
        },
        {
            id: 6,
            title: 'London'
        },
    ]
    return (
        <div className='flex items-center justify-around my-6'>
            {cities.map((city)=>{
               return <button className='text-white text-lg font-medium'>{city.title}</button> 
            })}
        </div>
    );
}

export default TopButtons;
