//message strings
var msgTimeToGo = "It's time to go home! " + "&#x1F603";
var msgTimeToGoAlert = "It's time to go home! :)"; //alert boxes can't handle unicode emojis
var msgNotTimeToGo = "Unfortunately, it's not time to go home yet " + "&#x1F641";
var msgFriday = "And it's Friday! Woohoo!";
var msgFridayAlt = "But it's Friday, so that's nice.";

// Global variables

//Get the custom end time using a URL parameter
//See here: https://stackoverflow.com/q/901115
let params = new URLSearchParams(location.search.slice(1));
let customEndTime = params.get('t');

//set the end time
var endTime = parseTime(customEndTime);

var timesUp = false; //a boolean set to whether the countdown is finished or not

/*--- Run this on load ---*/
function iittghy() {
    initializeClock('clock');
    initializeCountdown('countdown', endTime);
}

/*--- Gets the current time and returns a string of the current time (in users locale) ---*/
function getCurrentTime() {
    var now = new Date();
    timeNow = now.toLocaleTimeString();
    return timeNow;
}

/*--- Takes a day value (0-6) and displays a message based on the day ---*/
function showDayMessage() {
    var messageDay = document.getElementById("message-day");

    var today = new Date();
    switch (today.getDay()) {
        case 5:
            if (timesUp){
                messageDay.innerHTML = msgFriday;
            }
            else{
                messageDay.innerHTML = msgFridayAlt;
            }            
            break;
        default:
            break;
    }
}

/*--- These functions based off of https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/ ---*/
function getTimeRemaining(endTime) {
    var t = Date.parse(endTime) - Date.parse(new Date());
    var seconds = Math.floor(t / 1000 % 60);
    var minutes = Math.floor(t / 1000 / 60 % 60);
    var hours = Math.floor(t / (1000 * 60 * 60) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));

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
/*--- Takes an HTML element and a date object (with desired time) and creates a countdown timer ---*/
function initializeCountdown(id, endtime) {
    var countdownTimer = document.getElementById(id);
    var message = document.getElementById('message');
    var countdownMessage = document.getElementById('countdown-message');
    message.innerHTML = msgNotTimeToGo;

    //updates the countdown timer
    function updateCountdown() {
        var t = getTimeRemaining(endtime);
        countdownTimer.innerHTML = t.hours + ':' + ('0' + t.minutes).slice(-2) + ':' + ('0' + t.seconds).slice(-2); //add leading zeros to minutes and seconds
        countdownTimer.setAttribute('title', endTime.toLocaleString());

        //when time remaining = 0, show alert and play jingle
        if (t.total === 0) {
            clearInterval(timeInterval);
            countdownOver(message,countdownMessage);
            alert(msgTimeToGoAlert);
            //playAudio(); // play an audio file.
        }

        //after the initial alert above, stop the timer and just leave a message
        else if (t.total < 0) {
            clearInterval(timeInterval);
            countdownOver(message,countdownMessage);
        }
        else {
            timesUp = false;
        }

        showDayMessage(); //show extra message about the current day --updates every time function runs, needs to change.
    }

    updateCountdown(); //run once at first to avoid delay
    var timeInterval = setInterval(updateCountdown, 1000); //run the countdown timer function once every second
}
/*-------------------------------------------------*/

/*--- When the countdown is finished ---*/
function countdownOver(msg, cdmsg) {
    msg.innerHTML = msgTimeToGo;
    cdmsg.innerHTML = "YOU MADE IT!";
    timesUp = true;
}

/*--- Play an audio file ---*/
function playAudio() {
    var audio = new Audio("files/BootyJingle.mp3");
    audio.play();
}

//parsing based on this stackoverflow answer: https://stackoverflow.com/a/338439
function parseTime(timeString) {
    //create new date object
    var d = new Date(); //new date set to now
    if (/\d/.test(timeString) == false){
        d.setHours(17, 0, 0, 0); //set endTime to 5:00 PM today
        console.log('No time found! Setting end time to 5:00 PM');
    }
    else{
        var time = timeString.match(/(\d+)(:(\d\d))?\s*(p?)/i);
        d.setHours(parseInt(time[1], 10) + ((parseInt(time[1], 10) < 12 && time[4]) ? 12 : 0));
        d.setMinutes(parseInt(time[3], 10) || 0);
        d.setSeconds(0, 0);
        console.log('The set end time is ' + d.toLocaleString());
    }
    return d;
}
