var running = false;
var width = ["50px", "75px", "89px", "40px"];
var height = ["25px", "50px", "80px", "45px"];
var margin_left;
var margin_right;
var indexes = [0, 0, 0];
var id = "";
var start_time, end_time;

function hide() {

    document.getElementById("square").style.visibility = "hidden";
    document.getElementById("circle").style.visibility = "hidden";
}

function getRandoms() {
    indexes[0] = Math.floor(Math.random() * 2) + 1;
    for (var i = 1; i < 3; i++) {
        indexes[i] = Math.floor(Math.random() * 4)
    }
    margin_left = Math.floor(Math.random() * 30) * 12;
    margin_right = Math.floor(Math.random() * 30) * 12;
    drawFigures();
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function drawFigures() {
    var figwidth = width[indexes[1]];
    var figheight = height[indexes[2]];
    var figback_color = getRandomColor();
    if (indexes[0] == 1) {
        id = "square";
    } else {
        id = "circle";
    }

    document.getElementById(id).style.width = figwidth;
    document.getElementById(id).style.height = figheight;
    document.getElementById(id).style.marginLeft = margin_left;
    document.getElementById(id).style.marginRight = margin_right;
    document.getElementById(id).style.backgroundColor = figback_color;
    document.getElementById(id).style.visibility = "visible";
}

function step() {
    hide();
    start_time = new Date().getTime();
    if (running) {
        getRandoms();
    }
}

function updateTimer() {
    end_time = new Date().getTime();
    document.getElementById("timer").innerHTML = "Time Taken: " + (end_time - start_time) / 1000 + "s";
}

document.getElementById("start").onclick = function() {
    running = true;
    step();
}

document.getElementById("square").onclick = function() {
    updateTimer();
    step();
}

document.getElementById("circle").onclick = function() {
    updateTimer();
    step();
}

document.getElementById("stop").onclick = function() {
    running = false;
    document.getElementById("timer").innerHTML = "Time Taken: "
    step();
}