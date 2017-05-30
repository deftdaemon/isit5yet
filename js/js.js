//message strings
var msgTimeToGo = "IT'S TIME TO GO HOME!";
var msgNotTimeToGo = "IT'S NOT TIME TO GO HOME YET!";

function ii5y() {
    var now = new Date();
    timeNow = now.toLocaleTimeString();
    document.getElementById('clock').innerHTML = timeNow;
    var t = setTimeout(ii5y, 1000);

    // Send an alert at 5:00 PM
    if (timeNow.match(/5:00:00 PM$/)) {
        alert(msgTimeToGo);
    }

    // Check if current time matches time from 5:00:00 to 5:00:59 PM
    if (timeNow.match(/5:00:.. PM$/)) {
        document.getElementById('message').innerHTML = msgTimeToGo;
        console.log("time matched");
    }
    else {
        document.getElementById('message').innerHTML = msgNotTimeToGo;
    }
};