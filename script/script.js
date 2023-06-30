setInterval(setClock, 1000)

const hourHand = document.querySelector('#hour-hand')
const minuteHand = document.querySelector('#minute-hand')
const secondHand = document.querySelector('#second-hand')

function setClock() {
    const currentDate = new Date()
    const secondsRatio = currentDate.getSeconds() / 60
    const minutesRatio = (secondsRatio +currentDate.getMinutes()) / 60
    const hoursRatio = (minutesRatio + currentDate.getHours()) / 12
    setRotation(secondHand, secondsRatio)
    setRotation(minuteHand, minutesRatio)
    setRotation(hourHand, hoursRatio)
}

function setRotation(element, rotationRatio){
    element.style.setProperty('--rotation', rotationRatio * 360)
}

{
    const btnStart = document.querySelector('.btn-start')
    const btnStop = document.querySelector('.btn-stop')
    const btnReset = document.querySelector('.btn-reset')

    let [stopMiliSeconds, stopSeconds, stopMinutes, stopHours] = [0,0,0,0];
    let displayTime = document.querySelector('#displayTime');
    let stopTimer = null;

    function stopwatch(){
        stopMiliSeconds++
        if(stopMiliSeconds == 10){
            stopMiliSeconds = 0
            stopSeconds++;
            if(stopSeconds == 60){
                stopSeconds = 0;
                stopMinutes++;
                if(stopMinutes == 60){
                    stopMinutes = 0;
                    stopHours++
                }
            }
        }

        let h = stopHours < 10 ? "0" + stopHours : stopHours;
        let m = stopMinutes < 10 ? "0" + stopMinutes : stopMinutes;
        let s = stopSeconds < 10 ? "0" + stopSeconds : stopSeconds;
        let ms = stopMiliSeconds < 10 ? "0" + stopMiliSeconds : stopMiliSeconds;

        displayTime.innerHTML = h + ':' + m + ':' + s + ':' + ms;
    }
    btnStart.addEventListener('click', function watchStart(){
        if(stopTimer !== null){
            clearInterval(stopTimer);
        }
        stopTimer = setInterval(stopwatch,100);
    })

    btnStop.addEventListener('click', function watchStop(){
        clearInterval(stopTimer);
    })

    btnReset.addEventListener('click', function watchReset(){
        clearInterval(stopTimer);
        [stopMiliSeconds, stopSeconds, stopMinutes, stopHours] = [0, 0,0,0];
        displayTime.innerHTML = "00:00:00:0"
    })
}

{ //TIMER CODE
    const btnStartCountdown = document.querySelector('.start-timer');
    btnStartCountdown.classList.add('close-modal')
    function startTimer() {
        let inputHour = parseInt(document.getElementById("input-hour").value) || 0;
        let inputMinute = parseInt(document.getElementById("input-minute").value) || 0;
        let inputSecond = parseInt(document.getElementById("input-second").value) || 0;

        clearInputs(inputHour, inputMinute, inputSecond);

        let totalSeconds = (inputHour * 3600) + (inputMinute * 60) + inputSecond;

        const countdownTimer = document.getElementById("countdown-timer");
        const semicircles = document.getElementsByClassName("semicircle");

        let intervalHandle = setInterval(function() {
            let hours = Math.floor(totalSeconds / 3600);
            let minutes = Math.floor((totalSeconds % 3600) / 60);
            let seconds = totalSeconds % 60;

            hours = hours.toString().padStart(2, "0");
            minutes = minutes.toString().padStart(2, "0");
            seconds = seconds.toString().padStart(2, "0");

            countdownTimer.innerHTML = hours + ":" + minutes + ":" + seconds;
            if (totalSeconds < 6) {
                for (var i = 0; i < semicircles.length; i++) {
                    document.querySelector('#countdown-timer').style.color = "red";
                    document.querySelector('.timer-nr-container').classList.add("blink-content");
                    document.querySelector('.timer-buttons').style.display = "block";
                }
            } else {
                for (var i = 0; i < semicircles.length; i++) {
                    document.querySelector('#countdown-timer').style.color = "white";
                    document.querySelector('.timer-buttons').style.display = "block";
                }
            }

            if (totalSeconds === 0) {
                clearInterval(intervalHandle);
                document.querySelector('#countdown-timer').style.color = "white";
                document.querySelector('.timer-buttons').style.display = "none";
            }

            totalSeconds--;
        }, 1000);
        
    }

    function clearInputs(tHour, tMinute, tSecond){
        tHour = 0;
        tMinute = 0;
        tSecond = 0;
    }

    function pauseTimer() {
        isPaused = true;
        let countdownTimer = document.getElementById("countdown-timer");
        countdownTimer.classList.add("paused-timer");
    }

    function resumeTimer() {
        isPaused = false;
        let countdownTimer = document.getElementById("countdown-timer");
        countdownTimer.classList.remove("paused-timer");
    }
}

