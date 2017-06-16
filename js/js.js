//message strings
var msgTimeToGo = "It's time to go home! " + "&#x1F603";
var msgTimeToGoAlert = "It's time to go home! :)"; //alert boxes can't handle unicode emojis
var msgNotTimeToGo = "Unfortunately, it's not time to go home yet " + "&#x1F641";
var msgFriday = "And it's Friday! Woohoo!";
var msgFridayAlt = "But it's Friday, so there's that.";

// Global variables
var endTime = new Date(); //today's date
    endTime.setHours(17, 0, 0, 0); //set endTime to 5:00 PM today
var todayDay = endTime.getDay(); //today's day as a var

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
function showDayMessage(day) {
    var messageDay = document.getElementById("message-day");

    switch (day) {
        case 5:
            if (timesUp){
                messageDay.innerHTML = msgFriday;
            }
            else{
                messageDay.innerHTML = msgFridayAlt;
            }            
            break;

        default:
            console.log("Other day");
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

        showDayMessage(todayDay); //show extra message about the current day --updates every time function runs, needs to change.
    }

    updateCountdown(); //run once at first to avoid delay
    var timeInterval = setInterval(updateCountdown, 1000); //run the countdown timer function once every second
}
/*-------------------------------------------------*/

/*--- When countdown finished function ---*/
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
