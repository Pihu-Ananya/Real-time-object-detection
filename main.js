
video=""
Status=""
objects=[]
function setup(){
    canvas=createCanvas(600 , 400)
    canvas.center()
}

function preload() {
    video=createVideo('video.mp4')
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd' , modelloaded);
    document.getElementById("status").innerHTML= "Status: Detecting Objects";   
} 

function modelloaded(){
    console.log("Model Loaded!")
    Status=true
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotresult(error , results){
if(error){
    console.log(error)
}
else{
console.log(results)
objects=results
}
}

function draw() {
    image(video , 0 , 0 , 480 , 380)
    if(Status!=""){
        objectDetector.detect(video , gotresult)
        for(i=0;i<objects.length;i++){
        document.getElementById("status").innerHTML= "Status: Objects Detected"; 
        document.getElementById("number_of_objects").innerHTML="number of objects detected:"+objects.length
        fill("red")
        persent=floor(objects[i].confidence*100)
        text(objects[i].label+" "+persent+"%" , objects[i].x  , objects[i].y)
        noFill()
        stroke("black")
        rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height)
        }
    }
}