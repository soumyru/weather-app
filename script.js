const apiKey='704fb2e4757a509bbf839aac0e8ff677';
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox=document.querySelector(".search input");
const searchBtn=document.querySelector(".search button");
const weatherIcon=document.querySelector(".weather-icon");

async function checkWeather(city){
    const response=await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display="block";
        document.querySelector(".weather").style.display="none";
    }
    else{
        var data=await response.json();//contains all info about waeather of the given city

    // console.log(data);
    
    document.querySelector(".city").innerHTML=data.name; //here,'name' I got from console where name:"Mumbai";
    document.querySelector(".temp").innerHTML=Math.round(data.main.temp) + "°C"; //was giving temp in decimal like 33.99 so used MAth.round
    document.querySelector(".humidity").innerHTML=data.main.humidity + "%";
    document.querySelector(".wind").innerHTML=data.wind.speed + "km/h";

    const weatherCondition = data.weather[0].main.toLowerCase();//this data is in main of weather[0] (see in console) // Convert to lowercase for case-insensitive comparison

        switch (weatherCondition) {
            case "clouds":
                weatherIcon.src = "assets/images/clouds.png";
                break;
            case "clear":
                weatherIcon.src = "assets/images/clear.png";
                break;
            case "rain":
                weatherIcon.src = "assets/images/rain.png";
                break;
            case "drizzle":
                weatherIcon.src = "assets/images/drizzle.png";
                break;
            case "mist":
                weatherIcon.src = "assets/images/mist.png";
                break;
            case "snow":
                weatherIcon.src = "assets/images/snow.png";
                break;
            default:
                weatherIcon.src = "assets/images/clear.png"; // Default icon if no match found
                break;
        }

    document.querySelector(".weather").style.display="flex";
    document.querySelector(".error").style.display="none";

    }
    
}

searchBtn.addEventListener("click",()=>{
    checkWeather(searchBox.value);
})

checkWeather();