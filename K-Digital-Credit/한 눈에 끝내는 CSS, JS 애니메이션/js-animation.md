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
