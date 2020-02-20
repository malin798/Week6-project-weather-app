

fetch("http://api.openweathermap.org/data/2.5/forecast?q=karlstad,SWE&units=metric&appid=81d357180ff563fe7c461222930c95a7") 

  .then((response) => {
    return response.json()
  })

.then((json) => {
  console.log(json)

// today's forecast 

  let sunriseDateTime = new Date(json.city.sunrise * 1000);
  let sunsetDateTime = new Date(json.city.sunset * 1000);

  document.getElementById("weatherConditions").innerHTML = `${json.list[0].weather[0].description} | &nbsp`;
  document.getElementById("temperature").innerHTML = `${roundNumber(json.list[0].main.temp)}°c`
  document.getElementById("weatherConditionsImage").src = `https://openweathermap.org/img/wn/${json.list[0].weather[0].icon}@2x.png`
  document.getElementById("sunrise").innerHTML += `&nbsp ${sunriseDateTime.getHours()}.${sunriseDateTime.getMinutes()}`;
  document.getElementById("sunset").innerHTML += `&nbsp ${sunsetDateTime.getHours()}.${sunsetDateTime.getMinutes()}`;

  if (json.list[0].weather[0].main === "Clouds") { // cloudy weather
    document.getElementById("weatherAdvice").innerHTML = `Light a fire and get cosy. ${json.city.name} is looking grey today.`;
    document.getElementById("body").classList.add("cloudy");
    document.getElementById("weatherConditionsImage").src = "Designs/Design-2/icons/noun_Cloud_1188486.svg"
  }

  else if (json.list[0].weather[0].id === 800)  { //sunny weather
    document.getElementById("weatherAdvice").innerHTML = `Don't forget your sunglasses. 
    ${json.city.name} is shining today!`;
    document.getElementById("body").classList.add("sunny");
   
    if (json.list[0].weather[0].id === 800) {
      document.getElementById("weatherConditionsImage").src = "Designs/Design-2/icons/noun_Sunglasses_2055147.svg" 
    }
    else { 
      document.getElementById("weatherConditionsImage").src = "Designs/Design-2/icons/noun_cloudysun.svg"
    }
  }

  else if (json.list[0].weather[0].icon === "50d" ) { // atmosphere group
    document.getElementById("weatherAdvice").innerHTML = `Maybe indoor activities today. 
    ${json.city.name} is full of ${json.list[0].weather[0].main.toLowerCase()}`;
    document.getElementById("body").classList.add("atmosphere");
  }
  
  else if (json.list[0].weather[0].main === "Snow") { // snow
      document.getElementById("weatherAdvice").innerHTML = `Is it Christmas already? 
      ${json.city.name} is full of ${json.list[0].weather[0].main.toLowerCase()} today`;
      document.getElementById("body").classList.add("snow");
      document.getElementById("weatherConditionsImage").src = "Designs/Design-2/icons/noun_snow.svg"
  }

  else if (json.list[0].weather[0].main === "Rain") { // rain / drizzle
      document.getElementById("weatherAdvice").innerHTML = `Bring your umbrella! 
      ${json.city.name} is full of ${json.list[0].weather[0].main.toLowerCase()} today`;
      document.getElementById("body").classList.add("rain");
      document.getElementById("weatherConditionsImage").src = "Designs/Design-2/icons/noun_Umbrella_2030530.svg"
  }

    else if (json.list[0].weather[0].main === "Thunderstorm") { // thunder
      document.getElementById("weatherAdvice").innerHTML = `Relax  indoors today! 
     There is a ${json.list[0].weather[0].main.toLowerCase()} in ${json.city.name}!`;
      document.getElementById("body").classList.add("thunder");
      document.getElementById("weatherConditionsImage").src = "Designs/Design-2/icons/noun_storm.svg"
  }
 
// this week's forecast

const filteredJsonDay = json.list.filter(item => item.dt_txt.includes('00:00:00')) // each days' day of week
console.log(filteredJsonDay)

const filteredJsonTemp = json.list.filter(item => item.dt_txt.includes('12:00')) // each days' temp at noon
console.log(filteredJsonTemp)

document.getElementById("day1").innerHTML = `${getDayOfWeek(filteredJsonDay[0].dt)}`
document.getElementById("day2").innerHTML = `${getDayOfWeek(filteredJsonDay[1].dt)}`
document.getElementById("day3").innerHTML = `${getDayOfWeek(filteredJsonDay[2].dt)}`
document.getElementById("day4").innerHTML = `${getDayOfWeek(filteredJsonDay[3].dt)}`
document.getElementById("day5").innerHTML = `${getDayOfWeek(filteredJsonDay[4].dt)}`

document.getElementById("tempDay1").innerHTML = `${roundNumber(filteredJsonTemp[0].main.temp)}°c`
document.getElementById("tempDay2").innerHTML = `${roundNumber(filteredJsonTemp[1].main.temp)}°c`
document.getElementById("tempDay3").innerHTML = `${roundNumber(filteredJsonTemp[2].main.temp)}°c`
document.getElementById("tempDay4").innerHTML = `${roundNumber(filteredJsonTemp[3].main.temp)}°c`
document.getElementById("tempDay5").innerHTML = `${roundNumber(filteredJsonTemp[4].main.temp)}°c`
 
})

const roundNumber = (temperature) => {
 return Math.round(temperature);
}

const getDayOfWeek = (param) => {
  let weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  let date = new Date (param * 1000);

  let specificDay = date.getDay();
  
  return weekdays[specificDay]
}

