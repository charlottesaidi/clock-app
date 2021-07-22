    window.onload = function() {
    displayRandomQuotes();
    dayOrNight();
    getLocation();
}

// FUNCTIONS
function displayRandomQuotes() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload  = function() {
        const quote = this.response.content;
        const author = this.response.author;
        document.getElementById("quote").innerHTML = quote;
        document.getElementById("author").innerHTML = author;
    }
    xhttp.responseType = "json";
    xhttp.open("GET", "https://api.quotable.io/random", true);
    xhttp.send();
} 

function dayOrNight() {
    const xhttp = new XMLHttpRequest();
        xhttp.onload  = function() {
            const time = new Date(this.response.datetime);
            const timezone = this.response.abbreviation;
            const currTimezone = this.response.timezone;
            const yearDay = this.response.day_of_year;
            const weekDay = this.response.day_of_week;
            const weekNumber = this.response.week_number;

            showTime();

            // document.getElementById("time").innerHTML = time.format("HH:MM");
            document.getElementById("timezone").innerHTML = timezone;
            document.getElementById("curr_timezone").innerHTML = currTimezone;
            document.getElementById("year_day").innerHTML = yearDay;
            document.getElementById("week_day").innerHTML = weekDay;
            document.getElementById("week_number").innerHTML = weekNumber;

            if(time.getHours() >= 5 && time.getHours() <= 12 ) {
                document.getElementById("greet").innerHTML = "Good morning";
            } else if(time.getHours() >= 12 && time.getHours() <= 18 ) {
                document.getElementById("greet").innerHTML = "Good afternoon";
            } else {
                document.getElementById("greet").innerHTML = "Good evening";
            }

            var greetingIcon = document.getElementById("greeting_icon");
            var backgroundFilterBlock = document.getElementById("background-filter");
            var hiddenStatSection = document.getElementById("hidden_section");
            var firstStatBlockBorder = document.getElementById("first_stats_block");

            if(time.getHours() >= 5 && time.getHours() <= 12 ) {
                document.body.classList.add('daytime_background');
                greetingIcon.src = 'assets/images/desktop/icon-sun.svg';
                backgroundFilterBlock.classList.add('background-filter');
                hiddenStatSection.classList.add('light_background');
                hiddenStatSection.classList.add('dark_police');
                firstStatBlockBorder.classList.add('dark_border');
            } else {
                document.body.classList.add('nightime_background');
                greetingIcon.src = 'assets/images/desktop/icon-moon.svg';
                hiddenStatSection.classList.add('dark_background');
                firstStatBlockBorder.classList.add('light_border');
            }
        }
    xhttp.responseType = "json";
    xhttp.open("GET", "https://worldtimeapi.org/api/ip");
    xhttp.send();
}

function getLocation() {
    const xhttp = new XMLHttpRequest();
        xhttp.onload  = function() {
            const town = this.response.city;
            const country = this.response.country_code;
            document.getElementById("town").innerHTML = town;
            document.getElementById("country").innerHTML = country;
        }
    xhttp.responseType = "json";
    xhttp.open("GET", "https://freegeoip.app/json/", true);
    xhttp.send();
}

function showTime() {
    var currentTime = new Date();
    var currentHours = currentTime.getHours();
    var currentMinutes = currentTime.getMinutes();
    currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
    currentHours = (currentHours < 10 ? "0" : "") + currentHours;
    var currentTimeString = currentHours + ":" + currentMinutes;
    document.getElementById("time").innerHTML = currentTimeString;
    setInterval(showTime, 1000);
}

function showOrHide() {
    var hiddenStatSection = document.getElementById('hidden_section');
    var randomQuoteSection = document.getElementById('quote_section');
    var dateTimeSection = document.getElementById('time_section');
    var moreLessBtn = document.getElementById('more_less');
    var btnArrow = document.getElementById('arrow');

    if(hiddenStatSection.classList.contains("hidden")) {
        hiddenStatSection.classList.replace("hidden", "show_section");
    } else {
        hiddenStatSection.classList.replace("show_section", "hidden");
    }

    if(randomQuoteSection.classList.contains("random_quotes")) {
        randomQuoteSection.classList.replace('random_quotes', "hidden");
    } else {
        randomQuoteSection.classList.replace( "hidden", 'random_quotes');
    }
    
    if(dateTimeSection.classList.contains('toggle_padding')) {
        dateTimeSection.classList.remove('toggle_padding');
    } else {
        dateTimeSection.classList.add('toggle_padding');
    }
    
    if(btnArrow.classList.contains('arrow_down')) {
        btnArrow.classList.replace('arrow_down', "arrow_up")
    } else {
        btnArrow.classList.replace("arrow_up", 'arrow_down')
    }

    if(moreLessBtn.innerHTML == "More") {
        moreLessBtn.innerHTML = "Less"
    } else {
        moreLessBtn.innerHTML = "More"
    }
}
