jQuery(document).ready(weatherFunction());
var temp ="";
var tempMax = [];
var tempMin = [];
var dates = [];


function weatherFunction(){

 var currentLat = "";
 var currentLon = "";

navigator.geolocation.getCurrentPosition(function(position){

  currentLat = position.coords.latitude;
  currentLon = position.coords.longitude;


var APIkey = "c470d9117220df245654821524d1b0c2";

var currentURL = "https://fcc-weather-api.glitch.me/api/current?lat=" + currentLat + "&lon=" + currentLon;

var forecastURL = "https://api.openweathermap.org/data/2.5/forecast/daily?lat=" + currentLat + "&lon=" + currentLon + "&APPID=" + APIkey;

//console.log("currentURL = " + currentURL);

//THIS IS FOR CURRENT WEATHER
$.get(currentURL, function(data){
 temp = data.main.temp;
 temp = Math.round((temp * 9/5) + 32);
 $("#loaderDiv").fadeOut("fast");
 $(".weather-data-div").removeClass("hidden");
 //$("#temp").html(temp);
 //$("#degrees").html("&deg <a>F</a>");
  $("#temp").html(temp + " &deg<a>F</a>");
  $("#city").html(data.name); $("#conditions").html(data.weather[0].main);
 var iconId = data.weather[0].id;
 var iconURL = "";
 iconURL = data.weather[0].icon;

  if (iconId >= 200 && iconId < 300){ //thunderstorm icon
      iconURL = "https://image.ibb.co/es8aK5/weather_icons_tstorm.png"
    };
  if (iconId >= 300 && iconId < 400){ //"drizzle" i.e. showers
    iconURL = "https://image.ibb.co/njacXQ/weather_icons_showers.png"
  };
  if (iconId >= 500 && iconId < 600){ //rain
    iconURL = "https://image.ibb.co/nPh2z5/weather_icons_rain.png"
  };
  if (iconId >= 600 && iconId < 700){ //snow
    iconURL = "https://image.ibb.co/cwcrsQ/weather_icons_snow.png"
  };
  if (iconId >= 700 && iconId < 800){ //fog/"atmosphere"
    iconURL = "https://image.ibb.co/meX2z5/weather_icons_fog.png"
  };
  if (iconId == 800){ //clear
    iconURL = "https://image.ibb.co/jUK4CQ/weather_icons_clear.png"
  };
  if (iconId == 801){ //partly cloudy
    iconURL = "https://image.ibb.co/d3f0mk/weather_icons_partly_cloudy.png"
  };
  if (iconId >= 802 && iconId <= 804){ //clouds
    iconURL = "https://image.ibb.co/dOoLmk/weather_icons_cloud.png"
  };

document.getElementById("icon").src = iconURL;

 //console.log("iconId = " + iconId);
 //console.log("iconURL = " + iconURL);
   });

///THIS IS FOR FORECAST  - the whole thing needs to go in for-loop

 //for (var i=0; i<5; i++)

$.get(forecastURL, function(data){
 console.log(data);

 var d = new Date();
 var today = d.getDay();
 console.log("today = " + today);
 var days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
 for (var d=0; d<5; d++){
   dates[d] = (today + d);
   if (dates[d] > 6){
     dates[d] = (dates[d] - 7);
   }
   else{
     dates[d] = dates[d];
   }
   dates[d] = days[dates[d]];
 };






 for (var i = 0; i < 5; i++) {
 //console.log("dates[" + i + "] = " + dates[i]);
 document.getElementById("fcstDay" + i).innerHTML = (dates[i]);

 tempMax[i] = data.list[i].temp.max;
 tempMax[i] = Math.round(((tempMax[i] - 273) * 9/5) + 32);//Kelvin to Fahrenheit
 document.getElementById("tempMax" + i).innerHTML = (tempMax[i] + "&deg;  ");


 tempMin[i] = data.list[i].temp.min;
 tempMin[i] = Math.round(((tempMin[i] - 273) * 9/5) + 32); //Kelvin to Fahrenheit
 document.getElementById("tempMin" + i).innerHTML = (tempMin[i] + "&deg;");

 var iconId = [];
 iconId[i] = data.list[i].weather[0].id;
 var iconURL = [];
 iconURL[i] = "http://openweathermap.org/img/w/" + iconId[i] + ".png";

  if (iconId[i] >= 200 && iconId[i] < 300){ //thunderstorm icon
      iconURL[i] = "https://image.ibb.co/es8aK5/weather_icons_tstorm.png"
    };
  if (iconId[i] >= 300 && iconId[i] < 400){ //"drizzle" i.e. showers
    iconURL[i] = "https://image.ibb.co/njacXQ/weather_icons_showers.png"
  };
  if (iconId[i] >= 500 && iconId[i] < 600){ //rain
    iconURL[i] = "https://image.ibb.co/nPh2z5/weather_icons_rain.png"
  };
  if (iconId[i] >= 600 && iconId[i] < 700){ //snow
    iconURL[i] = "https://image.ibb.co/cwcrsQ/weather_icons_snow.png"
  };
  if (iconId[i] >= 700 && iconId[i] < 800){ //fog/"atmosphere"
    iconURL[i] = "https://image.ibb.co/meX2z5/weather_icons_fog.png"
  };
  if (iconId[i] == 800){ //clear
    iconURL[i] = "https://image.ibb.co/jUK4CQ/weather_icons_clear.png"
  };
  if (iconId[i] == 801){ //partly cloudy
    iconURL[i] = "https://image.ibb.co/d3f0mk/weather_icons_partly_cloudy.png"
  };
  if (iconId[i] >= 802 && iconId[i] <= 804){ //clouds
    iconURL[i] = "https://image.ibb.co/dOoLmk/weather_icons_cloud.png"
  };

 document.getElementById("fcstIcon" + i).src = iconURL[i];

 console.log("iconURL[" + i + "] = " + iconURL[i] + "\n");

 };

  $(".forecast").removeClass("hidden");
});

},function(error){
  $("#loaderDiv").fadeOut("fast");
  $("#conditions").html("Could not obtain your current location.")
});

}

