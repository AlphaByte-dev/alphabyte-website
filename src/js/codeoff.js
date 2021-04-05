var countDownDate = new Date("2021-04-24T10:00:00+05:30").getTime();
var timeElement = document.getElementById("countdown");
var currentDate = new Date().toLocaleDateString();
var registerButton = document.getElementById("registerButton");

var x = setInterval(function () {
  var now = new Date().getTime();
  console.log(currentDate);
  if (currentDate === "4/24/2021") {
    timeElement.classList.remove("time");
    timeElement.innerHTML =
      "<div class='time_finish'>The event is in progress!</div>";
    registerButton.innerHTML = "";
    return;
  }
  if (currentDate === "4/26/2021") {
    timeElement.classList.remove("time");
    timeElement.innerHTML =
      "<div class='time_finish'>This event has concluded.</div>";
    registerButton.innerHTML = "";
    return;
  }

  var distance = countDownDate - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("cd-days").innerHTML = days;

  document.getElementById("cd-hours").innerHTML = hours;

  document.getElementById("cd-minutes").innerHTML = minutes;

  document.getElementById("cd-seconds").innerHTML = seconds;

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);

//Auto scroll code

var elements = document.getElementsByClassName("circle-btn");

for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener("click", handleScrollClick);
}

function handleScrollClick(event) {
  var destinationName = event.target.parentElement.getAttribute("data-name");
  var elmnt = document.getElementById(destinationName);
  elmnt.scrollIntoView({ behavior: "smooth", block: "start" });
}

//Rules

var rules = [
  "1. Only languages supported on HackerRank are allowed",
  "2. Problem statements become available at the start of the round",
  "3. The competition will consist of multiple rounds",
  "4. Every submission will be heavily scrutinized. Plagiarism will not be tolerated",
  "5. We hold the right to disqualify any participant if they fail to comply with the above rules",
];

var runButton = document.getElementById("run-btn");
runButton.addEventListener("click", handleRunClick);

var outputField = document.getElementById("output");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function handleRunClick() {
  console.log("clicked");
  runButton.removeEventListener("click", handleRunClick);
  runButton.classList.add("run-btn-disabled");
  for (var i = 0; i < rules.length; i++) {
    console.log(outputField.children[i]);
    outputField.children[i].innerHTML =
      "<div class='rule-text'>" + rules[i] + "</div>";
    await sleep(1000);
  }
}
