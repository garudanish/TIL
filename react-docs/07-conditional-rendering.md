# 조건부 렌더링

React에서 조건부 렌더링은 JS에서의 조건 처리와 같이 동작한다. `if`나 조건부 연산자와 같은 JS 연산자를 현재 상태를 나타내는 엘리먼트를 만드는 데에 사용하면 React는 현재 상태에 맞게 UI를 업데이트한다.

```jsx
function UserGreeting(props) {
  return <h1>Welcome Back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  <Greeting isLoggedIn={false} />,
  document.querySelector("#root")
);
```

이 예시는 `isLoggedin` prop에 따라서 다른 인사말을 렌더링한다.

## 엘리먼트 변수

엘리먼트를 저장하기 위해 변수를 사용할 수 있다. 출력의 다른 부분은 변하지 않은 채로 컴포넌트의 일부를 조건부로 렌더링할 수 있다.

```jsx
function LoginButton(props) {
  return <button onClick={props.onClick}>Login</button>;
}

function LogoutButton(props) {
  return <button onClick={props.onClick}>Logout</button>;
}

class LoginControl extends React.Component {
  constructor(props) {
    super(props)
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClcik = this.handleLogoutClcik.bind(this);
    this.state = {isLoggedIn = false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true})
  }
  handleLogoutClick() {
    this.setState({isLoggedIn: false})
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if(isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    )
  }
}
```

`LoginControl`이라는 유상태 컴포넌트를 만들었다. 이 컴포넌트는 현재 상태에 맞게 `<LoginButton />` 혹은 `<LogoutButton />`을 렌더링하며, 이전 예시의 `<Greeting />`도 함께 렌더링한다.

`isLoggedIn` 변수를 선언하고 `if`를 사용해 조건부로 렌더링하는 것은 좋은 방법이지만, 더 짧은 구문을 사용해 처리할 수도 있다.

## 논리 `&&` 연산자로 `if`를 인라인으로 표현하기

JSX 안에는 중괄호를 이용해 표현식을 포함할 수 있다. 중괄호 안에 JS의 논리 연산자 `&&`를 사용하면 쉽게 엘리먼트를 조건부로 넣을 수 있다.

```jsx
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 && (
        <h2>You have {unreadMessages.length} unread messages.</h2>
      )}
    </div>
  );
}

const messages = ["React", "Re: React", "Re:Re:React"];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.querySelector("#root")
);
```

JS에서 `true && expression`은 항상 `expression`으로 평가되고, `false && expression`은 항상 `false`로 평가된다. 따라서 엘리먼트는 조건이 `true`일 때만 출력되고 `false`라면 무시된다. 이 때 falsy 표현식이 반환된다는 것에 주의한다.

## 조건부 연산자로 if-else 구문 인라인으로 표현하기

삼항연산자 `condition ? true : false`를 사용하면 엘리먼트를 조건부로 렌더링할 수 있다.

```jsx
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? "currently" : "not"}</b> logged in.
    </div>
  );
}
```

## 컴포넌트가 렌더링하는 것을 막기

다른 컴포넌트에 의해 렌더링될 때 컴포넌트 자체를 숨기고 싶다면, 렌더링 결과를 출력하는 대신 `null`을 반환하면 된다.

`render` 메서드로부터 `null`을 반환하는 것은 생명주기 메서드 호출에 영향을 주지 않는다.
