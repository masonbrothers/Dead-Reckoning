//V 0.0.1
//document.write("<br>start<br>");
var refreshButton = document.getElementById("refreshButton");
var actualxalabel = document.getElementById("actualxatag");
var actualyalabel = document.getElementById("actualyatag");
var actualzalabel = document.getElementById("actualzatag");
var actualalabel = document.getElementById("actualatag");
var amaxlabel = document.getElementById("amaxtag");
var aminlabel = document.getElementById("amintag");
var xalabel = document.getElementById("xatag");
var yalabel = document.getElementById("yatag");
var zalabel = document.getElementById("zatag");
var alabel = document.getElementById("atag");
var xvlabel = document.getElementById("xvtag");
var yvlabel = document.getElementById("yvtag");
var zvlabel = document.getElementById("zvtag");
var vlabel = document.getElementById("vtag");
var xdlabel = document.getElementById("xdtag");
var ydlabel = document.getElementById("ydtag");
var zdlabel = document.getElementById("zdtag");
var dlabel = document.getElementById("dtag");
var alphalabel = document.getElementById("alphatag");
var betalabel = document.getElementById("betatag");
var gammalabel = document.getElementById("gammatag");
var xcorlabel = document.getElementById("xcortag");
var ycorlabel = document.getElementById("ycortag");
var zcorlabel = document.getElementById("zcortag");
var periodlabel = document.getElementById("periodtag");
var elapsedlabel = document.getElementById("elapsedtag");
var speedlabel = document.getElementById("speedtag");


var amax = 0;
var amin = 1e309;

var alpha, beta, gamma;
var alphaDeg, betaDeg, gammaDeg;

var x, y, z, aa;
var xcor, ycor, zcor;
var x_a = 0;
var y_a = 0;
var z_a = 0;
var a = 0;
var prev_x_a = 0;
var prev_y_a = 0;
var prev_z_a = 0;
var x_v = 0;
var y_v = 0;
var z_v = 0;
var v = 0;
var prev_x_v = 0;
var prev_y_v = 0;
var prev_z_v = 0;
var x_d = 0;
var y_d = 0;
var z_d = 0;
var d = 0;
var prev_x_d = 0;
var prev_y_d = 0;
var prev_z_d = 0;
var timeConstant = 1;
var timeElapsed = 0;
var countUpdate = 0;
var updateMax = 1000;

/*
var x_a2 = 0;
var y_a2 = 0;
var z_a2 = 0;
var x_v2 = 0;
var y_v2 = 0;
var z_v2 = 0;
var x_d2 = 0;
var y_d2 = 0;
var z_d2 = 0;
*/

var millisecondInterval = 1;

function refresh()
{
	x_a = 0;
	y_a = 0;
	z_a = 0;
	//a = 0;
	prev_x_a = 0;
	prev_y_a = 0;
	prev_z_a = 0;
	x_v = 0;
	y_v = 0;
	z_v = 0;
	//v = 0;
	prev_x_v = 0;
	prev_y_v = 0;
	prev_z_v = 0;
	x_d = 0;
	y_d = 0;
	z_d = 0;
	//d = 0;
	prev_x_d = 0;
	prev_y_d = 0;
	prev_z_d = 0;
	aa = 0;
	amax = 0;
	amin = 1e309;
	countUpdate = 0;
	timeElapsed = 0;
}

