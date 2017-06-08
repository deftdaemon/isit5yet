//message strings
var msgTimeToGo = "It's time to go home! " + "&#x1F603";
var msgNotTimeToGo = "Unfortunately, it's not time to go home yet " + "&#x1F641";

var endTime = new Date(); //today's date
endTime.setHours(17, 0, 0, 0); //set endTime to 5:00 PM today

/*--- Run this on load ---*/
function iittghy() {
    initializeClock('clock');
    initializeCountdown('countdown', endTime);
}

/*--- Gets the current time and returns a string of the current time (in users locale) ---*/
function getCurrentTime() {
    var now = new Date();
    timeNow = now.toLocaleTimeString();
    //console.log("getCurrentTime: " + timeNow);
    return timeNow;
}

/*--- This function based off of https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/ ---*/
function getTimeRemaining(endTime) {
    var t = Date.parse(endTime) - Date.parse(new Date());
    var seconds = Math.floor(t / 1000 % 60);
    var minutes = Math.floor(t / 1000 / 60 % 60);
    var hours = Math.floor(t / (1000 * 60 * 60) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));

    //var returnTime = hours.toString() + ":" + minutes.toString() + ":" + seconds.toString();
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

/*--- Create the clock ---*/
/*--- Takes an html element id and creates a clock in that element ---*/
function initializeClock(id) {
    var clock = document.getElementById(id);

    function updateClock() {
        var currTime = getCurrentTime();
        clock.innerHTML = currTime;
    }

    updateClock(); //run once at first to avoid delay
    var timeInterval = setInterval(updateClock, 1000);
}

/*--- Create the countdown ---*/
function initializeCountdown(id, endtime) {
    var countdownTimer = document.getElementById(id);
    var message = document.getElementById('message');
    var countdownMessage = document.getElementById('countdown-message');
    message.innerHTML = msgNotTimeToGo;

    //updates the countdown timer
    function updateCountdown() {
        var t = getTimeRemaining(endtime);
        countdownTimer.innerHTML = t.hours + ':' + ('0' + t.minutes).slice(-2) + ':' + ('0' + t.seconds).slice(-2); //add leading zeros to minutes and seconds

        //when time remaining = 0, show alert and play jingle
        if (t.total === 0) {
            clearInterval(timeInterval);
            countdownMessage.innerHTML = "YOU MADE IT!";
            message.innerHTML = msgTimeToGo;
            alert(msgTimeToGo);
            playAudio();
        }

        //after the initial alert above, stop the timer and just leave a message
        else if (t.total < 0) {
            clearInterval(timeInterval);
            countdownMessage.innerHTML = "YOU MADE IT!";
            message.innerHTML = msgTimeToGo;
            console.log(t.total);
        }
        else {
            //message.innerHTML = msgNotTimeToGo;
        }
    }

    updateCountdown(); //run once at first to avoid delay
    var timeInterval = setInterval(updateCountdown, 1000); //run the countdown timer function once every second
}
/*-------------------------------------------------*/

/*--- Play an audio file ---*/
function playAudio() {
    var audio = new Audio("files/BootyJingle.mp3");
    audio.play();
}
