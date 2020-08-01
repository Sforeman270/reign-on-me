let todaysDate = moment().format('');
let searchArray = [];

var cityContainerEl = document.querySelector('#city-container');
var inputValue = document.querySelector('.inputValue');
var name = document.querySelector('.name');
var desc = document.querySelector('.desc');
var temp = document.querySelector('.temp');
var uvi = document.querySelector('.uvi');
var button = document.querySelector('.button');

function searchCity(cityName) {
    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather?q=' + newCity + '&appid=762a77dec0a17de9f05c06c1b4ac67f4',
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
            $(".card-header").text(cityName);

            let latittude = response.coord.latittude;
            let longitude = repsonse.coord.longe;

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

                })


            $.ajax({
                url: 'http://api.openweathermap.org/data/2.5/daily?&appid=762a77dec0a17de9f05c06c1b4ac67f4=' + latittude + '&lon=' + longitude,
                method: "GET"
            })
                .then(function (response) {
                    localStorage.setItem("cityInput", cityList);
                    console.log(response);

                    let fiveDay = response.value;

                    $("#fiveDay").append(`Five Day Forecast: <span class="fiveday"> ${fiveDay}</span>`);




                    $(".card-header").text('todaysDate +');
                    $("#enteredCity").html(response.name + " (' todaysDate +')");
                    let imageIcon = response.weather
                    let imageUrl = "https://openweathermap.org/img/w/" + imageIcon + ".png";
                    $("#weatherImage").attr("src", imageUrl);

                    $("#temperature").text("Temperature: " + response.main.temp);
                    $("#humidity").text("Humidity: " + response.main.humidity);



                    let latittude = response.coord.latittude;
                    let longitude = repsonse.coord.longe;
                })



        })


    $(".searchButton").on("click", function () {
        let cityList = $("#cityInput").val();
        searchArray.push(cityList);
        searchCities();
    })
      then(function(response) {
			console.log('Incoming data');
			console.log(response.data[0]);
			var responseContainerEl = document.querySelector('#response-container');

			responseContainerEl.innerHTML = '';

			var fiveDayImg = document.createElement('img');
			fiveDayImg.setAttribute('src', response.data[0].images.fixed_height.url);
			responseContainerEl.appendChild(fiveDayImg);
			document.querySelector('#newCity').textContent('');

			
		});
};


