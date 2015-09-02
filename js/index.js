var latitude =0.0;
var longitude = 0.0;
$(document).ready(function(){
	$.ajaxSetup({'cache':true});
	
	var gotLoc = false;
	 if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } 


//T(°C) = (T(°F) - 32) × 5/9

//F = C  x  9/5 + 32

$( ".toggleTemp" ).click(function() {
	//alert($(".temperature").text());

	if($(this).hasClass('farenheit')){
		var celciusVal = (($(".temperature").text()-32) * (5/9)).toFixed(0);
		$(".temperature").text(celciusVal);
		$(this).removeClass('farenheit');
		$(".toggleTemp").text('Show in Farenheit');
	} else{
		var farenheitVal = (($(".temperature").text()*(9/5)) + (32)).toFixed(0);
		$(".temperature").text(farenheitVal);
		$(".toggleTemp").text('Show in Celcius');
		$(this).addClass('farenheit');
	}
 
});

function showPosition(position) {
	latitude = position.coords.latitude;
	longitude = position.coords.longitude;
	console.log('latitude'+latitude);
	console.log('longitude'+longitude);

	var response = $.ajax({
	url: "http://api.openweathermap.org/data/2.5/weather?jsonp=myJsonMethod&APPID=a15dc5154ed56253325131bf5d8bb71c&lat="+latitude+"&lon="+longitude+"&lang=en&units=imperial"
	,async: false
});

console.log(response.responseText);
var weather = response.responseText;
//Convert the text into Json
var jsonObj = $.parseJSON('[' + response.responseText + ']');
var currTemperature = jsonObj[0].main.temp.toFixed(0);
var cityName = jsonObj[0].name;
var mainDesc = jsonObj[0].weather[0].main.toUpperCase();
var auxDesc = jsonObj[0].weather[0].description.toUpperCase();
console.log(currTemperature);
console.log(cityName);
console.log(jsonObj[0].weather[0].description.toUpperCase());

var weatherDesc = "In "+ cityName + " current weather is best described as "
	+mainDesc + ' that is ' + auxDesc + 
	' and the current temperature is <inline class="temperature">'+ currTemperature+"</inline>.";
$('.weatherDesc').html(weatherDesc);
/*

Blazing: Above 95F 
Hot: 75F to 95F
Warm: 55F to 75F
Cool: 35F to 55F
Cold: 15F to 35F
Frigid: Below 15F

*/
var tempBoard = $('#temperatureBoard');
if(currTemperature >= 95 ){
	tempBoard.css( 'background-image', 'url("img/blazing.jpg")' );
}else if(currTemperature > 75 && currTemperature < 95 ){
	tempBoard.css( 'background-image', 'url("img/hot.jpg")' );
}else if(currTemperature > 55 && currTemperature < 75){
tempBoard.css( 'background-image', 'url("img/warm.jpg")' );
}else if(currTemperature > 35 && currTemperature < 55){
	tempBoard.css( 'background-image', 'url("img/cool.jpg")' );
}else if(currTemperature > 15 && currTemperature < 35){
	tempBoard.css( 'background-image', 'url("img/cold.jpg")' );
}
else if(currTemperature <= 15){
	tempBoard.css( 'background-image', 'url("img/frigid.jpg")' );
}

}

});



