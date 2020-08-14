

const dailyContent = $("#daily-content");
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
    }).then(function (res) {
        console.log(res);
        let imageIcon = res.weather
        let imageUrl = "https://openweathermap.org/img/w/" + imageIcon + ".png";
        let lat = res.coord.lat;
        let lon = res.coord.lon;




        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely&appid=99c551b81296e62a1c47edacba59e365`,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);
                $(".current-header").text(currentCity);
                $("#weatherImage").html(`${res.name}, ${new Date(response.current.dt * 1000).toDateString()}`);
                $("#temperature").text("Temperature:" + response.current.temp);
                var currentIcon = response.current.weather[0].icon;
                var currentIconURL = "http://openweathermap.org/img/wn/" + currentIcon + "@2x.png";
                $(".current-icon").append("<img src='" + currentIconURL + "' />" ); 
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



 
                const renderForecast = function() {
                    let dailyHTML = "";
                    for (let day of response.daily.slice(1,6)) {
                        dailyHTML += `
                            <div class="card">
                                <div class="card-body">
                                    <p>${new Date(day.dt * 1000).toDateString()}</p>
                                    <p>Temp:${day.temp.day}</p>
                                    <img src="https://openweathermap.org/img/w/${day.weather[0].icon}.png"  SameSite=None; secure;>
                                    <p>Humidity:${day.humidity}</p>
                                   
                                </div>
                            </div>
                        `
                    }
                    console.log(dailyHTML);
                    dailyContent.html(dailyHTML);
                        
                };

                renderForecast(currentCity);
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

