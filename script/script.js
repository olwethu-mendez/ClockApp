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
        displayTime.innerHTML = "00:00:00:00"
    })
}

{
    const btnStopwatch = document.querySelector('.btn-stopwatch')
    const btnClock = document.querySelector('.btn-clock')
    let stopwatchBlock = document.querySelector('.stopwatch')
    let stopwatchDisplay = 0
    let clockBlock = document.querySelector('.clock')
    let clockDisplay = 0

    let stopwatchIcon = document.querySelector('#stopwatchIcon')
    let clockIcon = document.querySelector('#clockIcon')


    btnStopwatch.addEventListener('click', function hideStopwatch(){
        if(stopwatchDisplay === 1){
            stopwatchBlock.style.display = 'block';
            stopwatchDisplay = 0;
            clockBlock.style.display = 'none';
            clockDisplay = 1;
            stopwatchIcon.classList.remove("fa-solid fa-stopwatch")
            stopwatchIcon.classList.add("fas fa-window-close")
        }
        else{
            stopwatchBlock.style.display = 'none';
            stopwatchDisplay = 1;
            stopwatchIcon.classList.add("fa-solid fa-stopwatch")
            stopwatchIcon.classList.remove("fas fa-window-close")
        }
    })

    btnClock.addEventListener('click', function hideClock(){
        if(clockDisplay === 1){
            clockBlock.style.display = 'block';
            clockDisplay = 0;
            stopwatchBlock.style.display = 'none';
            stopwatchDisplay = 1;
            clockIcon.classList.remove("fa-solid fa-clock")
            clockIcon.classList.add("fas fa-window-close")
        }
        else{
            clockBlock.style.display = 'none';
            clockDisplay = 1;
            clockIcon.classList.add("fa-solid fa-clock")
            clockIcon.classList.remove("fas fa-window-close")
        }
    })
}

setClock()