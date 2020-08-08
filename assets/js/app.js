// variables


var todaysDate = moment().format('');
var listCity = [];
var cityContainerEl = $("#city-container");
var enteredCity = $("#enteredCity")
var temp = $("#temp");
var uvi = $("#uvi");
var searchBtn = $("#searchBtn")
var lastCity = "";


const currentCity = {
    name: '',
    date: '',
    icon: '',
    temperature: '',
    humidity: '',
    windSpeed: '',
    uvIndex: ''
}



// ajax call to get today's weather by cityname,lat,long
function populateCurrentCity(currentCity) {
    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather?q=' + currentCity + '&appid=762a77dec0a17de9f05c06c1b4ac67f4',
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
            let imageIcon = response.weather
            let imageUrl = "https://openweathermap.org/img/w/" + imageIcon + ".png";

            $("#weatherImage").attr("src", imageUrl);

            $("#enteredCity").html(response.name + " (' todaysDate +')");
            $("#temperature").text("Temperature: " + response.main.temp);
            $("#humidity").text("Humidity: " + response.main.humidity);
            $("#windspeed").text("Windspeed:" + response.wind.speed);
            $(".today-header").text(cityName);

            let latittude = response.coord.lat;
            let longitude = repsonse.coord.lon;


            // ajax call to get uv index
            $.ajax({
                url: 'http://api.openweathermap.org/data/2.5/uvi?&appid=762a77dec0a17de9f05c06c1b4ac67f4=' + latittude + '&lon=' + longitude,
                method: "GET"
            })
                .then(function (response) {
                    console.log(response);

                    let uvIndex = response.value;

                    $("#uv").append(`uv index: <span class="uvspan"> ${uvIndex}</span>`);

                    if (uvIndex < 3) {
                        $(".uvspan").addClass("good");
                    }
                    else if (uvIndex > 2 && uvIndex < 8) {
                        $(".uvspan").addClass("medium");
                    }
                    else {
                        $(".uvspan").addClass("bad");
                    }

                    
                
        

        
            $.ajax({
                url: 'http://api.openweathermap.org/data/2.5/forecast?q=chicago&appid=762a77dec0a17de9f05c06c1b4ac67f4',
                method: "GET"
            })
                .then(function (response) {
                    localStorage.setItem("listCity", cityName);
                    console.log(response);
                    let dayOneImg = response.list[5].weather[0].icon;
                    // 13,21,29,37,
                    let dayOneImgUrl = "https://openweathermap.org/img/w/" + dateOneImage + ".png";

                    /*let fiveDay = response.value;

                    $("#fiveDay").append(`Five Day Forecast: <span class="fiveday"> ${fiveDay}</span>`);

                    $(".today-header").text('todaysDate +');
                    $("#enteredCity").html(response.name + " (' todaysDate +')");
                    let imageIcon = response.weather
                    let imageUrl = "https://openweathermap.org/img/w/" + imageIcon + ".png";
                    $("#fweatherImage").attr("src", imageUrl);

                    $("#ftemperature").text("Temperature: " + response.main.temp);
                    $("#fhumidity").text("Humidity: " + response.main.humidity);



                    let latittude = response.coord.latittude;
                    let longitude = repsonse.coord.longe;
                    */
                })
            })
        })


        

}
populateCurrentCity("chicago");

