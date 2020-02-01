// IMPORTANT: Fill in your client key
var clientKey = "js-HcyB8lrvGFI2fZW0GZo95P5lLK0jc3YQRMmA4mL79E6PTgWTumaoYldUe5kKXqWU";

var cache = {};
var container = $("#example1");
var errorDiv = container.find("div.text-error");

/** Handle successful response */
function handleResp(data) {
    // Check for error
    if (data.error_msg)
        errorDiv.text(data.error_msg);
    else if ("city" in data) {
        // Set city and state
        container.find("input[name='city']").val(data.city);
        container.find("input[name='state']").val(data.state);
        console.log(data.city);
        console.log(data.state);
        cityName = data.city;
    }
}

// Set up event handlers
container.find("input[name='zipcode']").on("keyup change", function () {
    // Get zip code
    var zipcode = $(this).val().substring(0, 5);
    if (zipcode.length == 5 && /^[0-9]+$/.test(zipcode)) {
        // Clear error
        errorDiv.empty();

        // Check cache
        if (zipcode in cache) {
            handleResp(cache[zipcode]);
        }
        else {
            // Build url
            var ZIPurl = "https://www.zipcodeapi.com/rest/" + clientKey + "/info.json/" + zipcode + "/degrees";
            // Make AJAX request
            console.log(ZIPurl)
            $.ajax({
                url: ZIPurl,
                method: "GET",
                "dataType": "json"
            }).done(function (data) {
                handleResp(data);
                console.log(data);

                // Store in cache
                cache[zipcode] = data;
            }).fail(function (data) {
                if (data.responseText && (json = $.parseJSON(data.responseText))) {
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

