const API_KEY = "1b8991d27fc8ec289220768ce99015af";
STATUS_TO_IMAGE = {}
   
const myForm = document.getElementById("myForm")
myForm.addEventListener('keyup', ({key}) => {
    if (key === "Enter") {
        getTemp();
    }
})

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getTemp);
    }
}


const getTemp = (position = '') => {
    user_in = document.getElementById("city").value;
    
    if (position == '') {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${user_in}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => parseShowData(data))
        .catch(msg => {
            // console.log("error in parsing data")
        })
    } else {
        console.log(`${position.coords.latitude}, ${position.coords.longitude}`)
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(parseShowData)
        .catch(msg => {
            // console.log("error in parsing data")
        })
    
    }
}

function parseShowData(data) {
    console.log(data)
    const city_name = data.name;
    const temp_max = kToF(data.main.temp_max);
    const temp_min = kToF(data.main.temp_min);
    const humidity = data.main.humidity;
    const forcast_title = data.weather[0].main;
    const forcast_dets = data.weather[0].description;
    const feels_like = kToF(data.main.feels_like);

 
    const city_title = document.getElementById('city-title')
    const weather_texts = document.querySelectorAll('p')
    const forcast_header = document.querySelector('h4');
    const weather_icon = document.getElementById('weather-icon')

   
    city_title.innerHTML = city_name
    weather_texts[0].innerHTML = `${temp_max} °F`
    weather_texts[1].innerHTML = `${temp_min} °F`
    weather_texts[2].innerHTML = `${humidity}%`
    forcast_header.innerHTML = forcast_title
    weather_texts[3].innerHTML = forcast_dets;
    weather_icon.src = STATUS_TO_IMAGE[forcast_title];
    weather_texts[4].innerHTML = `${feels_like} °F`
}

function kToF(kelvin) {
    const rawF = (kelvin - 273.15) * (9/5) + 32;
    return (Math.round(rawF * 100) / 100).toFixed(2)
}