//-----------------------------------------//
function degreeFunc(){

  var degreesF = temp;
  var degreesC = Math.floor((temp - 32) * 5/9);
  var tempNow = $("#temp").html();

   var maxF = tempMax;
   var minF = tempMin;
   var maxC = [];
   var minC = [];
  for (var i = 0; i<5; i++){

    maxC[i] = Math.floor((maxF[i] - 32) * 5/9);
    minC[i] = Math.floor((minF[i] - 32) * 5/9);
  }

    if (tempNow == temp + " °<a>F</a>"){ //#temp is in Farhenheit
      $("#temp").html(degreesC + " °<a>C</a>");
      for (var j=0; j<5; j++){//change #temp intoCelsius
      document.getElementById("tempMax" + j).innerHTML = (maxC[j] + "&deg;  ");
      document.getElementById("tempMin" + j).innerHTML = (minC[j] + "&deg;");
      }
    }
    else {//should mean that #temp is in Fahrenheit
       $("#temp").html(degreesF + " °<a>F</a>");
        for (var j=0; j<5; j++){
       document.getElementById("tempMax" + j).innerHTML = (maxF[j] + "&deg;  ");
       document.getElementById("tempMin" + j).innerHTML = (minF[j] + "&deg;");
       }
    }
/*  console.log("temp = " + temp);
  console.log("degreesC = " + degreesC);
  console.log("degreesF = " + degreesF);
  console.log("tempNow = " + tempNow);

  for (var v=0; v<5; v++){
    console.log("tempMax[" + v + "] = " + tempMax[v]);
    console.log("tempMin{" + v + "] = " + tempMin[v]);
    console.log( "maxF [" + v + "] = " + maxF[v]);
    console.log( "minF [" + v + "] = " + minF[v]);
    console.log( "maxC [" + v + "] = " + maxC[v]);
    console.log( "minC [" + v + "] = " + minC[v]);
  } */

}
