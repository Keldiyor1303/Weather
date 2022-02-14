let lat = 41
let lon = 69
let apiKey = "956d8530de044c974cf895d490c8b058"


let nolinchi = []
let birinchi = []
let ikkinchi = []
let uchinchi = []
let turtinchi = []
let beshinchi = []


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

    renderDay(data.list)
}

getWeather()


function renderDay(list) {

    let today = list[0]["dt_txt"].split(" ")[0].slice(-2)

    list.forEach(element => {
        let day = element["dt_txt"].split(" ")[0].slice(-2)
        let ayirma = day - today

        switch (ayirma) {
            case 0:
                nolinchi.push(element)
                break
            case 1:
                birinchi.push(element)
                break
            case 2:
                ikkinchi.push(element)
                break
            case 3:
                uchinchi.push(element)
                break
            case 4:
                turtinchi.push(element)
                break
            case 5:
                beshinchi.push(element)
                break
        }
    })

    const day1 = document.querySelector(".day1")
    const day2 = document.querySelector(".day2")
    const day3 = document.querySelector(".day3")
    const day4 = document.querySelector(".day4")
    const day5 = document.querySelector(".day5")
    const day6 = document.querySelector(".day6")
    console.log(nolinchi);

    renDay(nolinchi, day1)
    renDay(birinchi, day2)
    renDay(ikkinchi, day3)
    renDay(uchinchi, day4)
    renDay(turtinchi, day5)
    renDay(beshinchi, day6)

    day1.addEventListener("click", function () {
        renderList(nolinchi)
        hidden()
    })

    day2.addEventListener("click", function () {
        renderList(birinchi)
        hidden()
    })

    day3.addEventListener("click", function () {
        renderList(ikkinchi)
        hidden()
    })

    day4.addEventListener("click", function () {
        renderList(uchinchi)
        hidden()
    })

    day5.addEventListener("click", function () {
        renderList(turtinchi)
        hidden()
    })

    day6.addEventListener("click", function () {
        renderList(beshinchi)
        hidden()
    })
}

const aside = document.querySelector("aside")
const main = document.querySelector(".days-info")
const back = document.querySelector(".back")

function hidden() {
    aside.classList.remove("hiddenAside")
    main.classList.add("hiddenMain")
}

back.addEventListener("click", function () {
    aside.classList.add("hiddenAside")
    main.classList.remove("hiddenMain")
})



function renDay(array, day) {
    let element = array[0]
    let monthDay = element["dt_txt"].split(" ")[0]

    const html = ` 
            <div>
                <img src="http://openweathermap.org/img/wn/${element.weather[0].icon}.png" alt="">
                <p>${monthDay}</p>
            </div>
            <h3>${(element.main.temp - 273).toFixed(0)}°</h3>
            <h4>${element.weather[0].main}</h4>
            <div class="wind">
            <p>Wind</p>
                <p>|</p>
                <p>${element.wind.speed.toFixed(1)}km/h</p>
            </div>       
        `

    day.insertAdjacentHTML("beforeend", html)
}





const weatherList = document.querySelector(".weather")

function renderList(list) {

    const h1 = document.querySelector(".info h1")

    h1.innerHTML = `Weather forecast for ${list[0]["dt_txt"].split(" ")[0].slice(-5)}`


    weatherList.innerHTML = null

    list.forEach(element => {

        const li = ` 
            <div class="day-weather">
                <img src="http://openweathermap.org/img/wn/${element.weather[0].icon}.png" alt="">

                <div class="temp">
                    <p>${element["dt_txt"].split(" ")[1]}</p>
                    <h3>${(element.main.temp).toFixed(0) - 273}°</h3>
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