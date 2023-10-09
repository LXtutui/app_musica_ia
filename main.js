var song = "";
var canvas, video, posenet;
var scoreLeftWrist=0;
var scoreRightWrist=0;

function preload()
{
	song = loadSound("music.mp3");
}

var rightWristX = 0;
var rightWristY = 0;

var leftWristX = 0;
var leftWristY = 0;

function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
	console.log(results);
	scoreLeftWrist=results[0].pose.keyPoints[9].score;
	scoreRightWrist=results[0].pose.keyPoints[10].score;
	
	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;		
  }
}

function draw() {
	image(video, 0, 0, 600, 500);
	fill("blue");
	stroke("black");
	if(scoreRightWrist>0.2){
		circle(rightWristX,rightWristY, 20);
		if(rightWristY>0 && rightWristY<=100){
			document.getElementById("speed").innerHTML="velocidade=0.5x";
			song.rate(0.5);
		}
		else if(rightWristY>100 && rightWristY<=200){
			document.getElementById("speed").innerHTML="velocidade=1x";
			song.rate(1);
		}
		else if(rightWristY>200 && rightWristY<=300){
			document.getElementById("speed").innerHTML="velocidade=1.5x";
			song.rate(1.5);
		}
		else if(rightWristY>300 && rightWristY<=400){
			document.getElementById("speed").innerHTML="velocidade=2x";
			song.rate(2);
		}
		else if(rightWristY>400){
			document.getElementById("speed").innerHTML="velocidade=2.5x";
			song.rate(2.5);
		}
	}
	if(scoreLeftWrist>0.2){
		circle(leftWristeX, leftWristY, 20);
		var numberLeftWrist=Number(leftWristY);
		var InterLeftWrist=floor(numberLeftWrist);
		var volume = InterLeftWrist/500;
		document.getElementById("volume").innerHTML="Volume = "+volume;
		song.setVolume(volume);
	}
}

function play()
{
	song.play();
	song.setVolume(1);
	song.rate(1);
}