const apikey=`5beae5a342742cb46d80fb23c77d89c3`;



async function fetchWeatherData(city){
   try{
    const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`  );
if(!response.ok){
    throw new Error("Unable to Fetch Weather Data");
}
   const data = await response.json();
   console.log(data);
//     console.log(data.main.temp);
//      console.log(data.name);
//       console.log(data.wind.speed);
//        console.log(data.main.humidity);
//         console.log(data.visibility);
        updateWeatherUI(data);
   }
   catch(error){
    console.error(error)
   }

}
const cityElement = document.querySelector(".city");
const temperature = document.querySelector("#temp");
const windSpeed = document.querySelector(".windspeed");
const humidity = document.querySelector(".humidity-1"); // matches HTML
const visibility = document.querySelector(".visibilitydis"); // matches HTML
const descriptionText = document.querySelector(".desctext");
const date = document.querySelector(".date");
const descriptionIcon = document.querySelector("#description i"); // FIXED

// fetchWeatherData();
function updateWeatherUI(data) {
    cityElement.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    windSpeed.textContent = `${data.wind.speed} km/h`;
    humidity.textContent = `${data.main.humidity}%`;
    visibility.textContent = `${(data.visibility) / 1000} km`;
    descriptionText.textContent = data.weather[0].description;

    const currentDate = new Date();
    date.textContent = currentDate.toDateString();

    // set correct weather icon
    const weatherIconName = getWeatherIconName(data.weather[0].main);
    descriptionIcon.className = weatherIconName; // swap icon class
}


    const formElement= document.querySelector(".searchform");
    const inputElement = document.querySelector(".searchinput");

    formElement.addEventListener(`submit`, function(e){
        e.preventDefault();

       const city= inputElement.value;
       if(city!==''){
        fetchWeatherData(city);
        inputElement.value="";

       }

    });

   function getWeatherIconName(weatherCondition) {
    const iconMap = {
        Clear: "ri-sun-fill",
        Clouds: "ri-cloudy-fill",
        Rain: "ri-rainy-fill",
        Drizzle: "ri-drizzle-fill",
        Thunderstorm: "ri-thunderstorms-fill",
        Snow: "ri-snowy-fill",
        Mist: "ri-foggy-fill",
        Fog: "ri-foggy-fill",
        Haze: "ri-haze-fill",
        Smoke: "ri-smoke-fill",
        Dust: "ri-dust-fill",
        Sand: "ri-earth-fill",
        Ash: "ri-fire-fill",
        Squall: "ri-windy-fill",
        Tornado: "ri-tornado-fill"
    };

    return iconMap[weatherCondition] || "ri-question-fill";
}

