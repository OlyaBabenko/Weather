let weather = {
    apiKey:'3eb3b1b3c750f64792402ba73e96b140',

    getWeather: function (city) {
        fetch(
            'https://api.openweathermap.org/geo/1.0/direct?q=' +
            city + '&units=metric&appid=' + this.apiKey
        ).then((response) => {
            if(!response.ok) {
                alert('Not found. Please repeat.');
            }
            return response.json();
        }).then((array) => {
            this.lat = array[0].lat;
            this.lon = array[0].lon;
            return [this.lat, this.lon];
        }).then((arrayNew) => {
            fetch(
                'https://api.openweathermap.org/data/2.5/forecast?lat=' +
                arrayNew[0] + '&lon=' + arrayNew[1] + '&units=metric&appid=' +
                this.apiKey
            ).then((response2) => {return response2.json()})
            .then((data) => {this.showWeather(data)});
        })

    },
    showWeather: function(data) {
        let week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        let day1 = new Date(data.list[6].dt_txt);
        let day2 = new Date(data.list[14].dt_txt);
        let day3 = new Date(data.list[22].dt_txt);
        let day4 = new Date(data.list[30].dt_txt);
        let weatherDay1 = week[day1.getDay()];
        let weatherDay2 = week[day2.getDay()];
        let weatherDay3 = week[day3.getDay()];
        let weatherDay4 = week[day4.getDay()];

        let name = data.city.name;
        let icon = data.list[0].weather[0].icon;
        let description = data.list[0].weather[0].description;
        let temp = data.list[0].main.temp;
        let humidity = data.list[0].main.humidity;
        let speed = data.list[0].wind.speed;

        document.querySelector('.city').textContent = name;
        document.querySelector('.icon').src = 'https://openweathermap.org/img/wn/' +
            icon + '.png';
        document.querySelector('.description').textContent = description;
        document.querySelector('.temperature').textContent = Math.round(temp) + '°C';
        document.querySelector('.humidity').textContent = humidity +'%';
        document.querySelector('.wind').textContent = speed + 'km/h';
        document.querySelector('.first .dayName').textContent = weatherDay1;
        document.querySelector('.second .dayName').textContent = weatherDay2;
        document.querySelector('.third .dayName').textContent = weatherDay3;
        document.querySelector('.fourth .dayName').textContent = weatherDay4;
        document.querySelector('.first .dayTemp').textContent = Math.round(data.list[6].main.temp) + '°C';
        document.querySelector('.second .dayTemp').textContent = Math.round(data.list[14].main.temp) + '°C';
        document.querySelector('.third .dayTemp').textContent = Math.round(data.list[22].main.temp) + '°C';
        document.querySelector('.fourth .dayTemp').textContent = Math.round(data.list[30].main.temp) + '°C';
        document.querySelector('.first .dayIcon').src = "https://openweathermap.org/img/wn/" +
            `${data.list[6].weather[0].icon}` + ".png";
        document.querySelector('.second .dayIcon').src = "https://openweathermap.org/img/wn/" +
            `${data.list[14].weather[0].icon}` + ".png";
        document.querySelector('.third .dayIcon').src = "https://openweathermap.org/img/wn/" +
            `${data.list[22].weather[0].icon}` + ".png";
        document.querySelector('.fourth .dayIcon').src = "https://openweathermap.org/img/wn/" +
            `${data.list[30].weather[0].icon}` + ".png";
    },
    search: function () {
        this.getWeather(document.querySelector('.input').value);
    }
};
document.querySelector('.upper button').addEventListener('click', function () {
    weather.search();
});

document.querySelector('input')
    .addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {weather.search()}
    })

weather.getWeather('Kiev')