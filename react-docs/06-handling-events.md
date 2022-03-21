# 이벤트 처리하기

React 엘리먼트에서 이벤트를 처리하는 방식은 DOM 엘리먼트에서 이벤트를 처리하는 방식과 유사하지만 몇 가지 문법 차이가 있다.

- React의 이벤트는 소문자 대신 camelCase를 사용한다.
- JSX를 사용하여 문자열이 아닌 함수로 이벤트 핸들러를 전달한다.

```html
<!-- HTML -->
<button onclick="activateLasers()">Activate Lasers</button>
```

```jsx
// React
<button onClick={activateLasers}>Activate Lasers</button>
```

또 다른 차이점으로, React에서는 `false`를 반환해도 기본 동작을 방지할 수 없다. 기본 동작을 방지하기 위해선 반드시 `preventDefault`를 명시적으로 호출해야 한다.

```html
<!-- HTML -->
<form onsubmit="console.log("You clicked submit."); return false;">
  <button type="submit">Submit</button>
</form>
```

```jsx
// React
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log("You clicked submit.");
  }

  return (
    <form onsubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}
```

React를 사용할 때 DOM 엘리먼트가 생성된 후 리스너를 추가하기 위해 `addEventListener`를 호출할 필요가 없다. 엘리먼트가 처음 렌더링될 때 리스너를 제공하면 된다.

ES6 클래스를 사용해 컴포넌트를 정의할 때, 일반적인 패턴은 이벤트 핸들러를 클래스의 메서드로 만드는 것이다.

```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    // 콜백에서 `this`가 작동하려면 아래와 같이 바인딩해주어야 한다.
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? "ON" : "OFF"}
      </button>
    );
  }
}

ReactDOM.render(<Toggle />, document.querySelector("#root"));
```

JSX 콜백 안에서 `this`의 의미에 대해 주의해야 한다. JS에서 클래스 메서드는 기본적으로 바인딩되어있지 않다. `this.handleClick`을 바인딩하지 않고 `onClick`에 전달하면 함수가 호출될 때 `this`는 `undefined`가 된다.

이는 React만의 특징이 아니라 JS에서 함수가 작동하는 방식의 일부이다. 메서드를 참조할 때 `()`를 사용하지 않는 경우, 해당 메서드를 바인딩해야 한다.

`bind`를 사용하지 않는 방법으로 두 가지가 있다.

1. 퍼블릭 클래스 필드 문법. 이 방식은 실험적인 문법이다.

   ```jsx
   class LoggingButton extends React.Component {
     handleClick = () => {
       console.log(`this is: ${this}`);
     };

     render() {
       return <button onClick={this.handleClick}>Click Me</button>;
     }
   }
   ```

   - CRA에서는 이 문법이 기본적으로 설정되어 있다.

2. 화살표 함수를 사용하는 방법.

   ```jsx
   class LoggingButton extends React.Component {
     handleClick() {
       console.log(`this is: ${this}`);
     }

     render() {
       return <button onClick={() => this.handleClick()}>Click Me</button>;
     }
   }
   ```

   - 이 문법의 문제점은 `LoggingButton`이 렌더링될 때마다 다른 콜백이 생성된다는 것이다. 대부분의 경우 문제가 되지 않지만 만일 콜백이 하위 컴포넌트에 props로서 전달된다면 그 컴포넌트들은 추가로 다시 렌더링을 수행할 수도 있다.
   - 따라서 성능 문제를 피하고자, 생성자 안에서 바인딩하거나 클래스 필드 문법을 사용하는 것을 권장한다.

## 이벤트 핸들러에 인자 전달하기

반복문 내부에서는 이벤트 핸들러에 추가적인 매개변수를 전달하는 것이 일반적이다. 예를 들어, `id`가 행의 ID일 경우 다음 코드가 모두 작동한다.

```jsx
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

위 두 줄은 같으며, 각각 화살표 함수와 `Function.prototype.bind`를 사용한다. 두 경우 모두 React 이벤트를 나타내는 `e` 인자가 ID 다음으로, 두 번째 인자로 전달된다. 화살표 함수를 사용하면 명시적으로 인자를 전달해야 하지만 `bind`를 사용할 경우 추가 인자가 자동으로 전달된다.
