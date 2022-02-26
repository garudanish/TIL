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
});
