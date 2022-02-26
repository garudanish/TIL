$(document).ready(function () {
  // 데이터 정의
  // 공의 개수
  var circleNumber = 0;
  // 공의 종류 - 지름, 반지름, 색, 속도(한 지점에서 다른 지점으로 움직일 때 걸리는 ms)
  var circleTypes = {
    option: ["color", "diameter", "radius", "speed"],
    small: ["black", 5, 2.5, 3000],
    medium: ["blue", 15, 7.5, 4000],
    large: ["yellow", 30, 15, 5000],
  };
  // 시간을 찍어주는 변수
  var t = 0;
  // 게임 실행 여부
  var gameOn = false;
  // 마우스 좌표
  var mouseX, mouseY;

  // 마우스 움직임을 감지해서 마우스 좌표를 변수에 담아주는 함수
  $("body").mousemove(function (event) {
    mouseX = event.pageX;
    mouseY = event.pageY;
  });

  // 타이머
  function timer() {
    if (gameOn === true) {
      // 10ms 마다 t값을 0.01 증가시키고 증가된 t값을 .timer 하위에 찍어줌
      setTimeout(function () {
        t += 0.01;
        $(".timer").html(`<h3>
          <div class="center">${t.toFixed(2)}</div>
        </h3>`);
        timer();
      }, 10);
    }
  }

  // 시작 기능
  $(".startbutton").click(function () {
    $(".startbutton").fadeToggle(500, function () {
      gameOn = true;
      timer();
      $(".space").mouseenter(function () {
        endGame(); // 게임을 끝내는 함수
      });
      createCircle();
    });
  });

  function createCircle() {
    circleNumber++;

    // 1~3 사이의 숫자 랜덤하게 생성
    var randomOneThree = Math.floor(3 * Math.random()) + 1;

    if (randomOneThree == 1) {
      var circleChoice = "small";
    } else if (randomOneThree == 2) {
      var circleChoice = "medium";
    } else if (randomOneThree == 3) {
      var circleChoice = "large";
    }

    // id값으로 지정해줄 예정
    var circleName = "circle" + circleNumber;

    // circleChoice에 맞는 color, size, radius, speed 정의
    var circleColor = circleTypes[circleChoice][0];
    var circleDiameter = circleTypes[circleChoice][1];
    var circleRadius = circleTypes[circleChoice][2];
    var circleSpeed = circleTypes[circleChoice][3];

    // 이 공이 움직일 수 있는 범위 (길이) : 가로 - 지름(size)
    var moveableWidth = $("body").width() - circleDiameter;
    var moveableHeight = $("body").height() - circleDiameter;
    // moveableWidth, moveableHeight 사이에 만들어내기
    var circlePositionLeft = (moveableWidth * Math.random()).toFixed();
    var circlePositionTop = (moveableHeight * Math.random()).toFixed();

    var newCircle = "<div class='circle' id=" + circleName + "></div>";

    $("body").append(newCircle);

    // 지금 생성된 Circle의 id값에 대한 CSS 지정
    $("#" + circleName).css({
      "background-color": circleColor,
      width: circleDiameter + "vmin",
      height: circleDiameter + "vmin",
      "border-radius": circleRadius + "vmin",
      top: circlePositionTop + "px",
      left: circlePositionLeft + "px",
    });

    // 1ms 마다 반복실행하며 마우스와 "#"+circleName 와의 거리 계산, 맞닿으면 게임 오버
    // circleTrackID에 "#"+circleName 넣을 예정
    function timeCirclePosition(circleTrackID) {
      // 1ms 마다 반복실행
      setTimeout(function () {
        var currentCirclePosition = $(circleTrackID).position();
        var calculatedRadius = parseInt($(circleTrackID).css("width")) * 0.5;
        // 마우스와의 거리 계산 - 만일 거리가 반지름보다 작다면(맞닿았다면) 게임 종료
        var distanceX =
          mouseX - (currentCirclePosition.left + calculatedRadius);
        var distanceY = mouseY - (currentCirclePosition.top + calculatedRadius);
        if (
          Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2)) <=
          calculatedRadius
        ) {
          // 부딪힌 공 빨간색으로 표시
          $(circleTrackID).removeClass("circle").addClass("redcircle");
          $(circleTrackID).css("background-color", "red");
          endGame();
        }
        timeCirclePosition(circleTrackID);
      }, 1);
    }
    timeCirclePosition("#" + circleName); // 바로 넣어 실행

    animateCircle(circleName, circleSpeed, circleDiameter);

    // 3초에 한 번씩 createCircle 반복실행하며 새로운 공 생성하기
    setTimeout(function () {
      if (gameOn === true) createCircle();
    }, 3000);
  }

  function animateCircle(circleId, speed, circleDiameter) {
    var moveableWidth = $("body").width() - circleDiameter;
    var moveableHeight = $("body").height() - circleDiameter;
    var circleMoveLeft = (moveableWidth * Math.random()).toFixed();
    var circleMoveTop = (moveableHeight * Math.random()).toFixed();

    $("#" + circleId).animate(
      {
        left: circleMoveLeft,
        top: circleMoveTop,
      },
      speed,
      function () {
        animateCircle(circleId, speed, circleDiameter);
      }
    );
  }

  function endGame() {
    if (gameOn === true) {
      gameOn = false;
      updateScores(t);
      $(".circle").remove();
      $(".redcircle").stop();
    }
  }

  var resetButton = "<div class='resetbutton center'><h2>Play Again</h2></div>";

  var highScore1 = 0.0;
  var highScore2 = 0.0;
  var highScore3 = 0.0;
  var highScore4 = 0.0;
  var highScore5 = 0.0;

  function updateScores(newScore) {
    // newScore가 highScore1보다 높은 경우
    if (newScore > highScore1) {
      var redScore = "score1";
      highScore5 = highScore4;
      highScore4 = highScore3;
      highScore3 = highScore2;
      highScore2 = highScore1;
      highScore1 = newScore;
    } else if (newScore > highScore2) {
      var redScore = "score2";
      highScore5 = highScore4;
      highScore4 = highScore3;
      highScore3 = highScore2;
      highScore2 = newScore;
    } else if (newScore > highScore3) {
      var redScore = "score3";
      highScore5 = highScore4;
      highScore4 = highScore3;
      highScore3 = newScore;
    } else if (newScore > highScore4) {
      var redScore = "score4";
      highScore5 = highScore4;
      highScore4 = newScore;
    } else if (newScore > highScore5) {
      var redScore = "score5";
      highScore5 = newScore;
    }

    var highScorePlace1 =
      "<div class='score center' id='score1'><h2>" +
      highScore1.toFixed(2) +
      "</h2></div>";
    var highScorePlace2 =
      "<div class='score center' id='score2'><h2>" +
      highScore2.toFixed(2) +
      "</h2></div>";
    var highScorePlace3 =
      "<div class='score center' id='score3'><h2>" +
      highScore3.toFixed(2) +
      "</h2></div>";
    var highScorePlace4 =
      "<div class='score center' id='score4'><h2>" +
      highScore4.toFixed(2) +
      "</h2></div>";
    var highScorePlace5 =
      "<div class='score center' id='score5'><h2>" +
      highScore5.toFixed(2) +
      "</h2></div>";

    $("#highscores").append(
      highScorePlace1,
      highScorePlace2,
      highScorePlace3,
      highScorePlace4,
      highScorePlace5,
      resetButton
    );
    $("#" + redScore).css("color", "#D10808");
    $("#highscores").toggle();
    $(".resetbutton").click(function () {
      gameReset();
    });
  }
});
