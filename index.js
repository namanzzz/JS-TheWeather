const apikey = "5504d620db9211c798e61b807f51c43a"
const weatherDataEl = document.getElementById('weather-data')
const cityInputEl = document.getElementById('city-input')

const formEl = document.querySelector('form')
formEl.addEventListener("submit", (event)=>{
event.preventDefault();
const cityValue = cityInputEl.value;
// console.log(cityValue)
getWeatherData(cityValue)

})


async function getWeatherData(cityValue){
   try {
       const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)
       console.log(response)

    if(!response.ok){
        throw new Error("Network Response was not Ok")
    }

    const data = await response.json()
    console.log(data)

    const temperature = Math.round(data.main.temp)
    const description = data.weather[0].description
    const icon = data.weather[0].icon 
    const details=[
        ` Feels like ${Math.round(data.main.feels_like)}°C
        `,
        `Country: ${data.sys.country}
        `,
        `wind Speed: ${data.wind.speed}m/s
        `
    ] 
       weatherDataEl.querySelector('.icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
       weatherDataEl.querySelector('.temperature').textContent = `${temperature}°C`;
       weatherDataEl.querySelector('.description').textContent =`${description}`;
       
       weatherDataEl.querySelector('.details').innerHTML = details.map((detail)=>
        ` <div>${detail}</div>`
       ).join("");


   } catch (error) {
    
   }
}