import CityWeather from './modules/cityWeatherClass.js';
import Comment from './modules/commentClass.js';


let citiesWeather = [];

const saveToLocalStorage = function(){
    localStorage.setItem('citiesWeather', JSON.stringify(citiesWeather))
}

const getFromLocalStorage = function(){
    return localStorage.getItem('citiesWeather');
}

const source = $('#weatherbox-template').html();
const template = Handlebars.compile(source);

const render = function () {
    $('#weatherContainer').empty();

    const newHTML = template({ weatherBox: citiesWeather });
    $('#weatherContainer').append(newHTML);
}

const _findPostById = function (id) {
    for (let i of citiesWeather) {
        if (i.id === id) {
            return i;
        }
    }
}

const fetch = function (cityname) {
    $.get('http://api.apixu.com/v1/current.json?key=1e4b2496b5a049ce87373740180609&q=' + cityname).then((data) => {
        let weather = new CityWeather(data);
        citiesWeather.push(weather);
        saveToLocalStorage()
        render()
    })
}

const deleteCity = function(cityId){
    let city = _findPostById(cityId);

    citiesWeather.splice(citiesWeather.indexOf(city), 1)
    saveToLocalStorage()
} 

$('.searctInput').on("keyup", function (event) {

    event.preventDefault();

    if (event.keyCode === 13) {
        let cityname = $(this).val();

        fetch(cityname);
    }
});

$('#weatherContainer').on("keyup", ".commentInput", function () {
    event.preventDefault();

    if (event.keyCode === 13) {
        let id = $(this).closest('.weatherbox').data().id;
        let text = $(this).val();

        let curretWeatherPost = _findPostById(id);
        curretWeatherPost.comments.push(new Comment(text));
        saveToLocalStorage();
        render();
    }
});

$('#weatherContainer').on("click", ".deleteBtns", function(){
    let cityId = $(this).closest('.weatherbox').data().id;

    deleteCity(cityId);
    render();
    return;
});

citiesWeather = JSON.parse(getFromLocalStorage() || '[]')
render();