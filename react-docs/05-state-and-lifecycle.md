# State와 생명주기

엘리먼트 렌더링에서는 시계 예시를 들어 UI를 업데이트하는 한 가지 방법만 배웠으며, 렌더링된 출력값을 변경하기 위해 `ReactDOM.render()`를 호출했다.

```jsx
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.querySelector("#root"));
}

setInterval(tick, 1000);
```

이 섹션에서는 `Clock` 컴포넌트를 완전히 재사용하고 캡슐화하는 방법을 배운다. 이 컴포넌트는 스스로 타이머를 설정하고 매초 스스로 업데이트 한다.

시계가 생긴 것에 따라 캡슐화하는 것으로 시작할 수 있다.

```jsx
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(<Clock date={new Date()} />, document.querySelector("#root"));
}

setInterval(tick, 1000);
```

하지만 이것은 컴포넌트가 타미어를 설정하고 매초 UI를 업데이트하지 않는다. 컴포넌트 스스로가 아닌 `setInterval`을 통해 UI를 업데이트하고 있다. 이것을 구현하기 위해서 `Clock` 컴포넌트에 state를 추가해야 한다. state는 props와 유사하지만 비공개이며 컴포넌트에 의해 완전히 제어된다.

## 함수에서 클래스로 변환하기

함수 컴포넌트를 클래스 컴포넌트로 변환하는 방법은 다음과 같다.

1. `React.Component`를 확장하는, 동일한 이름의 ES6 class를 생성한다.
2. `render()`라는 이름의 빈 메서드를 추가한다.
3. 함수의 내용을 `render()` 메서드 안으로 옮긴다.
4. `render()` 내용 안에 있는 `props`를 `this.props`로 변경한다.
5. 남아있는 빈 함수 선언을 삭제한다.

```jsx
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

`Clock`은 이제 함수가 아닌 클래스로 정의된다.

`render` 메서드는 업데이트가 발생할 때마다 호출된다. 하지만 같은 DOM 노드로 `<Clock />`을 렌더링하는 경우라면, `Clock` 클래스로 만든 단 하나의 인스턴스만 사용된다. 이는 로컬 state와 생명주기 메서드와 같은 부가적인 기능을 사용할 수 있게 해준다.

## 클래스에 로컬 State 추가하기

세 단계에 걸쳐 `date`를 props에서 state로 이동한다.

1. `render()` 메서드 안에 있는 `this.props.date`를 `this.state.date`로 변경한다.

   ```jsx
   class Clock extends React.Component {
     render() {
       return (
         <div>
           <h1>Hello, world!</h1>
           <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
         </div>
       );
     }
   }
   ```

2. 초기 `this.state`를 지정하는 class constructor를 추가한다.

   ```jsx
   class Clock extends React.Component {
     constructor(props) {
       super(props);
       this.state = { date: new Date() };
     }

     render() {
       return (
         <div>
           <h1>Hello, world!</h1>
           <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
         </div>
       );
     }
   }
   ```

   클래스 컴포넌트는 항상 `props`로 기본 constructor를 호출하는 것에 유의한다.

3. `<Clock />` 요소에서 `date` prop을 삭제한다.

   ```jsx
   class Clock extends React.Component {
     constructor(props) {
       super(props);
       this.state = { date: new Date() };
     }

     render() {
       return (
         <div>
           <h1>Hello, world!</h1>
           <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
         </div>
       );
     }
   }

   ReactDOM.render(<Clock />, document.querySelector("#root"));
   ```

## 생명주기 메서드를 클래스에 추가하기

컴포넌트가 많은 애플리케이션에서, 컴포넌트가 삭제될 때 해당 컴포넌트가 사용 중이던 리소스를 확보하는 것은 중요하다.

`Clcok`이 처음 DOM에 렌더링될 때마다 타이머를 설정하려 한다. 이것을 React에선 "마운팅"이라고 한다.

또한 `Clock`에 의해 만들어진 DOM이 삭제될 때마다 타이머를 제거하려 한다. 이것을 React에선 "언마운팅"이라고 한다.

컴포넌트 클래스에서 특별한 메서드를 선언하여 컴포넌트가 마운트되거나 언마운트될 때 일부 코드를 작동할 수 있다.

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {}
  componentWillUnmount() {}

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

이러한 메서드들은 "생명주기 메서드 Lifecycle Methods"라고 불린다.

`componentDidMount()` 메서드는 컴포넌트 출력물이 DOM에 렌더링된 후에 실행된다. 이 곳이 타이머를 설치하기에 좋은 장소이다.

```jsx
componentDidMount() {
  this.timerID = setInterval(() => this.tick(), 1000)
}
```

`this.props`가 React에 의해 스스로 설정되고, `this.state`는 특별한 의미를 가지지만, 타이머 ID와 같이 데이터 흐름에 독립적인 것을 저장해야 할 때는 추가적인 필드를 수동으로 클래스에 추가할 수 있다.

componentWillUnmount() 생명주기 메서드 안에 있는 타이머를 분해한다.

```jsx
componentWillUnmount() {
  clearInterval(this.timerID);
}
```

마지막으로 `Clock` 컴포넌트가 매초 작동하도록 하는 `tick()` 메서드를 구현한다. 이것은 컴포넌트 로컬 state를 업데이트하기 위해 `this.setState()`를 사용한다.

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(<Clock />, document.querySelector("#root"));
```

