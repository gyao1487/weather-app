// Base URL https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
//Variables for search
let apiKey = '07273bd334fb0fc1e5cfb2d14612ce3f'
let weatherApiRootURL = 'https://api.openweathermap.org';
let input = document.getElementById('input')
let searchBtn = document.getElementById('submit')
//Elements for main card
let currentDay = document.getElementById('main-card')
let cityName = document.getElementById('cityName');
let date = document.getElementById("current-date");
let iconMain = document.getElementById('main-icon');
let temp = document.getElementById('main-temp');
let wind = document.getElementById('main-wind');
let humidity = document.getElementById('main-humidity');
let currentDate = moment().format('MMMM Do YYYY')
//Elements for Day 1 Card
let date1 = document.getElementById("f1-date");
let icon1 = document.getElementById('f1-icon');
let temp1 = document.getElementById('f1-temp');
let wind1 = document.getElementById('f1-wind');
let humidity1 = document.getElementById('f1-humidity');
//Elements for Day 2 Card
let date2 = document.getElementById("f2-date");
let icon2 = document.getElementById('f2-icon');
let temp2 = document.getElementById('f2-temp');
let wind2 = document.getElementById('f2-wind');
let humidity2 = document.getElementById('f2-humidity');
//Elements for Day 3 Card
let date3 = document.getElementById("f3-date");
let icon3 = document.getElementById('f3-icon');
let temp3 = document.getElementById('f3-temp');
let wind3 = document.getElementById('f3-wind');
let humidity3 = document.getElementById('f3-humidity');
//Elements for Day 4 Card
let date4 = document.getElementById("f4-date");
let icon4 = document.getElementById('f4-icon');
let temp4 = document.getElementById('f4-temp');
let wind4 = document.getElementById('f4-wind');
let humidity4 = document.getElementById('f4-humidity');
//Elements for Day 5 Card
let date5 = document.getElementById("f5-date");
let icon5 = document.getElementById('f5-icon');
let temp5 = document.getElementById('f5-temp');
let wind5 = document.getElementById('f5-wind');
let humidity5 = document.getElementById('f5-humidity');

//=====SEARCH BUTTON STARTS FUNCTIONS TO GET DATA AND SAVE TO STORAGE=====
searchBtn.addEventListener('click', start)
let weatherDisplay = document.querySelector('.weather-display')
function showResults () {
    weatherDisplay.style.display = "grid";
}
function start() {
    saveStorage();
    getResults();
    showResults();
}

//=========================INITIAL DATA FETCH=========================
function getResults() {
    let city = input.value;
    let cityUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
    fetch(cityUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data[0]);
            weatherData(data[0].lat, data[0].lon);
            cityName.textContent = data[0].name;
        })
}

//=====DATA FETCH WITH LAT AND LON AND POPULATE ALL CARDS WITH WEATHER DATA======
function weatherData(lat, lon) {
    let coordsUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

    fetch(coordsUrl)
        .then((response) => response.json())
        .then((data) => {
            //Main Card
            date.textContent = currentDate
            temp.textContent = data.list[0].main.temp + '\u00B0 F';
            wind.textContent = 'Wind Speed:' + data.list[0].wind.speed;
            humidity.textContent = 'Humidity:' + data.list[0].main.humidity;
            iconMain.src = 'http://openweathermap.org/img/wn/' + data.list[0].weather[0].icon + '@2x.png';
            //Day 1 Card
            date1.textContent = moment().add(1,'days').format('MMMM Do');
            temp1.textContent = data.list[6].main.temp + '\u00B0 F';
            wind1.textContent = 'Wind Speed:' + data.list[7].wind.speed;
            humidity1.textContent = 'Humidity:' + data.list[7].main.humidity;
            icon1.src = 'http://openweathermap.org/img/wn/'+data.list[7].weather[0].icon+'@2x.png';
            //Day 2 Card
            date2.textContent = moment().add(2,'days').format('MMMM Do');
            temp2.textContent = data.list[12].main.temp + '\u00B0 F';
            wind2.textContent = 'Wind Speed:' + data.list[12].wind.speed;
            humidity2.textContent = 'Humidity:' + data.list[12].main.humidity;
            icon2.src = 'http://openweathermap.org/img/wn/'+data.list[12].weather[0].icon+'@2x.png';
            //Day 3
            date3.textContent = moment().add(3,'days').format('MMMM Do');
            temp3.textContent = data.list[18].main.temp + '\u00B0 F';
            wind3.textContent = 'Wind Speed:' + data.list[18].wind.speed;
            humidity3.textContent = 'Humidity:' + data.list[18].main.humidity;
            icon3.src = 'http://openweathermap.org/img/wn/'+data.list[18].weather[0].icon+'@2x.png';
            //Day 4
            date4.textContent = moment().add(4,'days').format('MMMM Do');
            temp4.textContent = data.list[24].main.temp + '\u00B0 F';
            wind4.textContent = 'Wind Speed:' + data.list[24].wind.speed;
            humidity4.textContent = 'Humidity:' + data.list[24].main.humidity;
            icon4.src = 'http://openweathermap.org/img/wn/'+data.list[24].weather[0].icon+'@2x.png';
            //Day 5 
            date5.textContent = moment().add(5,'days').format('MMMM Do');
            temp5.textContent = data.list[30].main.temp + '\u00B0 F';
            wind5.textContent = 'Wind Speed:' + data.list[30].wind.speed;
            humidity5.textContent = 'Humidity:' + data.list[30].main.humidity;
            icon5.src = 'http://openweathermap.org/img/wn/'+data.list[30].weather[0].icon+'@2x.png';
        })
};




//========================= PUSHING PAST SEARCHES TO STORAGE =========================
let pastSearches = document.getElementById('past-searches')
function saveStorage() {
    let searchedCities;

    if (localStorage.getItem('searches')) {
        searchedCities = [].concat(localStorage.getItem('searches'));
    } else {
        searchedCities = []
    }

    if (input.value){
    searchedCities.push(input.value);
    localStorage.setItem('searches', searchedCities);}
};

//====================== DISPLAYING BUTTONS FOR PAST SEARCHES ======================
function displayPastSearches() {
    let searches = localStorage.getItem('searches').split(",");
    console.log(searches);
    //Only display buttons for locations that have not been searched before - prevent duplicate buttons
    let uniqueSearches = [];
    searches.forEach((element) => {
        if (!uniqueSearches.includes(element)) {
            uniqueSearches.push(element);
        }
    });
    //Append Buttons for each unique search
    uniqueSearches.forEach(search => {
        let button = document.createElement('button');
        button.textContent = search;
        document.getElementById('past-searches').append(button);

    })
}
displayPastSearches()

//=================== FETCH & DISPLAY DATA WHEN CLICKING PAST SEARCH BUTTON =================== 
pastSearches.addEventListener('click', function (event) {
    input.value = event.target.textContent;
    getResults();
})

;
