


const todaysDate = moment().format('');
const listCity = [];
const cityContainerEl = $("#cityContainer");
const enteredCity = $("#enteredCity")
const temp = $("#temp");
const uvi = $("#uv");
const searchBtn = $("#searchBtn")
let lastCity = "";
let city = listCity.values();
const currentCity = {
    name: '',
    date: '',
    icon: '',
    temperature: '',
    humidity: '',
    windSpeed: '',
    uvIndex: ''
}



function populateCurrentCity(currentCity) {

    $.ajax({
        url: `http://api.openweathermap.org/data/2.5/weather?q=${enteredCity.val()}&appid=99c551b81296e62a1c47edacba59e365`,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        let imageIcon = response.weather
        let imageUrl = "https://openweathermap.org/img/w/" + imageIcon + ".png";
        let lat = response.coord.lat;
        let lon = response.coord.lon;




        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely&appid=99c551b81296e62a1c47edacba59e365`,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);
                $(".current-header").text(currentCity);
                $("#enteredCity").html(response.name + response.current.dt);
                $("#temperature").text("Temperature:" + response.current.temp);
                $("#weatherImage").attr("src", response.current.weather.icon);
                $("#humidity").text("Humidity:" + response.current.humidity);
                $("#windspeed").text("Windspeed:" + response.current.wind_speed);


                let uvIndex = response.current.uvi;

                $("#uv").append(`UV Index: <span class="uvspan"> ${uvIndex}</span>`);

                if (uvIndex < 3) {
                    $(".uvspan").addClass("good");
                }
                else if (uvIndex > 2 && uvIndex < 8) {
                    $(".uvspan").addClass("medium");
                }
                else {
                    $(".uvspan").addClass("bad");

                    enteredCity.val((localStorage.getItem(city)));
                }

                
                    function renderForecast(currentCity) {
                        let dayOneImg = response.daily[0];

                        let dayOneImgUrl = "https://openweathermap.org/img/w/" + dayOneImg + ".png";
    
                        let dayTwoImg = response.daily[1];
    
                        let dayTwoImgUrl = "https://openweathermap.org/img/w/" + dayTwoImg + ".png";
    
                        let dayThreeImg = response.daily[2];
    
                        let dayThreeImgUrl = "https://openweathermap.org/img/w/" + dayThreeImg + ".png";
    
                        let dayFourImg = response.daily[3];
    
                        let dayFourImgUrl = "https://openweathermap.org/img/w/" + dayFourImg + ".png";
    
                        let dayFiveImg = response.daily[4];
    
                        let dayFiveImgUrl = "https://openweathermap.org/img/w/" + dayFiveImg + ".png";
                    }


                    
                });


    })


}

$(document).on("click", "#searchBtn", function (e) {
    e.preventDefault();
    console.log("city: ", enteredCity.val());
    populateCurrentCity(enteredCity.val());
    listCity.push(enteredCity.val());
    cityContainerEl.empty();
    for (let city of listCity) {
        cityContainerEl.append(`
            <li class="cityRecord">${city}</li>
        `)
    }
    localStorage.setItem(city, enteredCity.val());
        console.log(enteredCity.val());
})