메서드가 어떻게 호출되는지 요약하면 다음과 같다.

1. `<Clock />`이 `ReactDOM.render()`로 전달되었을 때 React는 `Clock` 컴포넌트의 constructor를 호출한다. `Clock`이 현재 시각을 표시해야하기 때문에 현재 시각이 포함된 객체로 `this.state`를 초기화한 뒤 나중에 업데이트한다.
2. React는 `render()` 메서드를 호출한다. 이를 통해 React는 화면에 표시돼야 할 내용을 알게 된다. 그 다음 React는 `Clock`의 렌더링 출력값을 일치시키기 위해 DOM을 업데이트한다.
3. `Clock` 출력값이 DOM에 삽입되면, React는 `componentDidMount()` 생명주기 메서드를 호출한다. 해당 메서드 안에서 `Clock` 컴포넌트는 매초 컴포넌트의 `tick()` 메서드를 호출하기 위한 타이머를 설정하도록 브라우저에 요청한다.
4. 매 초 브라우저가 `tick()` 메서드를 호출한다. 그 안에서 `Clock` 컴포넌트는 `setState()`에 현재 시각을 포함하는 객체를 호출하면서 UI 업데이트를 진행한다. `setState()` 호출 때문에 React는 state가 변경된 것을 알고 화면에 표시될 내용을 알아내기 위해 `render()` 메서드를 재호출한다. 이때 `render()` 메서드 안의 `this.state.date`가 달라지고, 렌더링 출력값은 업데이트된 시각을 포함한다. 이에 따라 React는 DOM을 업데이트한다.
5. `Clock` 컴포넌트가 DOM으로부터 한 번이라도 삭제되었다면 React는 타이머를 멈추기 위해 `componentWillUnmount()` 생명주기 메서드를 호출한다.

## State를 올바르게 사용하기

`setState()`에 대해 알아야 할 세 가지가 있다.

### 직접 state를 수정하지 말 것

`this.state.comment = "Hello";`는 컴포넌트를 리렌더링하지 않는다. 대신 `setState()`를 사용해야 한다. `this.setState({ comment: "Hello" });`

`this.state`를 지정할 수 있는 유일한 공간은 constructor이다.

### State 업데이트는 비동기적일 수도 있다

React는 성능을 위해 여러 `setState()` 호출을 단일 업데이트로 한꺼번에 처리할 수 있다. `this.props`와 `this.state`가 비동기적으로 업데이트될 수 있기 때문에 다음 **state를 계산할 때 해당 값에 의존해서는 안된다**.

```jsx
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

이 코드는 카운터 업데이트에 실패할 수 있다. 이를 수정하기 위해 객체보다는 함수를 인자로 받는 형태로 `setState()`를 사용한다. 그 함수는 이전 state를 첫 번째 인자로 받아들이고, 두 번째 인자로 업데이트가 적용된 시점의 props를 두 번째 인자로 받아들인다.

```jsx
this.setState((state, props) => ({
  counter: state.counter + props.increment,
}));

// 일반적인 함수로 작성해도 정상 작동

this.setState(function (state, props) {
  return {
    counter: state.counter + props.increment,
  };
});
```

### State 업데이트는 병합된다

`setState()`를 호출할 때 React는 제공한 객체를 현재 state로 병합한다.

예를 들어, state는 다양한 독립적인 변수를 포함할 수 있다.

```jsx
constructor(props) {
  super(props);
  this.state = {
    posts: [],
    comments: []
  }
}
```

별도의 `setState()` 호출로 이러한 변수를 독립적으로 업데이트할 수 있다.

```jsx
componentDidMount() {
  fetchPosts().then(response => {
    this.setState({
      posts: response.posts
    });
  });

  fetchComments().then(reponse => {
    this.setState({
      comments: response.comments
    });
  });
}
```

이러한 병합은 얕기 때문에, `this.setState({comments})`는 `this.state.posts`에 영향을 주진 않지만 `this.state.comments`는 완전히 대체된다.

## 데이터는 아래로 흐른다

부모 컴포넌트나 자식 컴포넌트 모두, 특정 컴포넌트가 state가 있는지 없는지 알 수 없고, 그들이 함수나 클래스로 정의되었는지는 관심을 가질 필요가 없다.

이 때문에 state는 종종 로컬 또는 캡슐화라고 불린다. state가 소유하고 설정한 컴포넌트 이외에는 어떠한 컴포넌트에도 접근할 수 없다.

컴포넌트는 자신의 state를 자식 컴포넌트에 props로 전달할 수 있다.

```jsx
<FormattedDate date={this.state.date} />
```

위의 예시에서 `FormattedDate` 컴포넌트는 `date`를 자신의 props로 받고, 이것이 Clock의 state로부터 왔는지, Clock의 props로부터 왔는지, 수동으로 입력한 것인지 알 수 없다.

```jsx
function FormattedDate(props) {
  return <h2>It is {props.date.toLoacaleTimeString()}.</h2>;
}
```

이를 일반적으로 "하향식 top-down" 또는 "단방향식" 데이터 흐름이라고 한다. 모든 state는 항상 특정한 컴포넌트가 소유하고 있으며, 그 state로부터 파생된 UI 또는 데이터는 오직 트리구조에서 자신의 "아래"에 있는 컴포넌트에만 영향을 미친다.
