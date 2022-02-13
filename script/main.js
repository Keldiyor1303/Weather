let lat = 41
let lon = 69
let apiKey = "956d8530de044c974cf895d490c8b058"



const getWeather = async function () {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const { latitude, longitude } = position.coords

            lat = latitude
            lon = longitude
            console.log(lat, lon);
        })
    }

    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)

    const data = await response.json()

    renderList(data)
}

getWeather()

const weatherList = document.querySelector(".weather")

function renderList(data) {
    console.log(data);

    const list = data.list

    list.forEach(element => {

        const li = ` 
            <div class="day-weather">
                <img src="http://openweathermap.org/img/wn/${element.weather[0].icon}.png" alt="">

                <div class="temp">
                    <p>${element["dt_txt"]}</p>
                    <h3>${(element.main.temp - 273).toFixed(0)}°</h3>
                    <h4>${element.weather[0].main}</h4>

                    <div class="wind">
                        <img src="./img/wind.png" alt="" width="24px" height="24px">
                        <p>Wind</p>
                        <p>|</p>
                        <p>${element.wind.speed.toFixed(1)}km/h</p>
                    </div>
                </div>
            </div>        
        `

        weatherList.insertAdjacentHTML("beforeend", li)
    })
}


// let today = new Date().getHours()
// console.log(today);

// http://openweathermap.org/img/wn/04d.png