{ //NAV TAB CONTROL JS CODE
    let btnStopwatch = document.querySelector('.btn-stopwatch')
    let btnClock = document.querySelector('.btn-clock')
    let btnTimer = document.querySelector('.btn-timer')
    let stopwatchBlock = document.querySelector('.stopwatch')
    let stopwatchDisplay = 1
    let clockBlock = document.querySelector('.clock')
    let clockDisplay = 0
    let timerBlock = document.querySelectorAll('.timer-center')
    let timerDisplay = 1

    let stopwatchIcon = document.querySelector('#stopwatchIcon')
    let clockIcon = document.querySelector('#clockIcon')
    let timerIcon = document.querySelector('#timerIcon')


    btnStopwatch.addEventListener('click', function hideStopwatch(){
        if(stopwatchDisplay === 1){
            stopwatchBlock.style.display = 'block';
            stopwatchDisplay = 0;
            clockBlock.style.display = 'none';
            clockDisplay = 1;
            timerBlock[0].style.display = 'none';
            timerBlock[1].style.display = 'none';
            timerBlock[2].style.display = 'none';
            timerBlock[3].style.display = 'none';
            timerDisplay = 1;
            btnClock.classList.remove("active")
            btnTimer.classList.remove("active")
            btnStopwatch.classList.add("active")
            stopwatchIcon.classList.remove("fas")
            // stopwatchIcon.classList.remove("fa-stopwatch")
            stopwatchIcon.classList.add("fa-solid")
            clockIcon.classList.remove("fas")
            clockIcon.classList.add("far")
            timerIcon.classList.remove("fas")
            timerIcon.classList.add("far")
        }
        // else{
        //     stopwatchBlock.style.display = 'none';
        //     stopwatchDisplay = 1;
        //     clockBlock.style.display = 'block';
        //     clockDisplay = 0
        //     // stopwatchIcon.classList.add("fa-solid")
        //     // stopwatchIcon.classList.add("fa-stopwatch")
        //     // stopwatchIcon.classList.remove("fas")
        //     // stopwatchIcon.classList.remove("fa-window-close")
        //     // btnStopwatch.innerHTML = '<i class="fa-solid fa-stopwatch" id="stopwatchIcon"></i> Stopwatch';
        //     btnStopwatch.classList.remove("active")
        //     btnClock.classList.add("active")            
        // }
    })

    btnClock.addEventListener('click', function hideClock(){
        if(clockDisplay === 1){
            clockBlock.style.display = 'block';
            clockDisplay = 0;
            stopwatchBlock.style.display = 'none';
            stopwatchDisplay = 1;
            timerBlock[0].style.display = 'none';
            timerBlock[1].style.display = 'none';
            timerBlock[2].style.display = 'none';
            timerBlock[3].style.display = 'none';
            timerDisplay = 1;
            btnClock.classList.add("active")
            btnStopwatch.classList.remove("active")
            btnTimer.classList.remove("active")
            clockIcon.classList.remove("far")
            clockIcon.classList.add("fas")
            stopwatchIcon.classList.remove("fa-solid")
            stopwatchIcon.classList.add("fas")
            timerIcon.classList.remove("fas")
            timerIcon.classList.add("far")
        }
        // else{
        //     clockblock.style.display = 'none';
        //     clockdisplay = 1;
        //     stopwatchBlock.style.display = 'block';
        //     stopwatchDisplay = 0;
        //     clockicon.classlist.add("fa-solid fa-clock")
        //     clockicon.classlist.remove("fas fa-window-close")
        // }
    })

    btnTimer.addEventListener('click', function hideTimer(){
        if(timerDisplay === 1){
            timerBlock[0].style.display = 'flex';
            timerBlock[1].style.display = 'flex';
            timerBlock[2].style.display = 'flex';
            timerBlock[3].style.display = 'flex';
            timerDisplay = 0;
            clockBlock.style.display = 'none';
            clockDisplay = 1;
            stopwatchBlock.style.display = 'none';
            stopwatchDisplay = 1;
            btnTimer.classList.add("active")
            btnClock.classList.remove("active")
            btnStopwatch.classList.remove("active")
            clockIcon.classList.remove("fas")
            clockIcon.classList.add("far")
            stopwatchIcon.classList.remove("fa-solid")
            stopwatchIcon.classList.add("fas")
            timerIcon.classList.remove("far")
            timerIcon.classList.add("fas")
        }
    })
}

