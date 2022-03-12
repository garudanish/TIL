# 엘리먼트 렌더링

엘리먼트는 화면에 표시할 내용을 기술하는 React 앱의 가장 작은 단위다. 엘리먼트는 컴포넌트의 구성 요소이다.

```jsx
const element = <h1>Hello, world</h1>;
```

## DOM에 엘리먼트 렌더링하기

HTML 파일 어딘가에 `<div>`가 있다고 가정하자.

```html
<div id="root"></div>
```

이 안에 들어가는 모든 엘리먼트를 React DOM에서 관리하기 때문에 이것을 루트 DOM 노드라고 부른다.

React로 구현된 애플리케이션은 일반적으로 하나의 루트 DOM 노드가 있다. 기존 앱에 통합하려는 경우 원하는 만큼 많은 수의 독립된 루트 DOM 노드가 있을 수 있다.

React 엘리먼트를 루트 DOM 노드에 렌더링하려면 둘 다 `ReactDOM.render()`로 전달하면 된다.

```jsx
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById("root"));
```

## 렌더링 된 엘리먼트 업데이트하기

React 엘리먼트는 불변객체이다. 엘리먼트를 생성한 이후에 해당 엘리먼트의 자식이나 속성을 변경할 수 없다. 엘리먼트는 특정 시점의 UI를 보여준다.

UI를 업데이트하는 유일한 방법은 새로운 엘리먼트를 생성하고 이를 `ReactDOM.render()`로 전달하는 것이다.

```jsx
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById("root"));
}

setInterval(tick, 1000);
```

위 함수는 `setInterval()` 콜백을 이용해 초마다 `ReactDOM.render()`를 호출한다. (실제로 대부분의 React 앱은 `ReactDOM.render()`를 한 번만 호출한다.)

## 변경된 부분만 업데이트하기

React DOM은 해당 엘리먼트와 그 자식 엘리먼트를 이전의 엘리먼트와 비교하고, DOM을 원하는 상태로 만드는데 필요한 경우에만 DOM을 업데이트 한다.

위의 시계 예시는 매초 전체 UI를 다시 그리도록 엘리먼트를 만들었지만 React DOM은 내용이 변경된 텍스트 노드만 업데이트 한다.
