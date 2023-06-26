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

{
    const semicircles = document.querySelectorAll('.semicircle');
    const timer = document.querySelector('.timer');

    let hr = document.querySelector('.input-hour').value;
    if(hr === isNaN){
        hr = 0;
    }
    let min = document.querySelector('.input-minute').value;
    if(min === isNaN){
        hr = 0;
    }
    let sec = document.querySelector('.input-second').value;
    if(sec === isNaN){
        sec = 10;
    }

    const btnStartTimer = document.querySelector('.start-timer');

    const hours = hr * 3600000;
    const minutes = min * 60000;
    const seconds = sec * 1000;
    const setTime = hours + minutes + seconds;
    const startTime = Date.now();
    const futureTime = startTime + setTime;

    const timerLoop = setInterval(countDownTimer);
    countDownTimer();

    btnStartTimer.addEventListener('click',function() {
    })

    function countDownTimer() {
        const currentTime = Date.now();
        const remainingTime = futureTime - currentTime;
        const angle = (remainingTime / setTime) * 360;

        if(angle > 180){
            semicircles[2].style.display = 'none';
            semicircles[0].style.transform = 'rotate(180deg)';
            semicircles[1].style.transform = `rotate(${angle}deg)`;
        }else{
            semicircles[2].style.display = 'block';
            semicircles[0].style.transform = `rotate(${angle}deg)`;
            semicircles[1].style.transform = `rotate(${angle}deg)`;
        }

        const hrs = Math.floor((remainingTime / (1000 * 60 *60))%24).toLocaleString('en-ZA', {minimumIntegerDigits: 2, useGrouping: false});
        const mins = Math.floor((remainingTime / (1000 * 60 ))%60).toLocaleString('en-ZA', {minimumIntegerDigits: 2, useGrouping: false});
        const secs = Math.floor((remainingTime / (1000))%60).toLocaleString('en-ZA', {minimumIntegerDigits: 2, useGrouping: false});

        timer.innerHTML = `
        <div class="timer-nr-container">
        <div>${hrs}</div>
        <div class="colon">:</div>
        <div>${mins}</div>
        <div class="colon">:</div>
        <div>${secs}</div>
        </div>
        `;
        
        if(remainingTime <= 6000){
            semicircles[1].style.backgroundColor = 'red';
            semicircles[0].style.backgroundColor = 'red';
            timer.style.color = 'red';
        }
        
        if(remainingTime < 0){
            clearInterval(timerLoop);

            semicircles[0].style.display = 'none';
            semicircles[1].style.display = 'none';
            semicircles[2].style.display = 'none';
            
            timer.innerHTML = `
            <div class="timer-nr-container">
            <div>00</div>
            <div class="colon">:</div>
            <div>00</div>
            <div class="colon">:</div>
            <div>00</div>
            </div>
            `;

            timer.style.color = "lightgray";
        }
    }
}

{
    let btnStopwatch = document.querySelector('.btn-stopwatch')
    let btnClock = document.querySelector('.btn-clock')
    let btnTimer = document.querySelector('.btn-timer')
    let stopwatchBlock = document.querySelector('.stopwatch')
    let stopwatchDisplay = 0
    let clockBlock = document.querySelector('.clock')
    let clockDisplay = 0
    let timerBlock = document.querySelectorAll('.timer-center')
    let timerDisplay = 0

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
        else{
            stopwatchBlock.style.display = 'none';
            stopwatchDisplay = 1;
            clockBlock.style.display = 'block';
            clockDisplay = 0
            // stopwatchIcon.classList.add("fa-solid")
            // stopwatchIcon.classList.add("fa-stopwatch")
            // stopwatchIcon.classList.remove("fas")
            // stopwatchIcon.classList.remove("fa-window-close")
            // btnStopwatch.innerHTML = '<i class="fa-solid fa-stopwatch" id="stopwatchIcon"></i> Stopwatch';
            btnStopwatch.classList.remove("active")
            btnClock.classList.add("active")            
        }
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
        else{
            clockblock.style.display = 'none';
            clockdisplay = 1;
            stopwatchBlock.style.display = 'block';
            stopwatchDisplay = 0;
            clockicon.classlist.add("fa-solid fa-clock")
            clockicon.classlist.remove("fas fa-window-close")
        }
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

{
    function updateBackground(){
        let currentHour = new Date().getHours();
        let container = document.querySelector('body');
        let dayColour = 'linear-gradient(to top, #0000FF, #1a11e6, #2210dd, #F2950D)';
        let lateColour = 'linear-gradient(to bottom, #0000FF, #4000c0, #808080)';
        let nightColour = 'linear-gradient(to top, #000040, #72787f)';
        let earlyColour = 'linear-gradient(to bottom, #000040, #4d32b3, #b3744d)';
        let clock = document.querySelector('.clock');
        let moonColour = '#848c8e';
        let sunColour = '#FDB813';
        // let m = new Date().getMinutes();

        if(currentHour >= 8 && currentHour < 17) {
            container.style.transition = "all 10s";
            clock.style.transition = "all 10s";
            container.style.backgroundImage = dayColour;
            clock.style.backgroundColor = sunColour
        }
        else if(currentHour >= 17 && currentHour <19){
            container.style.transition = "all 10s";
            clock.style.transition = "all 10s";
            container.style.backgroundImage = lateColour;
            clock.style.backgroundColor = moonColour;
        }
        else if(currentHour >= 19 && currentHour <= 23){
            container.style.transition = "all 10s";
            clock.style.transition = "all 10s";
            container.style.backgroundImage = nightColour;
            clock.style.backgroundColor = moonColour;
        }
        else if(currentHour >= 0 && currentHour <5){
            container.style.transition = "all 10s";
            clock.style.transition = "all 10s";
            container.style.backgroundImage = nightColour;
            clock.style.backgroundColor = moonColour;
        }
        else if(currentHour >= 5 && currentHour < 8){
            container.style.transition = "all 10s";
            clock.style.transition = "all 10s";
            container.style.backgroundImage = earlyColour;
            clock.style.backgroundColor = sunColour
        }
    }
}

setClock()
updateBackground()
setInterval(updateBackground, 30000)