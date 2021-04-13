//var stillPlaying = true;
/*var draw = function() {
    if(stillPlaying){
        background(255, 255, 255);
 drawBitmoji(mouseX, mouseY, 50);  
    }
};*/


var xPositions = [];
var yPositions = [];

var ballColors = [];
var dropSpeed = [];

var currentScene = 0;

var Button = function(config) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.width = config.width || 150;
    this.height = config.height || 50;
    this.label = config.label || "Click";
    this.onClick = config.onClick || function() {};
};

Button.prototype.draw = function() {
    fill(0, 234, 255);
    rect(this.x, this.y, this.width, this.height, 5);
    fill(0, 0, 0);
    textSize(19);
    textAlign(LEFT, TOP);
    text(this.label, this.x+10, this.y+this.height/4);
};

Button.prototype.isMouseInside = function() {
    return mouseX > this.x &&
           mouseX < (this.x + this.width) &&
           mouseY > this.y &&
           mouseY < (this.y + this.height);
};

Button.prototype.handleMouseClick = function() {
    if (this.isMouseInside()) {
        this.onClick();
    }
};

var btn1 = new Button({
    x: 135,
    y: 280,
    label: "   Start Game!",
    onClick: function() {
        currentScene = 1;
    }
});



var splash = function() {
    fill(155, 200, 200);
    rect(0, 0, 400, 400);
    fill(0, 0, 0);
    textSize(40);
    text("Catching Balls", 110, 200);
    btn1.draw();
};

var drawBitmoji = function (x, y, bitmojiHeight) {
noStroke();
fill(255,173,96); //fill to skin tone
ellipse(x-(bitmojiHeight/140*5), y-(bitmojiHeight/140*5), bitmojiHeight/140*85, bitmojiHeight/140*105); // Head
fill(255, 255, 255);
arc(x-(bitmojiHeight/140*49), y+(bitmojiHeight/140*34), bitmojiHeight/140*30, bitmojiHeight/140*54, bitmojiHeight/140*0, bitmojiHeight/140*360); //left chisel
arc(x+(bitmojiHeight/140*40), y+(bitmojiHeight/140*34), bitmojiHeight/140*30, bitmojiHeight/140*54, bitmojiHeight/140*0, bitmojiHeight/140*360); //right chisel
fill(0, 0, 0); //black hair
quad(x-(bitmojiHeight/140*52), y-(bitmojiHeight/140*11), x-(bitmojiHeight/140*41), y-(bitmojiHeight/140*41), x-(bitmojiHeight/140*15), y-(bitmojiHeight/140*52), x-(bitmojiHeight/140*30), y-(bitmojiHeight/140*10)); //left hair
quad(x+(bitmojiHeight/140*43), y-(bitmojiHeight/140*9), x+(bitmojiHeight/140*34), y-(bitmojiHeight/140*42), x+(bitmojiHeight/140*9), y-(bitmojiHeight/140*52), x+(bitmojiHeight/140*28), y-(bitmojiHeight/140*9)); //right hair
ellipse(x-(bitmojiHeight/140*2), y-(bitmojiHeight/140*43), bitmojiHeight/140*60, bitmojiHeight/140*31); //top hair
fill(0, 0, 0);
ellipse(x-(bitmojiHeight/140*15), y-(bitmojiHeight/140*7), bitmojiHeight/140*6, bitmojiHeight/140*4); //left eye
ellipse(x+(bitmojiHeight/140*10), y-(bitmojiHeight/140*7), bitmojiHeight/140*6, bitmojiHeight/140*4); // right eye
fill(255, 224, 95 ); //fill nose tone
bezier(x-(bitmojiHeight/140*4), y-(bitmojiHeight/140*1), x+(bitmojiHeight/140*18), y+(bitmojiHeight/140*19), x-(bitmojiHeight/140*7), y+(bitmojiHeight/140*18), x-(bitmojiHeight/140*6), y+(bitmojiHeight/140*13));//nose
fill(255, 255, 255);
arc(x-(bitmojiHeight/140*4), y+(bitmojiHeight/140*25), bitmojiHeight/140*30, bitmojiHeight/140*13, bitmojiHeight/140*1, bitmojiHeight/140*180);//mouth
line(x-(bitmojiHeight/140*15), y+(bitmojiHeight/140*20), x+(bitmojiHeight/140*18), y+(bitmojiHeight/140*20));
fill(128, 128, 128);
rect(x-(bitmojiHeight/140*63), y+(bitmojiHeight/140*46), bitmojiHeight/140*119, bitmojiHeight/140*90);//t-shirt
fill(0, 0, 0);//text color
textSize(10);
text("MSR", x-(bitmojiHeight/140*29), y+(bitmojiHeight/140*96)); //text
};

for(var i = 0; i < 10; i++){
    xPositions.push(round(random(10, 350)));
    yPositions.push(round(random(0, 350)));
    //ballColors.push(color(round(random(0, 255)), round(random(0, 255)), round(random(255, 0))));
    if(random(0,100) > 50){
        ballColors.push(color(255,0,0));
    }else
    {
        ballColors.push(color(17, 255, 0));
    }
    dropSpeed.push(round(random(1, 3)));
}

var Bitmoji = function(x, y) { // Constructor Bitmoji Object
    this.x = x;
    this.y = y;
    this.ball = 0;
};

Bitmoji.prototype.draw = function() {
    fill(255, 0, 0);
    this.y = constrain(this.y, 0, height-50);
    drawBitmoji(this.x, this.y, 50); // replace with drawBitmoji call
};

Bitmoji.prototype.checkForCarGrab = function(ball) {
    if ((ball.x >= this.x && ball.x <= (this.x + 40)) &&
        (ball.y >= this.y && ball.y <= (this.y + 40))) {
        ball.y = -400;
        this.ball--; //change this to score--;
    }
};

var Balls = function(x, y) { //constructor car object 
    this.x = x;
    this.y = y;
    // add a property for the speed of cars
};

Balls.prototype.draw = function() { //draw method for car object
    fill(89, 71, 0);
    rectMode(CENTER);
    ellipse(this.x, this.y, 20, 20);//drawing Balls
    
};

mouseClicked = function () {
    fill(255, 0, 0);
    if (currentScene === 0) {
        btn1.handleMouseClick();
    }
};

draw = function() {
    if (currentScene === 0) {
         splash();
    }
    if( currentScene === 1){
      background(204, 247, 255);

     for (var i = 0; i < xPositions.length; i++) {
        noStroke();
    fill(ballColors[i]);
    //fill(0, 200, 255); //Rain drops' color
        ellipse(xPositions[i], yPositions[i], 20, 20);
        //rect(xPositions[i], yPositions[i], 3, 10);
        yPositions[i] += dropSpeed[i];
        if (mouseY-10 < yPositions[i] && mouseY +10 > yPositions[i] && mouseX-10 < xPositions[i] && mouseX+10 > xPositions[i]){ xPositions[i] = 500;}
         if(yPositions[i]>400){
            yPositions[i]=0; //round(random(-5, 10));
        }
    }
    drawBitmoji(mouseX, mouseY, 50);}
};
