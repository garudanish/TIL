# Components와 Props

컴포넌트를 통해 UI를 재사용 가능한 개별적인 여러 조각으로 나누고, 각 조각을 개별적으로 살펴볼 수 있다.

개념적으로 컴포넌트는 JS 함수와 유사하다. "props"라고 하는 임의의 입력을 받은 후 화면에 어떻게 표시되는지를 기술하는 React 엘리먼트를 반환한다.

## 함수 컴포넌트와 클래스 컴포넌트

컴포넌트를 정의하는 가장 간단한 방법은 JS 함수를 작성하는 것이다.

```jsx
function Welcom(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

이 함수는 속성을 나타내는 데이터를 뜻하는 "props" 객체 인자를 받은 후 React 엘리먼트를 반환하므로 유효한 React 컴포넌트이다. 이러한 컴포넌트를 **함수 컴포넌트**라고 호칭한다.

ES6 class를 사용하여 컴포넌트를 정의할 수도 있다.

```jsx
class Welcome extends React.Component {
  render() {
    return return <h1>Hello, {this.props.name}</h1>;
  }
}
```

React의 관점에서 위 두 가지 유형은 동일하다.

컴포넌트 이름은 항상 대문자로 시작해야 한다. 소문자로 컴포넌트를 정의한 뒤 사용한다면 컴퓨터는 해당 컴포넌트를 HTML 태그로 인식하게 된다.

두 유형 모두 몇 가지 추가 기능이 있으며 이에 대해서는 다음 장에서 설명한다.

## 컴포넌트 렌더링

React 엘리먼트는 사용자 정의 컴포넌트로도 나타낼 수 있다.

```jsx
const element = <Welcome name="Sara" />;
```

React가 사용자 정의 컴포넌트로 작성한 엘리먼트를 발견하면, JSX 어트리뷰트와 자식을 해당 컴포넌트에 단일 객체로 전달한다. 이 단일 객체가 바로 "props"이다.

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(element, document.querySelector("#root"));
```

## 컴포넌트 합성

컴포넌트는 자신의 출력에 다른 컴포넌트를 참조할 수 있다. 모든 세부 단계에서 동일한 추상 컴포넌트를 사용할 수 있다. React 앱에서는 버튼, 폼, 다이얼로그, 화면 등의 모든 것들이 흔히 컴포넌트로 표현된다.

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}
```

일반적으로 새 React 앱은 최상위에 `App` 컴포넌트 하나만을 가진다.

## 컴포넌트 추출

컴포넌트를 작은 컴포넌트들로 쪼갤 수 있다.

```jsx
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img
          className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">{props.author.name}</div>
      </div>
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  );
}
```

`Comment` 컴포넌트는 `author` 객체, `text` 문자열, `date` 날짜를 props로 받은 후 소셜 미디어 웹사이트의 코멘트를 그린다.

이 컴포넌트는 모든 것이 중첩되어 있기 때문에 수정하기 어렵고, 개별적인 부분을 재활용하는 것도 어렵다. 몇가지 컴포넌트를 `Comment` 컴포넌트에서 추출할 수 있다.

1. `Avatar` 추출

   ```jsx
   function Avatar(props) {
     return (
       <img
         className="Avatar"
         src={props.user.avatarUrl}
         alt={props.user.name}
       />
     );
   }
   ```

   `Avatar`는 자신이 `Comment` 내에서 렌더링된다는 것을 알 필요 없다. 따라서 `author` 대신 보다 보편적으로 쓰일 수 있는 `user`로 props의 이름을 변경하였다.

   props의 이름을 지을 때는 컴포넌트가 쓰이는 맥락보단, 컴포넌트 그 자체의 시각에서 짓는 것을 추천한다.

   이제 `Comment`를 조금은 단순화시킬 수 있다.

   ```jsx
   function Comment(props) {
     return (
       <div className="Comment">
         <div className="UserInfo">
           <Avatar user={props.author} />
           <div className="UserInfo-name">{props.author.name}</div>
         </div>
         <div className="Comment-text">{props.text}</div>
         <div className="Comment-date">{formatDate(props.date)}</div>
       </div>
     );
   }
   ```

2. `UserInfo` 추출

   `UserInfo`는 `Avatar` 컴포넌트와 그 옆에 유저의 이름을 렌더링하고 있다.

   ```jsx
   function UserInfo(props) {
     return (
       <div className="UserInfo">
         <Avatar user={props.user} />
         <div className="UserInfo-name">{props.user.name}</div>
       </div>
     );
   }
   ```

   이것으로 `Comment` 컴포넌트를 더 단순화 시킬 수 있다.

   ```jsx
   function Comment(props) {
     return (
       <div className="Comment">
         <UserInfo user={props.author} />
         <div className="Comment-text">{props.text}</div>
         <div className="Comment-date">{formatDate(props.date)}</div>
       </div>
     );
   }
   ```

   처음에는 컴포넌트 추출 작업이 지루해보일 수 있지만, 재사용 가능한 컴포넌트를 만드는 것은 더 큰 앱을 작업할 때 두각을 드러낸다. 버튼, 패널, 아바타와같이 UI 일부가 여러번 재사용되거나, 복잡한 UI 일부를 만드는 경우 별도의 컴포넌트로 만드는 것이 좋다.

## props는 읽기 전용이다.

함수 컴포넌트, 클래스 컴포넌트 모두 컴포넌트의 자체 props를 수정해서는 안된다.

모든 React 컴포넌트는 자신의 props를 다룰 때 반드시 순수 함수처럼 동작해야 한다. 즉, props를 변경해선 안 된다.
