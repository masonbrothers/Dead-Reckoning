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
var x_d = 0;
var y_d = 0;
var z_d = 0;
var d = 0;
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
x_d = 0;
y_d = 0;
z_d = 0;
//d = 0;
aa = 0;
amax = 0;
amin = 1e309;
countUpdate = 0;
timeElapsed = 0;
updateLabels();
}
refreshButton.onclick = function() {refresh()};
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
//x_a = smooth(x_a,prev_x_a);
//y_a = smooth(y_a,prev_y_a);
//z_a = smooth(z_a,prev_z_a);
prev_x_a = x_a;
prev_y_a = y_a;
prev_z_a = z_a;
/*
xcor = x*Math.cos(alpha)*Math.cos(gamma)-z*Math.cos(alpha)*Math.sin(gamma)+y*Math.sin(alpha)*Math.cos(beta)+z*Math.sin(alpha)*Math.sin(beta)*Math.cos(gamma)+x*Math.sin(alpha)*Math.sin(beta)*Math.sin(gamma);
ycor = -x*Math.sin(alpha)*Math.cos(gamma)+z*Math.sin(alpha)*Math.sin(gamma)+y*Math.cos(alpha)*Math.cos(beta)+z*Math.cos(alpha)*Math.sin(beta)*Math.cos(gamma)+x*Math.cos(alpha)*Math.sin(beta)*Math.sin(gamma);
zcor = -y*Math.sin(beta)+z*Math.cos(beta)*Math.cos(gamma)+x*Math.cos(beta)*Math.sin(gamma);
xcor = x*Math.cos(gamma)*Math.cos(alpha);// + y*Math.cos(gamma)*Math.sin(alpha) + z*Math.cos(alpha)*Math.sin(beta);
ycor = y*Math.cos(gamma)*Math.cos(alpha);// + x*Math.cos(gamma)*Math.cos(beta)*Math.sin(alpha);
zcor = z*Math.cos(beta); // + y*Math.sin(beta)*Math.sin(gamma) + x*Math.cos(gamma)*Math.sin(beta);
*/
xcor = x*Math.cos(alpha)*Math.cos(gamma)+z*Math.sin(Math.abs(gamma))-y*Math.sin(Math.abs(alpha));
ycor = y*Math.cos(alpha)*Math.cos(beta)+x*Math.sin(Math.abs(alpha))-z*Math.sin(Math.abs(beta));
zcor = z*Math.cos(beta)*Math.cos(gamma)+y*Math.sin(alpha)-x*Math.sin(gamma);
//if (countUpdate > updateMax)
//{
updateLabels();
//countUpdate = 0;
//}
//countUpdate++;
//zcor = z*Math.cos(beta)*Math.cos(gamma)+y*Math.sin(beta)*Math.cos(gamma)-x*Math.sin(gamma)*Math.cos(beta);
}
function smooth(input,prev_output)
{
var max = 0;
var output = 0;
if ((Math.abs(input)<max) && max)
{
return 0;
}
//output = 1/timeConstant*millisecondInterval*(input - output) + output;
output = 1/timeConstant*millisecondInterval*(input - prev_output) + prev_output;
return input;
}
function Point(x,y,z){
this.x = x;
this.y = y;
this.z = z;
}
function rotate_x(angle,x,y,z)
{
var rotation = new Point(0,0,0);
return
}
/*
function rotate_x(input, angle)
{
new Point(input.x,input.y,);
output.x=input.x;
output.y=input.y*cos(angle)-input.z*sin(angle);
output.z=input.z*cos(angle)+input.y*sin(angle);
return output;
}
Point rotate_y(const Point &input, const double &angle)
{
Point output;
output.x=input.x*cos(angle)+input.z*sin(angle);
output.y=input.y;
output.z=input.z*cos(angle)-input.x*sin(angle);
return output;
}
Point rotate_z(const Point &input, const double &angle)
{
Point output;
output.x=input.x*cos(angle)-input.y*sin(angle);
output.y=input.y*cos(angle)+input.x*sin(angle);
output.z=input.z;
return output;
}
*/
function radiansToDegrees(radians)
{
return radians*180/Math.PI;
}
function degreesToRadians(degrees)
{
return degrees/180*Math.PI;
}
function deadReckoning()
{
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
}
setInterval(function() {deadReckoning()}, millisecondInterval);
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
//document.write("<br>end<br>");