refreshButton.onclick = function() {refresh();updateLabels()};
window.ondevicemotion = function(move) {
	//Acceleration
	x = move.accelerationIncludingGravity.x;
	z = move.accelerationIncludingGravity.z;
	y = move.accelerationIncludingGravity.y;
	x_a = move.acceleration.x;
	y_a = move.acceleration.y;
	z_a = move.acceleration.z;
	aa = Math.sqrt(Math.pow(x,2) + Math.pow(y,2) + Math.pow(z,2));
	amax = Math.max(amax,aa);
	amin = Math.min(amin,aa);


	/*
	xcor = x*Math.cos(alpha)*Math.cos(gamma)-z*Math.cos(alpha)*Math.sin(gamma)+y*Math.sin(alpha)*Math.cos(beta)+z*Math.sin(alpha)*Math.sin(beta)*Math.cos(gamma)+x*Math.sin(alpha)*Math.sin(beta)*Math.sin(gamma);
	ycor = -x*Math.sin(alpha)*Math.cos(gamma)+z*Math.sin(alpha)*Math.sin(gamma)+y*Math.cos(alpha)*Math.cos(beta)+z*Math.cos(alpha)*Math.sin(beta)*Math.cos(gamma)+x*Math.cos(alpha)*Math.sin(beta)*Math.sin(gamma);
	zcor = -y*Math.sin(beta)+z*Math.cos(beta)*Math.cos(gamma)+x*Math.cos(beta)*Math.sin(gamma);
	xcor = x*Math.cos(gamma)*Math.cos(alpha);// + y*Math.cos(gamma)*Math.sin(alpha) + z*Math.cos(alpha)*Math.sin(beta);
	ycor = y*Math.cos(gamma)*Math.cos(alpha);// + x*Math.cos(gamma)*Math.cos(beta)*Math.sin(alpha);
	zcor = z*Math.cos(beta); // + y*Math.sin(beta)*Math.sin(gamma) + x*Math.cos(gamma)*Math.sin(beta);
	*/
	/*
	xcor = x*Math.cos(alpha)*Math.cos(gamma)+z*Math.sin(Math.abs(gamma))-y*Math.sin(Math.abs(alpha));
	ycor = y*Math.cos(alpha)*Math.cos(beta)+x*Math.sin(Math.abs(alpha))-z*Math.sin(Math.abs(beta));
	zcor = z*Math.cos(beta)*Math.cos(gamma)+y*Math.sin(alpha)-x*Math.sin(gamma);
	*/
	var accelerationVector = [0,0,0];
	accelerationVector[0] = x;
	accelerationVector[1] = y;
	accelerationVector[2] = z;
	
	accelerationVector = rotate_point(accelerationVector,degreesToRadians(betaDeg),degreesToRadians(gammaDeg),degreesToRadians(alphaDeg));
	xcor = accelerationVector[0];
	ycor = accelerationVector[1];
	zcor = accelerationVector[2];
	
	//if (countUpdate > updateMax)
	//{
	updateLabels();
	//countUpdate = 0;
	//}
	//countUpdate++;
	//zcor = z*Math.cos(beta)*Math.cos(gamma)+y*Math.sin(beta)*Math.cos(gamma)-x*Math.sin(gamma)*Math.cos(beta);
}

function highPass(input,prev_output)
{
	var max = 0;
	var output = 0;
	if ((Math.abs(input)<max) && max)
	{
		return 0;
	}
	var cutoffFrequency = millisecondInterval/1000*5;
	var alpha = (2*Math.PI*millisecondInterval/1000*cutoffFrequency)/(2*Math.PI*millisecondInterval/1000*cutoffFrequency + 1);
	
	//output = 1/timeConstant*millisecondInterval*(input - output) + output;
	output = alpha*input + (1-alpha)*prev_output;
	return output;
}


function radiansToDegrees(radians)
{
	return radians*180/Math.PI;
}

function degreesToRadians(degrees)
{
	return degrees/180*Math.PI;
}

function highPassAll()
{
	x_a = highPass(x_a,prev_x_a);
	y_a = highPass(y_a,prev_y_a);
	z_a = highPass(z_a,prev_z_a);
	/*
	x_v = highPass(x_v,prev_x_v);
	y_v = highPass(y_v,prev_y_v);
	z_v = highPass(z_v,prev_z_v);
	
	x_d = highPass(x_d,prev_x_d);
	y_d = highPass(y_d,prev_y_d);
	z_d = highPass(z_d,prev_z_d);
	*/

}