{//DYNAMIC BACKGROUND JS CODE
    function updateBackground(){
        let currentHour = new Date().getHours();
        let container = document.querySelector('body');
        let dayColour = 'linear-gradient(to top, #0000FF, #1a11e6, #2210dd, #F2950D)';
        let lateColour = 'linear-gradient(to bottom, #0000FF, #4000c0, #808080)';
        let nightColour = 'linear-gradient(to top, #000040, #72787f)';
        let earlyColour = 'linear-gradient(to bottom, #000040, #4d32b3, #b3744d)';
        let clock = document.querySelector('.clock');
        let timer = document.querySelector('.outer-circle');
        let stopwatch = document.querySelector('.stopwatch');
        let moonColour = '#848c8e';
        let sunColour = '#FDB813';
        // let m = new Date().getMinutes();

        if(currentHour >= 8 && currentHour < 17) {
            container.style.transition = "all 10s";
            clock.style.transition = "all 10s";
            container.style.backgroundImage = dayColour;
            clock.style.backgroundColor = sunColour
            timer.style.backgroundColor = sunColour
            stopwatch.style.backgroundColor = sunColour
        }
        else if(currentHour >= 17 && currentHour <19){
            container.style.transition = "all 10s";
            clock.style.transition = "all 10s";
            container.style.backgroundImage = lateColour;
            clock.style.backgroundColor = moonColour;
            timer.style.backgroundColor = moonColour;
            stopwatch.style.backgroundColor = moonColour;
        }
        else if(currentHour >= 19 && currentHour <= 23){
            container.style.transition = "all 10s";
            clock.style.transition = "all 10s";
            container.style.backgroundImage = nightColour;
            clock.style.backgroundColor = moonColour;
            timer.style.backgroundColor = moonColour;
            stopwatch.style.backgroundColor = moonColour;
        }
        else if(currentHour >= 0 && currentHour <5){
            container.style.transition = "all 10s";
            clock.style.transition = "all 10s";
            container.style.backgroundImage = nightColour;
            clock.style.backgroundColor = moonColour;
            timer.style.backgroundColor = moonColour;
            stopwatch.style.backgroundColor = moonColour;
        }
        else if(currentHour >= 5 && currentHour < 8){
            container.style.transition = "all 10s";
            clock.style.transition = "all 10s";
            container.style.backgroundImage = earlyColour;
            clock.style.backgroundColor = sunColour;
            timer.style.backgroundColor = sunColour;
            stopwatch.style.backgroundColor = sunColour;
        }
    }
}

setClock()
updateBackground()
setInterval(updateBackground, 30000)