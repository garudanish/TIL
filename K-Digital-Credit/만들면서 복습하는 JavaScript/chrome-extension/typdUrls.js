// 클릭 시 새 탭에서 열기
function onAnchorClick(event) {
  chrome.tabs.create({
    selected: true,
    url: event.srcElement.href,
  });
  return false;
}

// Top 10 Visited url 배열이 주어졌을 때
// 각각의 url들을 typedUrls.html에 띄워주기
function buildPopupDom(divName, data) {
  var popDiv = document.getElementById(divName);

  var ul = document.createElement("ul");
  popDiv.appendChild(ul);

  for (var i = 0; i < data.length; i++) {
    var a = document.createElement("a");
    a.href = data[i];
    a.appendChild(document.createTextNode(data[i]));
    a.addEventListener("click", onAnchorClick);

    var li = document.createElement("li");
    li.appendChild("a");
    ul.appendChild("li");
  }
}

function bulidTypedUrlList(divName) {
  var ms = 1000 * 60 * 60 * 24 * 7;
  var oneWeekAgo = new Date().getTime() - ms;

  var numRequestOutStanding = 0;
  chrome.history.seach(
    {
      startTime: oneWeekAgo,
      text: "",
    },
    function (historyItems) {
      for (var i = 0; i < historyItems.length; ++i) {
        var url = historyItems[i].url;
        var processVisitsWithUrl = function (url) {
          return function (visitItems) {
            processVisits(url, visitItems);
          };
        };

        // url에 대한 세부 방문 정보
        chrome.history.getVisits({ url: url }, processVisitsWithUrl(url));
        numRequestOutStanding++;
      }
      if (!numRequestOutStanding) {
        // 종료 후 최종 배열 만들기
        onAllVisitsProceed();
      }
    }
  );

  // url: 반복 횟수
  var urlToCount = [];

  // url 중에서 유저가 직접 입력해서 들어간 url을 찾아서 세주는 함수
  var processVisits = function (url, visitItems) {
    for (var i = 0; i < visitItems.length; ++i) {
      if (visitItems[i].transition !== "typed") {
        continue;
      }
      if (!urlToCount[url]) {
        urlToCount[url] = 0;
      }
      urlToCount[url]++;
    }

    if (!--numRequestOutStanding) {
      // 종료 후 최종 배열 만들기
      onAllVisitsProceed();
    }
  };

  // 최종 배열 만들기 함수
  var onAllVisitsProceed = function () {
    urlArray = [];
    for (var url in urlToCount) {
      urlArray.push(url);
    }

    urlArray.sort(function (a, b) {
      return urlToCount[b] - urlToCount[a];
    });

    buildPopupDom(divName, urlArray.slice(0, 10));
  };
}

document.addEventListener("DOMContentLoaded", function () {
  bulidTypedUrlList("typedUrl_div");
});