function deadReckoning()
{
	//highPassAll();
	
	prev_x_a = x_a;
	prev_y_a = y_a;
	prev_z_a = z_a;
	prev_x_v = x_v;
	prev_y_v = y_v;
	prev_z_v = z_v;
	prev_x_d = x_d;
	prev_y_d = y_d;
	prev_z_d = z_d;
	
	a = Math.sqrt(Math.pow(x_a,2) + Math.pow(y_a,2) + Math.pow(z_a,2));
	x_v += millisecondInterval/1000*x_a;
	y_v += millisecondInterval/1000*y_a;
	z_v += millisecondInterval/1000*z_a;
	v = Math.sqrt(Math.pow(x_v,2) + Math.pow(y_v,2) + Math.pow(z_v,2));
	x_d += millisecondInterval/1000*x_v;
	y_d += millisecondInterval/1000*y_v;
	z_d += millisecondInterval/1000*z_v;
	d = Math.sqrt(Math.pow(x_d,2) + Math.pow(y_d,2) + Math.pow(z_d,2));
	timeElapsed += millisecondInterval/1000;
	//updateLabels();
	//refresh();
}

function updateLabels()
{
	alphalabel.innerHTML = alphaDeg;
	betalabel.innerHTML = betaDeg;
	gammalabel.innerHTML = gammaDeg;
	xcorlabel.innerHTML = xcor;
	ycorlabel.innerHTML = ycor;
	zcorlabel.innerHTML = zcor;
	actualxalabel.innerHTML = x;
	actualyalabel.innerHTML = y;
	actualzalabel.innerHTML = z;
	actualalabel.innerHTML = aa;
	amaxlabel.innerHTML = amax;
	aminlabel.innerHTML = amin;
	xalabel.innerHTML = x_a;
	yalabel.innerHTML = y_a;
	zalabel.innerHTML = z_a;
	alabel.innerHTML = a;
	xvlabel.innerHTML = x_v;
	yvlabel.innerHTML = y_v;
	zvlabel.innerHTML = z_v;
	vlabel.innerHTML = v;
	xdlabel.innerHTML = x_d;
	ydlabel.innerHTML = y_d;
	zdlabel.innerHTML = z_d;
	dlabel.innerHTML = d;
	elapsedlabel.innerHTML = timeElapsed;
	periodlabel.innerHTML = millisecondInterval/1000;
	speedlabel.innerHTML = v*3.6;
	
	updateGraph(degreesToRadians(betaDeg),degreesToRadians(gammaDeg),degreesToRadians(alphaDeg));
}

setInterval(function() {deadReckoning()}, millisecondInterval);
setInterval(function() {updateLabels();}, 100);

window.ondeviceorientation = function(move){
	//Rotation
	angle = move.rotationRate;
	//if (angle != null) {
	alphaDeg = move.alpha;
	betaDeg = move.beta;
	gammaDeg = move.gamma;
	alpha = degreesToRadians(alphaDeg);
	beta = degreesToRadians(betaDeg);
	gamma = degreesToRadians(gammaDeg);
	//}
	//updateLabels();
}


//Graph

var graphLabel = document.getElementById("graphTag");
var graph = graphLabel.getContext("2d");


var xEndPoint = [1,0,0];
var yEndPoint = [0,1,0];
var zEndPoint = [0,0,1];

function drawGraph()
{
	resetGraph();
	var xMin = -1.5;
	var xMax = 1.5;
	var yMin = -1.5;
	var yMax = 1.5;
	
	graph.beginPath();
	var xStart = transformX(0,xMin,xMax);
	var yStart = transformY(0,yMin,yMax);
	var xEnd = transformX(xEndPoint[0],xMin,xMax);
	var yEnd = transformY(xEndPoint[1],yMin,yMax);
	graph.moveTo(xStart,yStart);
	graph.lineTo(xEnd,yEnd);
	graph.lineWidth = 2;
	graph.strokeStyle = "#FF0000";
	graph.stroke();
	
	graph.beginPath();
	var xStart = transformX(0,xMin,xMax);
	var yStart = transformY(0,yMin,yMax);
	var xEnd = transformX(yEndPoint[0],xMin,xMax);
	var yEnd = transformY(yEndPoint[1],yMin,yMax);
	graph.moveTo(xStart,yStart);
	graph.lineTo(xEnd,yEnd);
	graph.lineWidth = 2;
	graph.strokeStyle = "#00FF00";
	graph.stroke();
	
	graph.beginPath();
	var xStart = transformX(0,xMin,xMax);
	var yStart = transformY(0,yMin,yMax);
	var xEnd = transformX(zEndPoint[0],xMin,xMax);
	var yEnd = transformY(zEndPoint[1],yMin,yMax);
	graph.moveTo(xStart,yStart);
	graph.lineTo(xEnd,yEnd);
	graph.lineWidth = 2;
	graph.strokeStyle = "#0000FF";
	graph.stroke();
}

