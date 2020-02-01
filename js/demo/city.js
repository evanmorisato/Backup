// IMPORTANT: Fill in your client key
var clientKey = "js-HcyB8lrvGFI2fZW0GZo95P5lLK0jc3YQRMmA4mL79E6PTgWTumaoYldUe5kKXqWU";

var cache = {};
var container = $("#example1");
var errorDiv = container.find("div.text-error");

/** Handle successful response */
function handleResp(data)
{
    // Check for error
    if (data.error_msg)
        errorDiv.text(data.error_msg);
    else if ("city" in data)
    {
        // Set city and state
        console.log(data.city);
        console.log(data.state);
        cityName = data.city;
    }
}

// Set up event handlers
container.find("input[name='zipcode']").on("keyup change", function() {
    // Get zip code
    var zipcode = $(this).val().substring(0, 5);
    if (zipcode.length == 5 && /^[0-9]+$/.test(zipcode))
    {
        // Clear error
        errorDiv.empty();
        
        // Check cache
        if (zipcode in cache)
        {
            handleResp(cache[zipcode]);
        }
        else
        {
            // Build url
            //var ZIPurl = "https://www.zipcodeapi.com/rest/"+clientKey+"/info.json/" + zipcode + "/degrees";
            var ZIPurl = "https://www.zipcodeapi.com/rest/"+clientKey+"/info.json/"+zipcode+"/degrees"
            // Make AJAX request
            console.log(ZIPurl)
            $.ajax({
                url: ZIPurl,
                method: "GET",
                "dataType": "json"
            }).done(function(data) {
                handleResp(data);
                console.log(data);
                
                // Store in cache
                cache[zipcode] = data;
            }).fail(function(data) {
                if (data.responseText && (json = $.parseJSON(data.responseText)))
                {
                    // Store in cache
                    cache[zipcode] = json;
                    
                    // Check for error
                    if (json.error_msg)
                        errorDiv.text(json.error_msg);
                }
                else
                    errorDiv.text('Request failed.');
            });
        }
    }
}).trigger("change");


var APIKey = "58944daba347098d464f8de4da9b4020";
var cityName = "";

// Here we are building the URL we need to query the database
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+cityName+",US&units=imperial&appid=" + APIKey;
var dates = [];
var temps = [];
var humid = [];
var windy = [];
var cloudy = [];

var dowarray = [];

var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday"];
  //var currDay = d.getDay();
  var offset = d.getDay();
  for (var i = 0; i < weekday.length; i++) {
    var dow = (i + offset) % weekday.length;
    dowarray.push(weekday[dow]);
    if (dowarray.length == 5) {
      break;
    }
  }
  console.log(dowarray);

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function (response) {
  console.log(queryURL);
  console.log(response);
  console.log(response.list[0].main.temp);
  var i = 0;
  while (i < 40) {
    var date = response.list[i].dt_txt;
    var temp = response.list[i].main.temp;
    var humidity = response.list[i].main.humidity;
    var wind = response.list[i].wind.speed;
    var clouds = response.list[i].clouds.all;
    dates.push(date);
    temps.push(temp);
    humid.push(humidity);
    windy.push(wind);
    cloudy.push(clouds);
    i = i + 8;
  }
});































//var APIKey = "58944daba347098d464f8de4da9b4020";
//var queryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=75098,us&units=imperial&appid=" + APIKey;


//$.ajax({
  //url: queryURL,
  //method: "GET"
//})
  //.then(function(response) {
   // var city = response.city.name;
    //      $("#reportTitle").text("Weather Report For the City of " + city);
  //});
