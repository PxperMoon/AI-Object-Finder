objects = [];

function preload() {

}

function setup() {
    canvas = createCanvas(300, 250);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(300, 250);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
    console.log("Model is loaded.");
    status = true;
}

function draw() {
    image(video, 0, 0, 300, 250);

    if(status != "") {
        objectDetector.detect(gotResult);
        for(i=0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            
            fill("#FF0000"); 
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
 
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    else {
        console.log(results);
    }
}

utterThis = new SpeechSynthesisUtterance(objects[0].label);
synth.speak("Object is found");