## DOM

HTML 문서를 작성할 때 HTML 요소를 다른 HTML 요소로 감싼다. 따라서 HTML 문서는 트리 형태의 계층 구조를 형성한다. `html > body > main > p`

브라우저에서 화면에 페이지를 나타내려면 주어진 HTML 코드를 해석한 뒤 트리 형태로 구조화된 문서를 생성해야 한다. 이러한 트리 형태를 가진 문서를 DOM, 문서 객체 모델(Document Object Model)이라고 부른다.

DOM은 자바스크립트를 사용해 HTML 문서에 대한 스크립트를 작성하는데 목적을 둔다.

DOM은 HTML 문서를 객체로 표현한 것이고, DOM을 생성하는 이유는 HTML 요소와 자바스크립트를 연결하기 위함이다.

### DOM 접근

- `document.getElementById(id)`
  - HTML의 id 속성 값을 기준으로 요소 하나를 선택한다.
- `document.querySelector(cssSelector)`
  - CSS 선택자를 기준으로 요소 하나를 선택한다.
  - 같은 선택자가 여러 개일 경우 첫 번째 것만 선택한다.
- `document.getElementsByClassName(className)`
  - `class` 속성 값으로 해당하는 요소를 모두 선택한다.
  - 해당 클래스를 가진 모든 요소들이 담긴 유사배열 `HTMLCollection`을 반환한다.
  - `HTMLCollection`은 유사배열로, 실시간으로 요소에 변화된 내용만을 반영한다는 점에 유의한다.
    - 이를 막기 위해서 `Array.from()`의 방식으로 유사배열을 일반 배열로 바꾸는 방법을 사용한다.
- `document.getElementsByTagName(tagName)`
  - 태그 이름을 기준으로 해당하는 요소를 모두 선택한다.
- `document.querySelectorAll(cssSelector)`
  - CSS 선택자를 기준으로 일치하는 모든 요소를 선택한다.

### 요소 컨텐츠 조회 및 수정

1. `textContent`
   - 선택한 요소 내부의 HTML을 제외하고, 순수 text 요소만 담고 있는 프로퍼티.
   - `innerText`로도 가능하다.
2. `innerHTML`
   - 선택한 요소 내부의 HTML을 담고 있는 프로퍼티.

이를 이용해 요소의 컨텐츠를 수정할 수 있다.

```js
const content = document.getElementById("target");
content.textContent = "Hello goorm";
content.innerHTML = "<strong>Hello!!!</strong>";
```

### 새 요소 만들기

`document.createElement()`를 통해 요소를 새로 만들 수 있다.

```js
const heading = document.createElement("h1");
heading.innerText = "Post Title";
```

### DOM에 요소 추가하기

`element.appendChild()`, `element.insertBefore()`을 통해 생성한 요소를 DOM에 추가할 수 있다.

- `element.appendChild()`: 해당 요소(`element`)의 마지막 자식 요소로 추가한다.
- `element.insertBefore()`: 특정 부모 요소의 자식 요소 앞에 새로운 요소를 추가한다.

### 요소 삭제하기

`부모요소.removeChild(자식요소)`를 사용해 선택된 자식요소를 삭제할 수 있다.

### `style` 프로퍼티 값 수정

`style` 프로퍼티를 통해 스타일을 직접 수정할 수 있다.

```js
const target = document.getElementById("target");
target.style.backgroundColor = "blue";
target.style.color = "#fff";
target.style.fontWeight = "bold";
target.style.fontSize = "2rem";
```

CSS에선 `background-color`와 같이 kebab-case로 쓰지만, 자바스크립트에선 camelCase로 변경해서 쓰는 것에 유의한다.

### `class` 프로퍼티값 직접 수정

미리 스타일을 지정한 `class` 이름으로 변경하여 스타일을 수정할 수 있다.

- `element.className = "클래스이름"`을 통해 직접 지정해줄 수 있다.
- `element.classList.add("클래스이름")`을 통해 클래스를 추가할 수 있다.
- `element.classList.remove("클래스이름")`을 통해 클래스를 제거할 수 있다.

## Event

프로그램에서 이벤트는 '프로그램에 의해 감지되고 처리될 수 있는 종작이나 사건'을 지칭한다.

브라우저에서 일어나는 마우스, 키보드를 활용한 동작들 대부분이 이벤트다. 요소의 상태가 바귀거나 CSS 애니메이션의 상태가 변하는 것 또한 이벤트다.

