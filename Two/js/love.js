document.body.style.background = 'rgb(8, 124, 167)';
// Setup the canvas
var two = new Two({
    fullscreen: true,
    autostart: true
}).appendTo(document.body);

// External variables
var k = 2;
var radius = 400;

// Internal variables
var time = 0;
var points = [];
var resolution = 240;    // How many points are there?
for (var i = 0; i < resolution; i++) {
    points[i] = new Two.Anchor();
}

// Variables for the Interpreter
var dimensions = 140;
var shapes = [];
var index = 0;
var length = 0;
var scale = two.width > two.height ? two.height / dimensions : two.width / dimensions;
var easing = 0.125;

// Create our shape
var shape = two.makeCurve(points);
// Create our array that keeps track of movement data
// 1 = line width multiplier, 2 = line width times tracker
// 3 = rotation multiplier, 4 = rotation times tracker
// 5 = spin multiplier, 6 = spin
var shapeArr = [shape, 1, 1, 1, 1, 1, 1];
var circle = two.makeCircle(0, 0, 100);
var circleArr = [circle, 1, 1, 1, 1, 1, 1];
circle.linewidth = 0;
circle.fill = 'rgb(252, 255, 108)';
circle.stroke = 'rgb(252, 255, 108)';


var change = false;
var half = false;
var bchange = false;
var bhalf = false;



// Center it on the screen
two.scene.translation.set(two.width / 2, two.height / 2);


// Style the shape
shape.fill = 'rgb(175, 206, 224)';
shape.stroke = 'rgb(0, 72, 132)';
shape.linewidth = 10;
/*
// This is the animation loop
two.bind('update', function(frameCount, timeDelta) {

    if (timeDelta) {
        time += timeDelta;
    }

    // Increment `k` every 1 second to change shape.
    if (time > 1000) {
        k = (k + 1) % 20;
        time = 0;
        update();
    }

});
*/




two.bind('update', function(){
    window.addEventListener("keydown", checkKeyPressed, false);
    function checkKeyPressed(e) {
      if(e.keyCode == 32 && change == false){
        // user has pressed space
        change = true;
        setTimeout(function(){half=true;}, 1000);
        setTimeout(function(){change=false;}, 2000);
      }

      if (e.keyCode == 66 && bchange == false){
        // user has pressed b
        bchange = true;
        //setTimeout(function(){bchange=false;}, 2000);
      }
    }

    update();
    if (!change){
        passive(shapeArr, 1.5);
        passive(circleArr, .3);
    } else {
        spin(shapeArr);
    }

    if (!bchange){

    } else {
        big();
    }
});

function passive(arr, num) {
    if (arr[2] == 100 || arr[2] == 0) arr[1]*=-1;
    arr[0].linewidth+=num*arr[1];
    arr[2]+=arr[1];

    if (arr[4] == 0 || arr[4] == 100) arr[3]*=-1;
    arr[0].rotation+=.015*arr[3];
    arr[4]+=arr[3];
}

//CONSTANT - USE AS ANIMATION
var spintimes = 0;
var spinmult = 1;
function spin(arr) {
    arr[0].rotation += (spintimes+=.005*spinmult);
    if (half == true) {
        spinmult*=-1;
        babies();
        half = false;
    }
}

function babies() {
    k = (k + 1) % 10;
    if (k == 0 || k == 1) k = 2;
    update();
}

var sizetimes = 0;
var sizemult = 1;
function big() {
    shape.scale += (.05*sizemult);
    sizetimes++;
    if (sizetimes == 50) {
        sizemult*=-1;
    } else if (sizetimes == 101){
        bchange = false;
        sizetimes = 0;
    }
}

// Update all points of a shape based on `k`
 function update() {
    for (var i = 0; i < resolution; i++) {
        if (k  != 1) {
            roseMath(points[i], k, Math.PI * 2 * i / resolution);
        }
    }
}

// The rose math function taken from
// http://en.wikipedia.org/wiki/Rose_(mathematics)
function roseMath(v, k, t) {
    v.x = radius * Math.cos(k * t) * Math.cos(t);
    v.y = radius * Math.cos(k * t) * Math.sin(t);
    return v;
}