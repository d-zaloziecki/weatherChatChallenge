
class CityWeather {
    constructor(cityData){
        this.id = id;
        this.cityName = cityData.location.name;
        this.Ctemp = cityData.current.temp_c;
        this.Ftemp = cityData.current.temp_f;
        this.weatherCondition = cityData.current.condition;
        this.lastUpdated = cityData.current.last_updated;        
        this.comments = [];

        id ++;
        localStorage.setItem('cityId', id)
    }
}
let id = JSON.parse(localStorage.getItem('cityId') || '1')

export default CityWeather;