function transformX(x,xMin,xMax)
{
	var xTransformed = (x-xMin)*(graphLabel.width/(xMax-xMin));
	return xTransformed;		
}

function transformY(y,yMin,yMax)
{
	var yTransformed = (y-yMax)*(graphLabel.height/(yMin-yMax));
	return yTransformed;		
}

function resetGraph()
{
	graph.clearRect(0,0,graphTag.width,graphTag.height);
}

function rotate_x(angle,input)
{
	var output = [0,0,0];
	output[0]=input[0];
	output[1]=input[1]*Math.cos(angle)-input[2]*Math.sin(angle);
	output[2]=input[2]*Math.cos(angle)+input[1]*Math.sin(angle);
	return output;
}

function rotate_y(angle,input)
{
	var output = [0,0,0];
	output[0]=input[0]*Math.cos(angle)+input[2]*Math.sin(angle);
	output[1]=input[1];
	output[2]=input[2]*Math.cos(angle)-input[0]*Math.sin(angle);
	return output;
}

function rotate_z(angle,input)
{
	var output = [0,0,0];
	output[0]=input[0]*Math.cos(angle)-input[1]*Math.sin(angle);
	output[1]=input[1]*Math.cos(angle)+input[0]*Math.sin(angle);
	output[2]=input[2];
	return output;
}

function updateGraph(xAngle,yAngle,zAngle)
{
	xEndPoint = [1,0,0];
	yEndPoint = [0,1,0];
	zEndPoint = [0,0,1];
	
	/*
	var xAngle = Math.PI/4;
	var yAngle = Math.PI/4;
	var zAngle = Math.PI/4;
	*/
	
	xEndPoint = rotate_point(xEndPoint,xAngle,yAngle,zAngle);
	yEndPoint = rotate_point(yEndPoint,xAngle,yAngle,zAngle);
	zEndPoint = rotate_point(zEndPoint,xAngle,yAngle,zAngle);
	
	/*
	xEndPoint = rotate_y(-yAngle,xEndPoint);
	yEndPoint = rotate_y(-yAngle,yEndPoint);
	zEndPoint = rotate_y(-yAngle,zEndPoint);
	
	xEndPoint = rotate_x(-xAngle,xEndPoint);
	yEndPoint = rotate_x(-xAngle,yEndPoint);
	zEndPoint = rotate_x(-xAngle,zEndPoint);
	
	xEndPoint = rotate_z(-zAngle,xEndPoint);
	yEndPoint = rotate_z(-zAngle,yEndPoint);
	zEndPoint = rotate_z(-zAngle,zEndPoint);
	*/
	
	
	drawGraph();
}


function rotate_point(input,xAngle,yAngle,zAngle)
{
	var output = input;
	output = rotate_z(-zAngle,output);
	output = rotate_x(-xAngle,output);
	output = rotate_y(-yAngle,output);
	return output;
}

updateGraph(Math.PI/4,Math.PI/4,Math.PI/4);
/*
var xAngle = Math.PI/4;
var yAngle = Math.PI/4;
var zAngle = Math.PI/4;
*/



//setInterval(function() {updateGraph(xAngle,yAngle,zAngle);xAngle+=0.05;},10)



//document.write("<br>end<br>");