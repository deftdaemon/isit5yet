# Is It Time to Go Home Yet?
A simple website that tells you if it's time to go home yet. Based on user's locale. Now with custom time!

## Usage
By default, the time to go home is set to 5:00 PM. A custom time to go home can be set with the query string `?t=n`, where `n` is any whole number between 0 and 23 for the hour to go home (more customization coming soon). If no valid number is supplied, 17 is the default hour.

Example: https://spncrhrstn.github.io/iittghy/?t=16 for 4 PM  

### Progress/To-Do  
~~Initial version and Github upload~~  
~~Implement a clock~~  
~~Implement a countdown~~  
Better styling (mobile-friendliness)  
Message about Friday to ease pain of working (WIP - better code implementation)  
Custom end time, set by user (Default of 5:00 PM)  
Lunch timer, to try to break up the monotony of the day  
Refactor and clean up script  

#### Credits
  
Clock/countdown based on [Yaphi Berhanu's](https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/) implementation.  
Thanks to Weston for the idea. Made this so he can stop asking if it's Time to go home yet yet.
