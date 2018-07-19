# Is It Time to Go Home Yet? :clock5:
A simple website that tells you if it's time to go home yet. Now with custom end time!

### Usage
A custom time to go home can be set with the query string `?t=x`, where `x` is any time (as a string) to go home. If no valid entry is supplied, 5:00 PM is the default end time. You can check the time you entered in the browser console log or hover over the countdown timer.

Examples:  
https://spncrhrstn.github.io/iittghy/?t=4pm for 4 PM  
https://spncrhrstn.github.io/iittghy/?t=12:35 for 12:35 PM  

#### Credits
Thanks to Weston for the idea. Made this so he can stop asking if it's time to go home yet.  
Clock & countdown based on [Yaphi Berhanu's](https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/) implementation.  
Time parsing from here: https://stackoverflow.com/a/338439  
