/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  // Game Item Objects
  var rightPaddle = {
    id: '#rightPaddle',
    positionX: 700,
    positionY: 0,
    speedX: 0,
    speedY: 0,
    height: parseFloat($('#rightPaddle').height()),
    width: parseFloat($('#rightPaddle').width()),
  };
  var leftPaddle = {
    id: '#leftPaddle',
    positionX: 50,
    positionY: 0,
    speedX: 0,
    speedY: 0,
    height: parseFloat($('#leftPaddle').height()),
    width: parseFloat($('#leftPaddle').width()),
  };
  var ball = {
    id: '#ball',
    positionX: 0,
    positionY: 0,
    speedX: 5,
    speedY: 4,
    width: parseFloat($('#ball').width()), 
    height: parseFloat($('#ball').height()),
  };
  var P1Score = 0;
  var P2Score = 0;
  var boardWidth = parseFloat($('#board').width());
  var boardHeight = parseFloat($('#board').height());

  // Imaginary Number Declearation thingy //
  var KEYS = {
    W: 87,
    S: 83,
    UPARROW: 38,
    DOWNARROW: 40,
  }
  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handlePaddles);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', stopHandlePaddles);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionThangs(leftPaddle);
    repositionThangs(rightPaddle);
    repositionThangs(ball);

    redrawThangs(leftPaddle);
    redrawThangs(rightPaddle);
    redrawThangs(ball);

    boarderLimit(leftPaddle);
    boarderLimit(rightPaddle);

    ballBoundary();
    BPCollision();

    
    scoreKeeper("#scoreP1", "#scoreP2", P1Score, P2Score);
  }

  /* 
  Called in response to events.
  */
  //makes paddles move//
  function handlePaddles(event) {
    if (event.which === KEYS.W) {
      leftPaddle.speedY = -5;
      console.log("w")
    }
    if (event.which === KEYS.S) {
      leftPaddle.speedY = 5;
      console.log("s")
    }
    if (event.which === KEYS.UPARROW) {
      rightPaddle.speedY = -5
    }
    if (event.which === KEYS.DOWNARROW) {
      rightPaddle.speedY = 5
    }
  }
  //handles the handler//
  function stopHandlePaddles(event) {
    if (event.which === KEYS.W) {
      leftPaddle.speedY = 0;
    }
    if (event.which === KEYS.S) {
      leftPaddle.speedY = 0;
    }
    if (event.which === KEYS.UPARROW) {
      rightPaddle.speedY = 0;
      console.log("up")
    }
    if (event.which === KEYS.DOWNARROW) {
      rightPaddle.speedY = 0;
      console.log("down")
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function BPCollision (){
    if (doCollide(rightPaddle, ball)){
      ball.speedX *= -1;
      ball.speedY += 1;
    }
    if (doCollide(leftPaddle, ball)){
      ball.speedX *= -1;
      ball.speedX += 1;
    }
    
  }
  //serves as a refrence so we can access HTML elements such as the score //
  function scoreKeeper (id1, id2, score1, score2){
    $(id1).text(score1);
    $(id2).text(score2);
  }
  //the ball is limited within the border and reflects speed //
  function ballBoundary (){
    // if (ball.positionX && ball.positionY >= ){
      // 
    // }
    if (ball.positionY  <= 0){
      ball.speedY *= -1;
    }
    if (ball.positionX  <= 0){
      P2Score++;
      ball.speedX = 4;
      ball.speedY = 4;
      ball.positionX = 500;
      
    }
    if (ball.positionY + ball.height >= boardHeight + 20){
      ball.speedY *= -1;
    }
    if (ball.positionX + ball.width >= boardWidth + 20){
      P1Score++;
      ball.speedX = -4;
      ball.speedY = -4;
      ball.positionX = 350;     

    }
    
  }
  //Check for collision

function doCollide(obj1, obj2){

  if(obj1.positionX + obj1.width >= obj2.positionX
  && obj1.positionY <= obj2.positionY + obj2.height
  && obj1.positionY + obj1.height >= obj2.positionY){
    return true;
  }

}
  /// this is just for the paddles limit//
  function boarderLimit(paddle){
    if (paddle.positionY  <= 0){
      paddle.positionY = 0;
    }
    if (paddle.positionY + paddle.height >= boardHeight + 20){
      paddle.positionY = boardHeight - paddle.height + 20;
    }
  }
  // key reason the game items can move since it remakes them in said spot//
  function redrawThangs(item) {
    $(item.id).css("top", item.positionY);
    $(item.id).css("left", item.positionX);
  }
  //similar to other function above but involves speed//
  function repositionThangs(item) {
    item.positionX += item.speedX;
    item.positionY += item.speedY;
  }
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

}
