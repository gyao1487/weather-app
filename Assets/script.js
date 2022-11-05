// Base URL https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
let apiKey= '07273bd334fb0fc1e5cfb2d14612ce3f'
let weatherApiRootURL= 'https://api.openweathermap.org';
let input = document.getElementById('input')
let searchBtn = document.getElementById('submit')
let currentDay = document.getElementById('main-card')


//Function starts when button is clicked
function start (){
    saveStorage();
    getResults();
}

//Function to get results based on coordinates of city
function getResults() {
 let city = input.value;
 let cityUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
    fetch(cityUrl)
        .then((response)=> response.json())
        .then((data)=> {
            console.log(data[0].lat,data[0].lon);
            weatherData(data[0].lat,data[0].lon);
        })
 

}

let cityName = document.getElementById('cityName');
let date = document.getElementById("current-date");
let icon = document.getElementById('main-icon');
let temp = document.getElementById('main-temp');
let wind = document.getElementById('main-wind');
let humidity = document.getElementById('main-humidity');
let currentDate = new Date()

//Function that populates cards with weather data
function weatherData(lat, lon) {
    let coordsUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    date.textContent=currentDate;
    fetch(coordsUrl)
        .then((response) => response.json())
        .then((data) => {
            //Main Card
            cityName.textContent = input.value;
            //icon.textContent = data.list[0].weather.icon;
            //For icon, set attribute src to the iconURL+iconId
            temp.textContent = data.list[0].main.temp +'\u00B0 F';
            wind.textContent = 'Wind Speed:'+data.list[0].wind.speed;
            humidity.textContent='Humidity:'+data.list[0].main.humidity;
            
            //   var getIconURL="https://openweathermap.org/img/wn/"+icon+"@2x.png"
        //weatherIcon.setAttribute("src",getIconURL);

            //Day 1

            //Day 2

            //Day 3

            //Day 4

            //Day 5 

        });
      
}   

//Function to display icons depending on the weather
// function displayIcons () {
//     let icons = document.getElementsByClassName('icon')
//     for (let i =0; i<icons.length;i++) {
//         if (icons[i].textContent.includes('Sunny')) {
//             icons[i].innerHTML=
//         }
//     }
        
    
//}

searchBtn.addEventListener('click',start)

let pastSearches = document.getElementById('past-searches')
//let input = document.getElementById('input')
function saveStorage() {
    let searchedCities;
    
    if(localStorage.getItem('searches')) {
        searchedCities = [].concat(localStorage.getItem('searches'));
    }else{
        searchedCities =[]
    }

    searchedCities.push(input.value);
    localStorage.setItem('searches',searchedCities);
    };

function displayPastSearches () {
    let searches = localStorage.getItem('searches').split(",")
    searches.forEach(search => {
        let button = document.createElement('button');
        button.textContent = search;
        document.getElementById('past-searches').append(button);
    })

}

pastSearches.addEventListener('click', function(event) {
    input.value = event.target.textContent;
    getResults();
})

displayPastSearches();

