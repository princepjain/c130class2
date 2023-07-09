
song ="";
leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;
leftwristscore=0;
rightwristscore=0;

function preload(){
  song = loadSound("music.mp3")
}

function setup(){
    canvas = createCanvas(600,500)
    canvas.center()

    video = createCapture(VIDEO)
    video.hide()

    myposenet = ml5.poseNet(video, modalloaded);
    myposenet.on("pose", gotposes)

}
function modalloaded(){
    console.log("modal has been")
}
function gotposes(results){
if(results.length > 0){
    console.log(results)
    rightwristX = results[0].pose.rightWrist.x;
    leftwristX = results[0].pose.leftWrist.x;

    rightwristY = results[0].pose.rightWrist.y;
    leftwristY = results[0].pose.leftWrist.y;

    leftwristscore = results[0].pose.keypoints[9].score;
    rightwristscore = results[0].pose.keypoints[10].score;
}

}

function draw(){
    image(video,0,0,600,500)
    
    fill("red")
   if (leftwristscore > 0.2) {
      circle(leftwristX , leftwristY, 20);
      turninnumber = Number(leftwristY);
      remove_decimal = floor(turninnumber);
      volume = remove_decimal/500;
      document.getElementById("volume_info").innerHTML = "volume : " + volume;
      song.setVolume(volume);
          
   }

   if (rightwristscore > 0.2){
    circle(rightwristX , rightwristY, 20);
    if(rightwristY > 0 && rightwristY <= 100){
        document.getElementById("speed_info").innerHTML = "speed = 0.5"
      song.rate(0.5)
    }
    if(rightwristY > 100 && rightwristY <= 200){
        document.getElementById("speed_info").innerHTML = "speed = 1"
      song.rate(1)
    }
    if(rightwristY > 200 && rightwristY <= 300){
        document.getElementById("speed_info").innerHTML = "speed = 1.5"
      song.rate(1.5)
    }
    if(rightwristY > 300 && rightwristY <= 400){
        document.getElementById("speed_info").innerHTML = "speed = 2"
      song.rate(2)
    }
    if(rightwristY > 400){
        document.getElementById("speed_info").innerHTML = "speed = 2.5"
      song.rate(2.5)
    }
   }
}

function playing(){
    song.play();
    song.setVolume(1)
    song.rate(1)
}