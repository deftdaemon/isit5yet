function ii5y() {
    var now = new Date();
    timeNow = now.toLocaleTimeString();
    console.log(timeNow);
    return timeNow;
};

function startTime() {
    var now = new Date();
    timeNow = now.toLocaleTimeString();
    document.getElementById('clock').innerHTML = "<p>" + timeNow + "</p>";
    var t = setTimeout(startTime, 1000);
    var visible = false;

    // Send an alert at 5:00 PM
    if (timeNow.match(/5:00:00 PM$/)) {
        alert("IT'S TIME TO GO HOME!");
    }

    // Check if current time matches time from 5:00:00 to 5:00:59 PM
    if (timeNow.match(/5:00:.. PM$/)) {
        visible = true;
        document.getElementById('message').style.visibility = 'initial';
        document.getElementById('message').innerHTML = "<p>IT'S TIME TO GO HOME!</p>";
        console.log("winner");
        
    }
    else {
        //document.getElementById('message').style.visibility = 'hidden';
        document.getElementById('message').innerHTML = "<p>IT'S NOT TIME TO GO HOME YET!</p>";

    }
};