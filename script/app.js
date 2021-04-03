// hamburger menu

const hamburger__icon = document.getElementById("hamburger");
const header = document.getElementById("header");
hamburger__icon.addEventListener("click", () => {
   
    if (header.style.height != "100vh") {
        header.style.height = "100vh";
        hamburger__icon.style.transform = "Rotate(-90deg)";
    }
    else if (header.style.height == "100vh") {
        header.style.height = "0vh";
        hamburger__icon.style.transform = "Rotate(0deg)";
    }

})

// input menu
const timerIcon = document.getElementById("timer");
const customTimeBar = document.getElementById("time__bar");
timerIcon.addEventListener("click", () => {
    if (customTimeBar.style.transform!="scaleX(1)") {
        customTimeBar.style.transform="scaleX(1)";

    }
    else if (customTimeBar.style.transform!="scaleX(0)") {
        customTimeBar.style.transform="scaleX(0)";

    }
})

// songs list

const songs = Array.from(document.querySelectorAll(".song"));
songs.forEach(element => {
    element.addEventListener("click", (e) => {
       
       var idOfSong = e.path[1].children[1].id;
       pauseAll(e,idOfSong);
       var  targetSong = document.getElementById(idOfSong);
       targetSong.play()
    })
})

function pauseAll(e,idOfSong){
    e.path[1].classList.add("active");
    songs.forEach(element=>{
       
       var idOfCurrentSong=element.childNodes[3].id;
       if(idOfCurrentSong!=idOfSong){
           element.classList.remove("active");
           var audioToBePaused=document.getElementById(idOfCurrentSong);
           audioToBePaused.pause();
           audioToBePaused.currentTime=0;
       }
   })
}

// Timer icon

const timerButtons = document.querySelectorAll(".btn");
const timerClock = document.getElementById("timerClock");


Array.from(timerButtons).forEach(element => {
    element.addEventListener("click", (e) => {
        customTimeBar.style.transform="scaleX(0)";
        var idOfWater = document.getElementById("river")
        pauseAll(e,idOfWater);
        document.getElementById("water").classList.add("active");
        idOfWater.play();
        var durationInMillisecond = element.value * 60 * 1000;
        var alarTimeInMillisecond = new Date().setTime(new Date().getTime() + durationInMillisecond);
      
        IntervalID = setInterval(() => {
            var curretTimeInMillisecond = new Date().getTime();
            var timeRemainingInMilliSecond = alarTimeInMillisecond - curretTimeInMillisecond;
            var minuteRemaining = Math.floor(timeRemainingInMilliSecond / (60 * 1000));
            var secondRemaining = Math.floor((timeRemainingInMilliSecond % (60 * 1000)) / 1000);
            checkIfTimeout(minuteRemaining, secondRemaining, IntervalID);
        }, 1000);

    })

})




function checkIfTimeout(minuteRemaining, secondRemaining, IntervalID) {
    if (minuteRemaining == 0 && secondRemaining == 0) {
        clearInterval(IntervalID);
        songs.forEach(element=>{
            element.classList.remove("active");
            var song = document.getElementById(element.childNodes[3].id);
            song.pause();
            song.currentTime=0;
       })
       
        timerClock.innerText = "00:00";
        var alarmAudio=document.getElementById("alarm");
        alarmAudio.play();
        setTimeout(() => {
            alarmAudio.pause();
            alarmAudio.currentTime=0;
        }, 30000);
    }
    else if (minuteRemaining >= 0) {
        updateMinute(minuteRemaining, secondRemaining);


    }
};

function updateMinute(minuteRemaining, secondRemaining) {
    if (minuteRemaining < 10) {
        minute = "0" + minuteRemaining;
        updateSecond(minute, secondRemaining);
    }
    else {
        updateSecond(minuteRemaining, secondRemaining);
    }

}
function updateSecond(minute, secondRemaining) {
    if (secondRemaining < 10) {
        second = "0" + secondRemaining;
        updateDisplay(minute, second)

    }
    else {
        updateDisplay(minute, secondRemaining);
    }

}
function updateDisplay(minuteRemaining, secondRemaining) {
    timerClock.innerText = `${minuteRemaining}:${secondRemaining}`;
    
}


// v 1.1.1
const restartBtn = document.getElementById("restart");
restartBtn.addEventListener("click",()=>{
    clearInterval(IntervalID);
    songs.forEach(element=>{
        element.classList.remove("active");
        var song = document.getElementById(element.childNodes[3].id);
        song.pause();
        song.currentTime=0;
   })
   
    timerClock.innerText = "00:00";
})