이벤트의 종류에는 다음과 같은 것들이 있다:

- 마우스 이벤트
- 폼 이벤트
- 키보드 이벤트
- 문서 이벤트
- CSS 이벤트

### 이벤트 핸들러 Event Handler

이벤트는 브라우저에서 항상 발생하지만, 이벤트에 특정 함수를 실행하겠다고 등록하지 않으면 어떤 결과도 일어나지 않는다.

이벤트에 특정 함수를 등록하기 위해선 **이벤트 핸들러** 등 세 가지가 필요하다.

- Event Target
  - 이벤트가 일어날 객체 혹은 요소
  - 이벤트 핸들러를 지정해 둘 요소
- Event Listener(Event Handler)
  - 이벤트 리스너 혹은 이벤트 핸들러
  - 이벤트가 발생했을 때 동작시킬 코드
- Event Type
  - 이벤트의 종류
  - `mouseover`, `keydown`, `scroll`, `click` 등 다양한 이벤트 존재

### `on<event>` 프로퍼티

HTML의 속성에 `on<event>` 프로퍼티를 추가하면 가장 쉽게 이벤트 핸들러를 등록할 수 있다.

`on<event>`의 속성 값으로는 실행할 자바스크립트 코드를 작성하면 된다.

### `addEventHandler`

`on<event>` 프로퍼티는 쉽고 간편하지만 사용한 핸들러를 재사용하거나 하나의 이벤트에 여러 개의 핸들러를 등록할 수 없다.
`addEventHandler`를 사용하면 해결할 수 있다.

```js
element.addEventListener(evnetName, handler, [...options]);
```

`eventName`에는 `click` 등의 이벤트 이름을 작성한다.

### `this`

`this`는 어떻게 호출되느냐에 따라 스크립트 내에서 가리키는 달라진다.

```js
console.log(this); // Window
```

어떤 것에도 속하지 않은 `this`는 호출될 때 `window` 전역 객체를 가리킨다.

```js
const btn = document.querySelector(".btn");
function clickTest() {
  console.log(this); // <input type="button" class="btn" value='Button'/>
}
btn.addEventListener("click", clickTest);
```

`this`가 핸들러 함수를 통해 호출되면 함수를 호출한 객체, 핸들러가 등록된 요소(`btn`)를 가리킨다.

### `Event` 객체

이벤트 핸들러로 실행되는 함수에 `Event`라는 객체를 매개변수로 전달할 수 있다.

```js
const btn = document.querySelector(".btn");
function clickTest(event) {
  console.log(event);
}
btn.addEventListener("click", clickTest);
```

예제 코드에서 버튼을 클릭하면 콘솔에 이벤트 객체의 정보가 뜨는 것을 볼 수 있다.

#### `Event.currentTarget`

`currentTarget`은 `event` 객체가 가진 프로퍼티 중 하나이다. 이벤트 핸들러가 등록된 요소를 값으로 가진다.

#### `Event.target`

```html
<ul class="list">
  <li class="item">1</li>
  <li class="item">2</li>
  <li class="item">3</li>
</ul>
```

```js
const list = document.querySelector(".list");
list.addEventListener("click", (event) => {
  console.log(event.target); // <li class="item">...</li>
  console.log(event.currentTarget); // <ul class="list">...</ul>
});
```

`ul.list`에 이벤트 핸들러를 등록한 뒤 각 항목을 클릭하면 `event.target`은 각 항목(`li.item`)이 되고, `event.currentTarget`은 `ul.list`가 된다.

만일 `ul.list`가 아니라 `li.item`에 이벤트 핸들러가 등록되었다면, `event.currentTarget`과 `event.target`은 모두 `li.item`이 된다.

### `preventDefault()`

브라우저에는 이벤트 핸들러를 지정하지 않아도 고유하게 동작하는 몇 가지 태그가 있다.

- `a` 태그를 클릭할 때 `href` 링크로 페이지 이동
- `<input type="submit" />`과 같이 `form` 안에서 `submit` 역할을 하는 버튼을 클릭할 때 폼 데이터가 서버로 전송

`event.preventDefault()`를 사용하면 자동으로 동작하는 것을 막을 수 있다.

## Animation

웹에서 애니메이션을 구현할 수 있는 세 가지 방법의 특징:

- CSS Transition: 직선적인 변화만 표현할 수 있음.
  - 주로 `button`이나 `a`에 마우스를 올렸을 때 색 변화 혹은 크기 변화 등 간단한 인터렉션에 추가하고 싶은 경우 사용
