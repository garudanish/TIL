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
  }
}
