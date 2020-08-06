//Get The Current Date

document.addEventListener('DOMContentLoaded', currentDate);

function currentDate(){
    //current day
    let today = new Date();
    let date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
    $('#current-date').append(' '+date);

    //next five days
    let one = (today.getMonth()+1)+'/'+(today.getDate()+1)+'/'+today.getFullYear();
    $('#cast1').prepend(one);
    let two = (today.getMonth()+1)+'/'+(today.getDate()+2)+'/'+today.getFullYear();
    $('#cast2').prepend(two);
    let three = (today.getMonth()+1)+'/'+(today.getDate()+3)+'/'+today.getFullYear();
    $('#cast3').prepend(three);
    let four = (today.getMonth()+1)+'/'+(today.getDate()+4)+'/'+today.getFullYear();
    $('#cast4').prepend(four);
    let five = (today.getMonth()+1)+'/'+(today.getDate()+5)+'/'+today.getFullYear();
    $('#cast5').prepend(five);
}

let APIKey = "2fd3203014efb5bb2fa2f7d3334d6056";

//Get weather and 5 day forecast
$('#btn').click(openWeather);

function openWeather(){

    let searchCity = $('#input').val();
    localStorage.setItem('searchCity', searchCity);
    console.log(localStorage);

    //Search history
    let searchHistory = [];
    searchHistory.push(searchCity);
    for(let i = 0; i < searchHistory.length; i++){
        console.log(searchHistory[i]);
        //row
        let rowDiv = $('<div>');
        rowDiv.attr('class', 'row');
        rowDiv.appendTo('#search-function');
        //col
        let colDiv = $('<div>');
        colDiv.attr('class', 'col-lg-12 col-md-12');
        //colDiv.attr('class', 'col-md-12');
        colDiv.appendTo(rowDiv)
        //button
        let button = $('<button>');
        button.attr('id','search-state-buttons');
        button.attr('class', 'form-control '+searchHistory[i]);
        button.appendTo(colDiv);
        button.html(searchHistory[i]);
        searchHistory = [];
    }

    //Target the dynamically created buttons
    $('[id=search-state-buttons]:eq(0)').click(function(){
        searchHistory.push($('[id=search-state-buttons]:eq(0)').html());
        console.log(searchHistory);
        console.log(searchHistory[0]);
        $('#input').val(searchHistory[0]);
    });
    $('[id=search-state-buttons]:eq(1)').click(function(){
        searchHistory.push($('[id=search-state-buttons]:eq(1)').html());
        console.log(searchHistory);
        console.log(searchHistory[0]);
        $('#input').val(searchHistory[0]);
    });
    $('[id=search-state-buttons]:eq(2)').click(function(){
        searchHistory.push($('[id=search-state-buttons]:eq(2)').html());
        console.log(searchHistory);
        console.log(searchHistory[0]);
        $('#input').val(searchHistory[0]);
    });
    $('[id=search-state-buttons]:eq(3)').click(function(){
        searchHistory.push($('[id=search-state-buttons]:eq(3)').html());
        console.log(searchHistory);
        console.log(searchHistory[0]);
        $('#input').val(searchHistory[0]);
    });
    $('[id=search-state-buttons]:eq(4)').click(function(){
        searchHistory.push($('[id=search-state-buttons]:eq(4)').html());
        console.log(searchHistory);
        console.log(searchHistory[0]);
        $('#input').val(searchHistory[0]);
    });
    $('[id=search-state-buttons]:eq(5)').click(function(){
        searchHistory.push($('[id=search-state-buttons]:eq(5)').html());
        console.log(searchHistory);
        console.log(searchHistory[0]);
        $('#input').val(searchHistory[0]);
    });

    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+searchCity+",Burundi&appid=" + APIKey;

    //Display weather
    $.ajax({
        method:"GET",
        url: queryURL,
        dataType:'json'
    }).done(function(data){
        console.log(data);
        $('#city-header').html(data.name);
        $('#temperature').html('Temperature: '+ Math.floor((data.main.temp - 273.15)*1.80+32)+ ' &deg;F');
        $('#humidity').html('Humidity: '+data.main.humidity+' %');
        $('#wind-speed').html('Wind Speed: '+data.wind.speed+' MPH');

        let weather = "https://api.openweathermap.org/data/2.5/onecall?lat="+data.coord.lat+"&lon="+data.coord.lon+"&exclude=minutely&appid="+APIKey;
        console.log(weather);

        $.ajax({
            method:'GET',
            url:weather,
            dataType:'json'
        }).done(function(data){
            console.log(data);
            if(data.current.uvi >= 8){
                $('#uv-index').html('UV-Index: '+'<span style="background-color:red; color:white; border-radius:10px;">'+data.current.uvi+'</span>');
            }
            else if(data.current.uvi >= 6 && data.current.uvi <= 7){
                $('#uv-index').html('UV-Index: '+'<span style="background-color:orange; color:white; border-radius:10px;">'+data.current.uvi+'</span>');
            }
            else if(data.current.uvi >=3 && data.current.uvi <= 5){
                $('#uv-index').html('UV-Index: '+'<span style="background-color: #ffff00; color:white; border-radius:10px;">'+data.current.uvi+'</span>');
            }
            else if(data.current.uvi >= 0 && data.current.uvi <= 2){
                $('#uv-index').html('UV-Index: '+'<span style="background-color:#00ff00; color:white; border-radius:10px;">'+data.current.uvi+'</span>');
            }

            //get weather for next five days
            $('#cast1-temp').html('Temp: '+Math.floor((data.daily[1].temp.day - 273.15)*1.80+32)+ ' &deg;F');
            $('#cast2-temp').html('Temp: '+Math.floor((data.daily[2].temp.day - 273.15)*1.80+32)+ ' &deg;F');
            $('#cast3-temp').html('Temp: '+Math.floor((data.daily[3].temp.day - 273.15)*1.80+32)+ ' &deg;F');
            $('#cast4-temp').html('Temp: '+Math.floor((data.daily[4].temp.day - 273.15)*1.80+32)+ ' &deg;F');
            $('#cast5-temp').html('Temp: '+Math.floor((data.daily[5].temp.day - 273.15)*1.80+32)+ ' &deg;F');

            //get humidity for next five days
            $('#cast1-hum').html('Humidity: '+data.daily[1].humidity);
            $('#cast2-hum').html('Humidity: '+data.daily[2].humidity);
            $('#cast3-hum').html('Humidity: '+data.daily[3].humidity);
            $('#cast4-hum').html('Humidity: '+data.daily[4].humidity);
            $('#cast5-hum').html('Humidity: '+data.daily[5].humidity);

            let rain = "rain_cloud_emoji_sticker";
            let sun = "sunny_emoji_sticker";
            let cloud = "happy day cloud sticker";
            let wind = "space wave wind sticker";
            let giphy = "https://api.giphy.com/v1/gifs/search?api_key=bq5DOUxnP24dyoOh0cz9ZC4tEw49ka1L&limit=1&q=";

            //get emoji for day 1
            if(data.daily[1].weather[0].main === "Clear"){
                $.ajax({
                    method:'GET',
                    url:giphy+sun,
                    dataType:'json'
                }).done(function(data){
                    $('#cast1-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }
            else if(data.daily[1].weather[0].main === "Rain"){
                $.ajax({
                    method:'GET',
                    url:giphy+rain,
                    dataType:'json'
                }).done(function(data){
                    $('#cast1-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }
            else if(data.daily[1].wind_speed >= 10){
                $.ajax({
                    method:'GET',
                    url:giphy+wind,
                    dataType:'json'
                }).done(function(data){
                    $('#cast1-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }
            else{
                $.ajax({
                    method:'GET',
                    url:giphy+cloud,
                    dataType:'json'
                }).done(function(data){
                    $('#cast1-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }

            //get emoji for day 2
            if(data.daily[2].weather[0].main === "Clear"){
                $.ajax({
                    method:'GET',
                    url:giphy+sun,
                    dataType:'json'
                }).done(function(data){
                    $('#cast2-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }
            else if(data.daily[2].weather[0].main === "Rain"){
                $.ajax({
                    method:'GET',
                    url:giphy+rain,
                    dataType:'json'
                }).done(function(data){
                    $('#cast2-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }
            else if(data.daily[2].wind_speed >= 10){
                $.ajax({
                    method:'GET',
                    url:giphy+wind,
                    dataType:'json'
                }).done(function(data){
                    $('#cast2-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }
            else{
                $.ajax({
                    method:'GET',
                    url:giphy+cloud,
                    dataType:'json'
                }).done(function(data){
                    $('#cast2-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }

            //get emoji for day 3
            if(data.daily[3].weather[0].main === "Clear"){
                $.ajax({
                    method:'GET',
                    url:giphy+sun,
                    dataType:'json'
                }).done(function(data){
                    $('#cast3-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }
            else if(data.daily[3].weather[0].main === "Rain"){
                $.ajax({
                    method:'GET',
                    url:giphy+rain,
                    dataType:'json'
                }).done(function(data){
                    $('#cast3-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }
            else if(data.daily[3].wind_speed >= 10){
                $.ajax({
                    method:'GET',
                    url:giphy+wind,
                    dataType:'json'
                }).done(function(data){
                    $('#cast3-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }
            else{
                $.ajax({
                    method:'GET',
                    url:giphy+cloud,
                    dataType:'json'
                }).done(function(data){
                    $('#cast3-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }

            //get emoji for day 4
            if(data.daily[4].weather[0].main === "Clear"){
                $.ajax({
                    method:'GET',
                    url:giphy+sun,
                    dataType:'json'
                }).done(function(data){
                    $('#cast4-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }
            else if(data.daily[4].weather[0].main === "Rain"){
                $.ajax({
                    method:'GET',
                    url:giphy+rain,
                    dataType:'json'
                }).done(function(data){
                    $('#cast4-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }
            else if(data.daily[4].wind_speed >= 10){
                $.ajax({
                    method:'GET',
                    url:giphy+wind,
                    dataType:'json'
                }).done(function(data){
                    $('#cast4-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }
            else{
                $.ajax({
                    method:'GET',
                    url:giphy+cloud,
                    dataType:'json'
                }).done(function(data){
                    $('#cast4-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }

            //get emoji for day 5
            if(data.daily[5].weather[0].main === "Clear"){
                $.ajax({
                    method:'GET',
                    url:giphy+sun,
                    dataType:'json'
                }).done(function(data){
                    $('#cast5-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }
            else if(data.daily[5].weather[0].main === "Rain"){
                $.ajax({
                    method:'GET',
                    url:giphy+rain,
                    dataType:'json'
                }).done(function(data){
                    $('#cast5-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }
            else if(data.daily[5].wind_speed >= 10){
                $.ajax({
                    method:'GET',
                    url:giphy+wind,
                    dataType:'json'
                }).done(function(data){
                    $('#cast5-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }
            else{
                $.ajax({
                    method:'GET',
                    url:giphy+cloud,
                    dataType:'json'
                }).done(function(data){
                    $('#cast5-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }
        });

        //add giph to main dashboard
        let rain = "rain_cloud_emoji_sticker";
        let sun = "sunny_emoji_sticker";
        let cloud = "happy day cloud sticker";
        let wind = "space wave wind sticker";
        let giphy = "https://api.giphy.com/v1/gifs/search?api_key=bq5DOUxnP24dyoOh0cz9ZC4tEw49ka1L&limit=1&q=";

        if(data.weather[0].main === "Clear"){
            $.ajax({
                method:'GET',
                url:giphy+sun,
                dataType:'json'
            }).done(function(data){
                $('#weather-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
            });
        }
        else if(data.weather[0].main === "Rain"){
            $.ajax({
                method:'GET',
                url:giphy+rain,
                dataType:'json'
            }).done(function(data){
                $('#weather-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
            });
        }
        else if(data.wind.speed >= 10){
            $.ajax({
                method:'GET',
                url:giphy+wind,
                dataType:'json'
            }).done(function(data){
                $('#weather-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
            });
        }
        else{
            $.ajax({
                method:'GET',
                url:giphy+cloud,
                dataType:'json'
            }).done(function(data){
                $('#weather-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
            });
        }
    });
}

//grab last searched city from local stoarge -or- side buttons
document.addEventListener('DOMContentLoaded', grabLastCity);

function grabLastCity(){

    let getLastSearchCity;
    if($('#input').val() === ''){
        getLastSearchCity = localStorage.getItem('searchCity');
    }
    
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+getLastSearchCity+",Burundi&appid=" + APIKey;
    //Display weather
    $.ajax({
        method:"GET",
        url: queryURL,
        dataType:'json'
    }).done(function(data){
        console.log(data);
        $('#city-header').html(data.name);
        $('#temperature').html('Temperature: '+ Math.floor((data.main.temp - 273.15)*1.80+32)+ ' &deg;F');
        $('#humidity').html('Humidity: '+data.main.humidity+' %');
        $('#wind-speed').html('Wind Speed: '+data.wind.speed+' MPH');

        let weather = "https://api.openweathermap.org/data/2.5/onecall?lat="+data.coord.lat+"&lon="+data.coord.lon+"&exclude=minutely&appid="+APIKey;
        console.log(weather);

        $.ajax({
            method:'GET',
            url:weather,
            dataType:'json'
        }).done(function(data){
            console.log(data);
            if(data.current.uvi >= 8){
                $('#uv-index').html('UV-Index: '+'<span style="background-color:red; color:white; border-radius:10px;">'+data.current.uvi+'</span>');
            }
            else if(data.current.uvi >= 6 && data.current.uvi <= 7){
                $('#uv-index').html('UV-Index: '+'<span style="background-color:orange; color:white; border-radius:10px;">'+data.current.uvi+'</span>');
            }
            else if(data.current.uvi >=3 && data.current.uvi <= 5){
                $('#uv-index').html('UV-Index: '+'<span style="background-color: #ffff00; color:white; border-radius:10px;">'+data.current.uvi+'</span>');
            }
            else if(data.current.uvi >= 0 && data.current.uvi <= 2){
                $('#uv-index').html('UV-Index: '+'<span style="background-color:#00ff00; color:white; border-radius:10px;">'+data.current.uvi+'</span>');
            }

            //get weather for next five days
            $('#cast1-temp').html('Temp: '+Math.floor((data.daily[1].temp.day - 273.15)*1.80+32)+ ' &deg;F');
            $('#cast2-temp').html('Temp: '+Math.floor((data.daily[2].temp.day - 273.15)*1.80+32)+ ' &deg;F');
            $('#cast3-temp').html('Temp: '+Math.floor((data.daily[3].temp.day - 273.15)*1.80+32)+ ' &deg;F');
            $('#cast4-temp').html('Temp: '+Math.floor((data.daily[4].temp.day - 273.15)*1.80+32)+ ' &deg;F');
            $('#cast5-temp').html('Temp: '+Math.floor((data.daily[5].temp.day - 273.15)*1.80+32)+ ' &deg;F');

            //get humidity for next five days
            $('#cast1-hum').html('Humidity: '+data.daily[1].humidity);
            $('#cast2-hum').html('Humidity: '+data.daily[2].humidity);
            $('#cast3-hum').html('Humidity: '+data.daily[3].humidity);
            $('#cast4-hum').html('Humidity: '+data.daily[4].humidity);
            $('#cast5-hum').html('Humidity: '+data.daily[5].humidity);

            let rain = "rain_cloud_emoji_sticker";
            let sun = "sunny_emoji_sticker";
            let cloud = "happy day cloud sticker";
            let wind = "space wave wind sticker";
            let giphy = "https://api.giphy.com/v1/gifs/search?api_key=bq5DOUxnP24dyoOh0cz9ZC4tEw49ka1L&limit=1&q=";

            //get emoji for day 1
            if(data.daily[1].weather[0].main === "Clear"){
                $.ajax({
                    method:'GET',
                    url:giphy+sun,
                    dataType:'json'
                }).done(function(data){
                    $('#cast1-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }
            else if(data.daily[1].weather[0].main === "Rain"){
                $.ajax({
                    method:'GET',
                    url:giphy+rain,
                    dataType:'json'
                }).done(function(data){
                    $('#cast1-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }
            else if(data.daily[1].wind_speed >= 10){
                $.ajax({
                    method:'GET',
                    url:giphy+wind,
                    dataType:'json'
                }).done(function(data){
                    $('#cast1-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }
            else{
                $.ajax({
                    method:'GET',
                    url:giphy+cloud,
                    dataType:'json'
                }).done(function(data){
                    $('#cast1-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }

            //get emoji for day 2
            if(data.daily[2].weather[0].main === "Clear"){
                $.ajax({
                    method:'GET',
                    url:giphy+sun,
                    dataType:'json'
                }).done(function(data){
                    $('#cast2-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }
            else if(data.daily[2].weather[0].main === "Rain"){
                $.ajax({
                    method:'GET',
                    url:giphy+rain,
                    dataType:'json'
                }).done(function(data){
                    $('#cast2-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }
            else if(data.daily[2].wind_speed >= 10){
                $.ajax({
                    method:'GET',
                    url:giphy+wind,
                    dataType:'json'
                }).done(function(data){
                    $('#cast2-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }
            else{
                $.ajax({
                    method:'GET',
                    url:giphy+cloud,
                    dataType:'json'
                }).done(function(data){
                    $('#cast2-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }

            //get emoji for day 3
            if(data.daily[3].weather[0].main === "Clear"){
                $.ajax({
                    method:'GET',
                    url:giphy+sun,
                    dataType:'json'
                }).done(function(data){
                    $('#cast3-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }
            else if(data.daily[3].weather[0].main === "Rain"){
                $.ajax({
                    method:'GET',
                    url:giphy+rain,
                    dataType:'json'
                }).done(function(data){
                    $('#cast3-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }
            else if(data.daily[3].wind_speed >= 10){
                $.ajax({
                    method:'GET',
                    url:giphy+wind,
                    dataType:'json'
                }).done(function(data){
                    $('#cast3-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }
            else{
                $.ajax({
                    method:'GET',
                    url:giphy+cloud,
                    dataType:'json'
                }).done(function(data){
                    $('#cast3-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }

            //get emoji for day 4
            if(data.daily[4].weather[0].main === "Clear"){
                $.ajax({
                    method:'GET',
                    url:giphy+sun,
                    dataType:'json'
                }).done(function(data){
                    $('#cast4-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }
            else if(data.daily[4].weather[0].main === "Rain"){
                $.ajax({
                    method:'GET',
                    url:giphy+rain,
                    dataType:'json'
                }).done(function(data){
                    $('#cast4-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }
            else if(data.daily[4].wind_speed >= 10){
                $.ajax({
                    method:'GET',
                    url:giphy+wind,
                    dataType:'json'
                }).done(function(data){
                    $('#cast4-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }
            else{
                $.ajax({
                    method:'GET',
                    url:giphy+cloud,
                    dataType:'json'
                }).done(function(data){
                    $('#cast4-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }

            //get emoji for day 5
            if(data.daily[5].weather[0].main === "Clear"){
                $.ajax({
                    method:'GET',
                    url:giphy+sun,
                    dataType:'json'
                }).done(function(data){
                    $('#cast5-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }
            else if(data.daily[5].weather[0].main === "Rain"){
                $.ajax({
                    method:'GET',
                    url:giphy+rain,
                    dataType:'json'
                }).done(function(data){
                    $('#cast5-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }
            else if(data.daily[5].wind_speed >= 10){
                $.ajax({
                    method:'GET',
                    url:giphy+wind,
                    dataType:'json'
                }).done(function(data){
                    $('#cast5-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }
            else{
                $.ajax({
                    method:'GET',
                    url:giphy+cloud,
                    dataType:'json'
                }).done(function(data){
                    $('#cast5-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:100px; height:100px;">');
                });
            }
        });

        //add giph to main dashboard
        let rain = "rain_cloud_emoji_sticker";
        let sun = "sunny_emoji_sticker";
        let cloud = "happy day cloud sticker";
        let wind = "space wave wind sticker";
        let giphy = "https://api.giphy.com/v1/gifs/search?api_key=bq5DOUxnP24dyoOh0cz9ZC4tEw49ka1L&limit=1&q=";

        if(data.weather[0].main === "Clear"){
            $.ajax({
                method:'GET',
                url:giphy+sun,
                dataType:'json'
            }).done(function(data){
                $('#weather-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:150px; height:150px;">');
            });
        }
        else if(data.weather[0].main === "Rain"){
            $.ajax({
                method:'GET',
                url:giphy+rain,
                dataType:'json'
            }).done(function(data){
                $('#weather-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:150px; height:150px;">');
            });
        }
        else if(data.wind.speed >= 10){
            $.ajax({
                method:'GET',
                url:giphy+wind,
                dataType:'json'
            }).done(function(data){
                $('#weather-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:150px; height:150px;">');
            });
        }
        else{
            $.ajax({
                method:'GET',
                url:giphy+cloud,
                dataType:'json'
            }).done(function(data){
                $('#weather-emoji').html('<img src="'+data.data[0].images.downsized.url+'" style="width:150px; height:150px;">');
            });
        }
    });
}

