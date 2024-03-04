/* global $, sessionStorage */
const BOARDWIDTH = $("#board").width()
const BOARDHEIGHT = $("#board").height()
const WALKERWIDTH = $("#walker").width()
const WALKERHEIGHT = $("#walker").height()
$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects
  var KEY = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
  }
  var walker = {
    positionX: 0,
    positionY: 0,
    speedX: 0,
    speedY: 0,
  }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    redrawGameItem();
    wallCollision();
  }
  
  /* 
  Called in response to events.
  */
 // tells system which key is being pressed and applys speed when being pressed//
  function handleKeyDown(event) {
    if (event.which === KEY.left) {
      walker.speedX = -5
    } else if (event.which === KEY.up){
      walker.speedY = -5
    }else if (event.which === KEY.right){
      walker.speedX = 5
    }else if (event.which === KEY.down){
      walker.speedY = 5
    }
  }
// stops the walkers movement when the key is released//
  function handleKeyUp(event){
    if (event.which != KEY.left) {
      walker.speedX = 0;
      walker.speedY = 0;
    } else if (event.which != KEY.up){
      walker.speedY = 0
      walker.speedX = 0;

    }else if (event.which != KEY.right){
      walker.speedX = 0;
      walker.speedY = 0;
    }else if (event.which != KEY.down){
      walker.speedY = 0;
      walker.speedX = 0;

    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  //applys movement to the walker and changes its position//
  function repositionGameItem() {
    walker.positionX += walker.speedX;
    walker.positionY += walker.speedY;
  }
function redrawGameItem (){
  $("#walker").css("left", walker.positionX);
  $("#walker").css("top", walker.positionY); 
}
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  function wallCollision (){
    if (walker.positionX <= 0){
      walker.speedX = 0
    }else if (walker.positionX >= BOARDWIDTH){
     walker.speedX = 0 
    }
    if (walker.positionY <= 0){
      walker.speedY = 0
    } else if (walker.positionY >= BOARDHEIGHT){
      walker.speedY
    }
  }
}
