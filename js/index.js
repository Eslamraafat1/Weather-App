// function to get the [ Day Name ] 
function getDayName(date = new Date(), locale = 'en-US') {
    return date.toLocaleDateString(locale, { weekday: 'long' });
}


$(document).ready(function() {
    // make and return data about  cairo and show it when load the page
    $.ajax({
        type: "GET",
        url: `https://api.weatherapi.com/v1/forecast.json?key=fa62b5264546453aa2e124620222901&q=cairo&days=3&aqi=no&alerts=no`,
        data: {
            format: "json"
        },
        success: function(data) {
            console.log(data);
            $(".location").text(`${data.location.name}`);
            $(".mintemp_c2").html(data.forecast.forecastday[1].day.mintemp_c + "<sup>o</sup>C");
            $(".mintemp_c3").html(data.forecast.forecastday[2].day.mintemp_c + "<sup>o</sup>C");
            $(".date").text(data.forecast.forecastday[0].date);

            for (let i = 0; i < 3; i++) {
                $(`.maxtemp_c${i+1}`).html(data.forecast.forecastday[i].day.maxtemp_c + `<sup>o</sup>C`);
                $(`.icon_weather${i+1}`).attr(`src`, `https:` + data.forecast.forecastday[i].day.condition.icon);
                $(`.day${i+1}`).text(getDayName(new Date(`${data.forecast.forecastday[i].date}`)))
                $(`.custom${i+1}`).text(data.forecast.forecastday[i].day.condition.text);
            }

        },
        error: function() {
            console.log("error cauched")
        }
    });


    // when search about any city
    $("#submit").click(function() {
        $.ajax({
            type: "GET",
            url: `https://api.weatherapi.com/v1/forecast.json?key=fa62b5264546453aa2e124620222901&q=${$("#search").val()}&days=3&aqi=no&alerts=no`,
            data: {
                format: "json"
            },
            success: function(data) {

                $(".location").text(`${data.location.name}`);
                $(".mintemp_c2").html(data.forecast.forecastday[1].day.mintemp_c + "<sup>o</sup>C");
                $(".mintemp_c3").html(data.forecast.forecastday[2].day.mintemp_c + "<sup>o</sup>C");
                $(".date").text(data.forecast.forecastday[0].date);

                for (let i = 0; i < 3; i++) {
                    $(`.maxtemp_c${i+1}`).html(data.forecast.forecastday[i].day.maxtemp_c + `<sup>o</sup>C`);
                    $(`.icon_weather${i+1}`).attr(`src`, `https:` + data.forecast.forecastday[i].day.condition.icon);
                    $(`.day${i+1}`).text(getDayName(new Date(`${data.forecast.forecastday[i].date}`)))
                    $(`.custom${i+1}`).text(data.forecast.forecastday[i].day.condition.text);
                }
            },
            error: function() {
                console.log("error cauched")
            }
        });

    });

});
