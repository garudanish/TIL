# JSX 소개

```jsx
const element = <h1>Hello, World!</h1>;
```

위 문법은 JSX로, JavaScript를 확장한 문법이다. JSX는 React "엘리먼트"를 생성한다.

## JSX란?

리액트는 마크업과 로직으로 기술을 인위적으로 분리하지 않는다. 둘 다 포함하는 '컴포넌트'라고 부르는 느슨하게 연결된 유닛으로 관심사를 분리한다.

## JSX에 표현식 포함하기

```jsx
const name = "Josh Perez";
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(element, document.getElementById("root"));
```

`name`이라는 변수를 선언한 후 중괄호로 감싸 JSX 안에 사용했다.

JSX의 중괄호 안에는 유효한 모든 JS 표현식을 넣을 수 있다. `2 + 2`, `user.firstName`, `formatName(user)` 등 모두 유효하다.

```jsx
function formatName(user) {
  return `${user.firstName} ${user.lastName}`;
}

const user = {
  firstName: "Harper",
  lastName: "Perez",
};

const element = <h1>Hello, {formatName(user)}!</h1>;

ReactDOM.render(element, document.getElementById("root"));
```

## JSX도 표현식이다

컴파일이 끝나면 JSX 표현식이 정규 JS 함수 호출(regular JavaScript function calls)이 되고 JS 객체로 인식된다.

즉, JSX를 `if`, `for` 문 안에 사용하고, 변수에 할당하고, 인자로서 받아들이고, 함수로부터 반환할 수 있다.

```jsx
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Heelo, Stranger.</h1>;
}
```

## JSX 속성 정의

어트리뷰트에 따옴표를 이용해 문자열 리터럴을 정의할 수 있다.

```jsx
const element = <a href="https://ko.reactjs.org"> link </a>;
const avatar = <img src={user.avatarUrl}></img>;
```

어트리뷰트에 JS 표현식을 삽입할 때 중괄호 주변에 따옴표를 입력하면 안 된다. 문자열을 입력할 땐 따옴표, 표현식을 입력할 땐 중괄호 둘 중 하나만 삽입해야 하며, 동일한 어트리뷰트에 두 가지를 동시에 사용해선 안된다.

JSX는 HTML보다는 JS에 더 가깝다. 따라서 React DOM은 HTML 어트리뷰트 이름 대신 `className`, `tabIndex` 등 camelCase 프로퍼티 명명 규칙을 사용한다.

## JSX로 자식 정의

태그가 비어있다면 `/>`를 이용해 바로 닫아주어야 한다.

```jsx
const element = <img src{user.avatarUrl} />;
```

JSX는 자식을 포함할 수 있다.

```JSX
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
)
```

## JSX는 주입 공격을 방지한다

JSX에 사용자 입력을 삽입하는 것은 안전하다.

```jsx
const title = response.potentiallyMaliciousInput;
// 안전함
const element = <h1>{title}</h1>;
```

기본적으로 React DOM은 JSX에 삽입된 모든 값을 렌더링하기 전에 이스케이프한다. 따라서 애플리케이션에서 명시적으로 작성되지 않은 내용은 주입되지 않는다. 모든 항목은 렌더링되기 전에 문자열로 변환된다. 이런 특성으로 인해 XSS 공격(사이트 간 스크립팅)을 방지할 수 있다.

## JSX는 객체를 표현한다

Babel은 JSX를 `React.createElement()` 호출로 컴파일한다.

```jsx
const element = <h1 className="greeting">Hello, World!</h1>;
// 위와 아래는 동일
const element = React.createElement(
  "h1",
  { className: "greeting" },
  "Hello, World!"
);
```

이러한 객체를 React 엘리먼트라고 하며, 화면에서 보고 싶은 것을 나타내는 표현이다. React는 이 객체를 읽어서 DOM을 구성하고 최신 상태로 유지하는 데 사용한다.
