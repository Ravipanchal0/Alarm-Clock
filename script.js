let alarmName = document.getElementById("alarm-name"),
  settedAlarm = document.getElementById("setted-alarm"),
  setTime = document.getElementById("set-time"),
  alarmRing = document.getElementById("alarm-ring"),
  hour = document.getElementById("hour"),
  min = document.getElementById("min");

let alarmtime = document.getElementById("time"),
  aName = document.getElementById("set-alarm-name");

const setBtn = document.getElementById("set-alarm"),
  stopBtn = document.getElementById("stop-alarm");

const ampms = document.getElementById("ampm");

var x = document.getElementById("myAudio");

setBtn.addEventListener("click", (e) => {
  hour = hour.value.length == 1 ? "0" + hour.value : hour.value;
  min = min.value.length == 1 ? "0" + min.value : min.value;
  e.preventDefault();

  if (alarmName.value == "") {
    alert("please enter alarm name");
  } else {
    settedAlarm.classList.replace("hidden", "block");
    settedAlarm.innerHTML = alarmName.value + " - " + (hour + " : " + min + ampms.value);
    alarm();
  }
});

stopBtn.addEventListener("click", () => {
  x.pause();
  alarmRing.classList.replace("flex", "hidden");
  setTime.classList.replace("hidden", "flex");
  settedAlarm.classList.replace("block", "hidden");
});

function ringAlarm(hr, mins, ampm) {
  setTime.classList.replace("flex", "hidden");
  alarmRing.classList.replace("hidden", "flex");

  aName.innerHTML = alarmName.value;
  alarmtime.innerHTML = hr + ":" + mins + " " + ampm;

  x.play();
  x.loop = true;
  setTime.reset();
}

function alarm() {
  var sinterval = setInterval(() => {
    let clearAlarm = document.getElementsByClassName("close-btn")[0];
    clearAlarm.addEventListener("click", () => {
      hour = 00;
      min = 00;
      clearInterval(sinterval);
      setTime.reset();
      settedAlarm.classList.replace("block", "hidden");
    });

    let d = new Date();
    let hours = d.getHours();
    let minute = d.getMinutes();

    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minute = minute < 10 ? "0" + minute : minute;

    if (hours == Number(hour) && minute == Number(min) && ampm == ampms.value) {
      ringAlarm(hours, minute, ampm);
      clearInterval(sinterval);
    }
  }, 1000);
}
