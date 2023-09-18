/* 

===========WEATHER APP APP==========

*/

import React, {useState} from 'react';
import classes from './App.module.css'
import cold from './assets/cold-weather.png'
import hot from './assets/hot-weather.png'

function App() {
  
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = (e) =>{
      if (e.key === 'Enter'){
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${process.env.KEY`)
        .then(res => res.json())
        .then(result => {
          setQuery(''); 
          setWeather(result);        
        })
      }
  }

  return (

    <div className={classes.App}>    
        <main className={classes.searchContainer}>    
          <input className={classes.searchBox} type="text" placeholder="Enter the city..." onKeyPress={search} value={query} onChange={ (e) => setQuery(e.target.value) } ></input> 
        </main>
        {(typeof weather.main!= 'undefined') ? ( 
          <section className={classes.weatherContainer}>
            { ( weather.main.temp >= 8 ) ? ( 
              <div className={classes.bgContainer}>
                <img className={classes.summer} src={hot}></img> 
              </div>
              ) : (
                <div className={classes.bgContainer}>
                <img className={classes.winter} src={cold}></img> 
                </div>
              ) }
            <h1>Today's Weather: {weather.main.temp} &#176;C</h1>
            <p>Feels Like: {weather.main.feels_like}&#176;C</p>
            <p>Min: {weather.main.temp_min}&#176;C</p>
            <p>Max: {weather.main.temp_max}&#176;C</p>
            <p>Location: {weather.name}, {weather.sys.country} </p>
          </section> 
  ):(<div></div>)}
  </div>
  );
}

export default App;