- CSS Animations: `keyframe`별로 스타일을 지정해 변칙적인 변화를 표현 가능
  - `transition`과 달리 애니메이션에 트리거가 반드시 필요하지 않음.
- JS Animations: 개발자가 직접 변화를 조정해야하지만 자유롭고 세밀한 애니메이션 구현 가능.

### `classList`

`classList.add("className")`, `classList.remove("className")`, `classList.contains("className")`, `classList.toggle("className")`의 네 가지 메서드를 갖는다.

- `classList.add("className")`: 클래스 목록에 클래스를 추가한다.
- `classList.remove("className")`: 클래스 목록에서 클래스를 제거한다.
- `classList.contains("className")`: 클래스 목록에 클래스가 들어있는지 여부를 `boolean`으로 리턴한다.
- `classList.toggle("className")`: `add()`, `remove()`, `contains()` 메서드를 합친 기능. 클래스 목록에 존재하면 `remove` 메서드 역할을, 존재하지 않으면 `add` 메서드 역할을 한다.

### Transition Event

`transition`에 대한 이벤트를 JS로 이벤트 리스너를 추가할 수 있다.

`transition`에 대한 이벤트는 `transitionrun`, `transitionstart`, `transitioncancel`, `transitionend` 네 가지가 있다.

- `transitionrun`: `transition`이 처음 생성될 때, 즉 `transition-delay`가 시작되기 전에 발생한다.
- `transitionstart`: `transition`이 실제로 시작된 경우, 즉 `transition-delay`가 끝난 후에 발생한다. 실제로 변화가 시작할 때 발상한다.
- `transitioncancel`: `transition`이 취소된 상황에 발생한다.
- `transitionend`: `transition`이 완료된 경우 발생한다.

### Animation Event

`animation`에 대한 이벤트 리스너 역시 추가할 수 있다.

`animation`에 대한 이벤트는 `animationstart`, `animationiteration`, `animationend`, `animationcancel`네 가지 상태가 있다.

- `animationstart`: `animtion`이 처음 생성되고 시작될 때 발생한다. `animation-delay`가 있다면 해당 값만큼 기다린 후에 `animation`이 시작되면서 `animationstart` 이벤트가 발생한다.
- `animationiteration`: `animation-iteration-count`로 애니메이션의 반복 횟수를 지정할 수 있고, 해당 이벤트를 나타낸다.
- `animationend`: `animation`이 끝나면 발생한다.
- `animationcancel`: `animation`이 시작된 이후 중단하게 되면 발생한다.

### Timer Function

- `setTimeout`
  - 함수를 일정 시간 뒤에 함수나 지정된 코드를 실행하는 타이머를 설정한다.
  - 실행할 함수를 첫 번째 인자로, 일정 시간을 두 번째 인자로 받는다.
- `clearTimeout`
  - 앞서 실행된 `setTimeout`의 실행을 취소하는 역할을 한다.
  - `setTimeout`을 실행하면 숫자를 반환하는데, 이것이 `timeoutID`이다. 이 값을 `clearTimeout` 함수에 전달하면 해당 ID가 가리키는 `setTimeout`의 실행이 종료된다.
- `setInterval`
  - 일정 시간의 간격을 두고 함수나 지정된 코드를 실행한다.
  - 실행할 함수를 첫 번째 인자로, 일정 시간을 두 번째 인자로 받는다.
  - 실행하자마자 반환되는 숫자 값은 `setInterval`의 ID 값이다.
- `clearInterval`
  - 앞서 실행된 `setInterval` 함수를 취소한다.

`setTimeout`과 `setInterval`을 이용한다면 애니메이션이 생각보다 부드럽게 구동되지 않을 수 있다. 두 함수가 화면 프레임을 고려하지 않고 주어진 시간 내(혹은 이후)에 함수를 실행하기 때문이다. 이 때문에 애니메이션이 버벅대는 문제가 발생한다. 또한, 페이지를 보지 않는 시점에도 실행돼 배터리 수명이나 성능을 하락시킬 수 있다.

이의 대안으로 `requestAnimationFrame`이다. `requestAnimationFrame`은 화면을 그리는 프레임 시작 지점에 맞춰 함수를 실행한다. 프레임 개수가 많아도 프레임 시작 지점과 함수 구동 시점을 맞추기 때문에 애니메이션이 자연스럽게 구동된다.
