# 폼

HTML 폼 엘리먼트는 그 자체가 내부 상태를 가지기 때문에, React의 다른 DOM 엘리먼트와 다르게 동작한다.

```html
<form>
  <label>
    Name
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
```

순수한 HTML에서 이 폼은 name을 입력받으며, 사용자가 폼을 제출하면 새로운 페이지로 이동하는 기본 동작을 수행한다. 만일 React에서 동일한 동작을 원한다면 그대로 사용하면 된다. 하지만 대부분 JS 함수로 폼의 제출을 처리하고, 사용자가 폼에 입력한 데이터에 접근하도록 하는 것이 편리하다. 이를 위한 표준 방식은 "제어 컴포넌트 controlled components"라고 불리는 기술을 이용하는 것이다.

## 제어 컴포넌트 Controlled Component

`<input>`, `<textarea>`, `<select>`와 같은 HTML 폼 엘리먼트는 일반적으로 사용자의 입력을 기반으로 자신의 state를 관리하고 업데이트한다. React는 변경할 수 있는 state가 일반적으로 컴포넌트의 state 속성에 유지되며, `setState()`에 의해 업데이트 된다.

React state를 신뢰 가능한 단일 출처로 만들어 두 요소를 결합할 수 있다. 그렇게 하면 폼을 렌더링하는 React 컴포넌트는 폼에 발생하는 사용자 입력값을 제어한다. 이러한 방식으로 React에 의해 값이 제어되는 입력 폼 엘리먼트가 **제어 컴포넌트**이다.

```jsx
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(e) {
    alert(`A name was submitted: ${this.state.value}`);
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

`value` 어트리뷰트는 폼 엘리먼트에 설정되므로 표시되는 값은 항상 `this.state.value`가 되고, React state는 신뢰 가능한 단일 출처가 된다. React state를 업데이트하기 위해 모든 키 입력이 발생할 때 `handleChange`가 동작하기 때문에 사용자가 입력할 때 보여지는 값이 업데이트 된다.

제어 컴포넌트로 사용하면 input의 값은 항상 React state에 의해 결정된다. 코드의 양은 늘어나지만 다른 UI 엘리먼트에 input의 값을 전달하거나 다른 이벤트 핸들러에서 값을 재설정할 수 있다.

## textarea 태그

HTML에서 `<textarea>` 엘리먼트는 텍스트를 자식으로 가진다.

```html
<textarea>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sodales dictum mi sit amet sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
</textarea>
```

React에서 `<textarea>`는 `value` 어트리뷰트를 사용한다.

```jsx
class EssayForm extends React.Components {
  constructor(props) {
    super(props);
    this.state = {
      value: "가장 좋아하는 DOM 엘리먼트에 관한 에세이를 작성해주세요"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    handleChange(e) {
      this.setState({value: e.target.value});
    }

    handleSubmit(e) {
      alert(`에세이가 제출되었습니다: ${this.state.value}`);
      e.preventDefault();
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Essay:
            <textarea value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      )
    }
  }
}
```

## select 태그

`<select>` 태그는 드롭 다운 목록을 만드는 태그이다.

```html
<select>
  <option value="grapefruit">grapefruit</option>
  <option value="lime">lime</option>
  <option selected value="coconut">coconut</option>
  <option value="mango">mango</option>
</select>
```

이 과일 드롭 다운 목록에서 `selected` 옵션이 있는 coconut이 초깃값이다. React에서는 `selected` 어트리뷰트 대신 최상단 `select` 태그에 `value` 어트리뷰트를 사용한다. 한 곳에서만 업데이트하면 되기 때문에 제어 컴포넌트에서 사용하기 더 편하다.

```jsx
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { vlaue: "coconut" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(e) {
    alert(`당신이 좋아하는 맛은 ${this.state.value}`);
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          좋아하는 맛을 선택하세요:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">grapefruit</option>
            <option value="lime">lime</option>
            <option value="coconut">coconut</option>
            <option value="mango">mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

## file input 태그

HTML에서 `<input type="file">`은 사용자가 하나 이상의 파일을 장치 저장소에서 서버로 업로드하거나 API를 통해 JS로 조작할 수 있다.

값이 읽기 전용이기 때문에 React에서는 비제어 컴포넌트이다.

## 다중 입력 제어하기

여러 `input` 엘리먼트를 제어해야 한다면, 각 엘리먼트에 `name` 속성을 부여하고 `e.target.name` 값을 통해 핸들러가 어떤 작업을 할 지 선택하게 할 수 있다.

```jsx
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange}
          />
        </label>
      </form>
    );
  }
}
```

주어진 `input` 태그의 name에 일치하는 state를 업데이트하기 위해 ES6의 [계산된 프로퍼티명 표기법](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Object_initializer#%EC%86%8D%EC%84%B1_%EA%B3%84%EC%82%B0%EB%AA%85)을 사용하고 있다.

```jsx
this.setState({ [name]: value });
```

`setState()`는 자동적으로 현재 state에 일부 state를 병합하기 때문에, 바뀐 부분에 대해서만 호출하면 된다.

## 제어되는 Input Null 값

제어 컴포넌트에 `value` prop을 지정하면 의도하지 않는 한 사용자가 변경할 수 없다. `value`를 설정했는데도 사용자가 수정할 수 있다면 `value`를 `undefined`나 `null`로 설정했을 수 있다.

## 제어 컴포넌트의 대안

제어 컴포넌트는 데이터를 변경할 수 있는 모든 방법에 대해 이벤트 핸들러를 작성하고, React 컴포넌트를 통해 모든 입력 상태를 연결해야 한다. 이는 특히 기존의 코드를 React로 옮겨야 할 때나, React가 아닌 라이브러리와 React를 통합하고자 할 때 번거로운 작업이 될 수 있다. 이 경우 입력 폼을 구현하기 위한 대체 기술로 [비제어 컴포넌트](https://ko.reactjs.org/docs/uncontrolled-components.html)를 사용할 수 있다.

## 완전한 해결책

유효성 검사, 방문 필드 추적, 폼 제출 처리와 같은 완벽한 해결을 원한다면 Formik을 선택할 수 있다. 하지만 이 역시 제어 컴포넌트 및 state 관리에 기초하기 때문에 Formik을 사용하기 위해선 두 가지를 배우는 것을 소홀히 해선 안 된다.
