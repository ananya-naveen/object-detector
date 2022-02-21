img="";
status="";
objects=[];

function preload(){
    img=loadImage("desk.jpeg");
}

function setup(){
    canvas=createCanvas(540,420);
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model is loaded");
    status=true;
    objectDetector.detect(img,gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}

function draw(){
    image(img,0,0,640,420);
    if(status!=""){
        for(z=0;z<objects.length;z++){
            document.getElementById("status").innerHTML="Status: Objects Detected";
            fill("#800000");
            percent=floor(objects[z].confidence*100);
            text(objects[z].label+" "+percent+"%",objects[z].x+15,objects[z].y+15);
            noFill();
            stroke("#800000");
            rect(objects[z].x,objects[z].y,objects[z].width,objects[z].height);
        }
    }
}