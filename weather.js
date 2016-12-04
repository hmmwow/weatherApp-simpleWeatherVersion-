if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
        loadWeather(position.coords.latitude+','+position.coords.longitude);
		todayTime();
    });
} else{
    loadWeather("Cavite,PH","");
}

$(document).ready(function(){
    setInterval(getWeather,5000);
	
});



function todayTime(){
	 //time and day;
    var day = ["Sunday", "Monday" , "Tuesday", "Wednesday", "Thursday" , "Friday", "Saturday" ];
	var months = ['January','Febuary','March','April','May','June','July','August','September','October','November','December'];
    var date = new Date();
	dayNum = date.getDate();
	month = months[date.getMonth()];
	year = date.getFullYear();
   $(".day").html(day[date.getDay()]);
   $(".time").html(time(date));
   $(".date").html(month+" "+dayNum+", "+year);
   

}


function time(date){
  var hours = date.getHours();
  var min = date.getMinutes();
  var ampm = "";
  var time = "";


  	if (hours >= 13){
  		ampm = "PM";
  		hours -= 12;
  	}
	else if(hours === 0){
		hours = 12;
		ampm = "AM";
		
	}
  	else{
  		ampm = "AM";
  	}

  	if (min < 10){
  		min = "0"+min;
  	}
 
 return time = hours + ":" + min + " " + ampm;
}

function loadWeather(location, woeid){
    $.simpleWeather({
        location: location,
        woeid: woeid,
        unit: 'F',
        success: function(weather){
            city = weather.city;
            temp = weather.temp;
			
			var date  = new Date();
			var hours  = date.getHours();
			dOrN = '';
					
					if(hours >= 6 && hours <= 18){
						dOrN = 'd';
					}
					else{
						dOrN = 'n';
					}

		
            wcode = '<img class="weathericon" src="https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/'+weather.code+dOrN+'.png">';
            wind = weather.wind.speed+' '+weather.units.speed;
            humidity = weather.humidity+'%';
		
			
            $(".location").text(city);
            $(".temperature").html(temp);
			$(".tempLetter").html('&degF');
            $(".climate_bg").html(wcode);
            $(".windspeed").html(wind);
            $(".humidity").text(humidity);
			
			var x = 0;
			
			 $(".c").click(function(){
			
			if (x === 0){
				$(this).slideToggle(500).slideToggle( function(){
					 $(this).html("F a h r e n h e i t");
					temp = Math.round((weather.temp - 32) * 5/9);
					 $(".temperature").html(temp);
					 $(".tempLetter").html('&degC');
					 weather.temp = temp;
						return x = 1;	
					
				});
			}
				
			else if (x === 1){
			
				$(this).toggle(500).toggle( function(){
					  $(this).html("C e l s i u s");
					temp = Math.round((weather.temp* 9/5) + 32);
					 $(".temperature").html(temp);
					 $(".tempLetter").html('&degF');
					 weather.temp = temp;
					 x = 0;
		
				});
				   
			}
			});
			
			
			
			
			
			
			 
			
			
        },
        error: function(error){
            $(".error").html('<p>'+error+'</p>');
        }
        
    });
}


