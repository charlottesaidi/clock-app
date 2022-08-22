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
        // LIVE CLOCK
        showTime()

        // DISPLAY INFORMATIONS
        const time = new Date();
        const timezone = getTimeZoneAbbr(time);
        const weekDay = time.getDay();
        const weekNumber = time.getWeekNumber();
        const yearDay = getDayNumber(time);

        document.getElementById("timezone").innerHTML = timezone;
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

        if(time.getHours() >= 5 && time.getHours() <= 18 ) {
            document.body.classList.add('daytime_background');
        } else {
            document.body.classList.add('nightime_background');
        }
}

function getLocation() {
    const xhttp = new XMLHttpRequest();
        xhttp.onload  = function() {
            const town = this.response.city;
            const country = this.response.country_code;
            const currTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;;
            document.getElementById("town").innerHTML = town;
            document.getElementById("country").innerHTML = country;
            document.getElementById("curr_timezone").innerHTML = currTimezone;
        }
        
    xhttp.responseType = "json";
    xhttp.open("GET", "http://api.ipstack.com/check?access_key=ecba014f817804a5849fb28c0a1273d2", true);
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

Date.prototype.getWeekNumber = function(){
    var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
};

function getDayNumber(time) {
    var start = new Date(time.getFullYear(), 0, 0);
    var diff = (time - start) + ((start.getTimezoneOffset() - time.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay)
}

function getTimeZoneAbbr(time) {
    var timeZone = moment.tz.guess();
    var timeZoneOffset = time.getTimezoneOffset();
    return moment.tz.zone(timeZone).abbr(timeZoneOffset);
}

function showOrHide() {
    var hiddenStatSection = document.getElementById('hidden_section');
    var randomQuoteSection = document.getElementById('quote_section');
    var dateTimeSection = document.getElementById('time_section');
    var moreLessBtn = document.getElementById('more_less');
    var btnArrow = document.getElementById('arrow');

    btnArrow.classList.toggle('arrow_up');
    hiddenStatSection.classList.toggle('show_section');
    randomQuoteSection.classList.toggle('hidden');
    dateTimeSection.classList.toggle('toggle_padding');

    (moreLessBtn.innerHTML == "More" ? moreLessBtn.innerHTML = "Less" : moreLessBtn.innerHTML = "More");
}
