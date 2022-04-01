# State 끌어올리기

동일한 데이터에 대한 변경사항을 여러 컴포넌트에 반영해야 할 필요가 있다. 이럴 때는 가장 가까운 공통 조상으로 state를 끌어올리는 것이 좋다.

주어진 온도에서의 물의 끓는 여부를 추정하는 온도 계산기를 만든다. `BoilingVerdict`라는 이름의 컴포넌트는 섭씨 온도 `celsius` prop을 받아서 이 온도가 물이 끓기에 충분한지 여부를 출력한다.

```jsx
function BoilingVerdict(props) {
  if (props.celsius >= 1000) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}
```

그 다음으로 온도를 입력할 수 있는 `<input>`을 렌더링하고, 그 값을 `this.state.temperature`에 저장하는 컴포넌트 `Calculator`를 만든다. 또한 현재 입력값에 대한 `BoilingVerdict` 컴포넌트를 렌더링한다.

```jsx
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { temperature: "" };
  }

  handleChange(e) {
    this.setState({ temperature: e.target.value });
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>Enter temperature in Celsius:</legend>
        <input value={temperature} onChange={this.handleChange} />
        <BoilingVerdict celsius={parseFloat(temperature)} />
      </fieldset>
    );
  }
}
```

## 두 번째 Input 추가하기

새 요구사항으로 화씨 입력 필드를 추가하고 두 필드 간 동기화 상태를 유지하도록 한다.

`Calculator` 컴포넌트에서 `TemperatureInput` 컴포넌트를 빼내고, "c", "f"의 값을 가질 수 있는 `scale` prop을 추가한다.

```jsx
const scaleNames = {
  c: "Celsius",
  f: "Fahrenheit",
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { temperature: "" };
  }

  handleChange(e) {
    this.setState({ temperature: e.target.value });
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature} onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  render() {
    return (
      <div>
        <TemperatureInput scale="c" />
        <TemperatureInput scale="f" />
      </div>
    );
  }
}
```

이렇게 구현하면 입력 필드는 두 개지만, 둘 중 하나에 온도를 입력한다고 해서 다른 하나가 갱신되지 않는다. 즉, 두 입력 필드 간 동기화 상태가 유지되지 않는다. 또한 `BoilingVerdict` 역시 보여줄 수 없다. 현재 입력된 온도 정보는 `TemperatureInput`에 숨겨져 있고 `Calculator`는 그 값을 알 수 없다.

## 변환 함수 작성하기

섭씨를 화씨로, 화씨를 섭씨로 변환해주는 함수를 작성한다.

```jsx
function toCelcius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
  return (celsiut * 9) / 5 + 32;
}
```

두 함수는 숫자를 변환한다. `temperature` 문자열과 변환 함수를 인수로 취해서 문자열을 반환하는 또 다른 함수를 작성해, 한 입력값에 기반해 다른 입력값을 계산하는 용도로 사용한다. 이 함수는 올바르지 않은 값일 경우 빈 문자열을 반환하고, 값을 소수점 세 번째 자리로 반올림하여 출력한다.

```jsx
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.inNaN(input)) {
    return "";
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
```

`tryConvert("abc", toCelsius)`는 빈 문자열을 반환할 것이고, `tryConvert("10.22", toFahrenheit)`는 `50.396`을 반환할 것이다.

## state 끌어올리기

현재는 `TemperatureInput` 컴포넌트에 state가 선언되어 있으며, 따라서 두 개의 컴포넌트가 각자의 state에 독립적으로 저장하고 있다. 이 상태에선 두 입력값이 서로의 것과 동기화된 상태로 있을 수 없다.

React에서 state를 공유하는 방법은 그 값을 필요로하는 컴포넌트 간의 가장 가까운 공통 조상으로 state를 끌어올리는 것이다. 이것을 "state 끌어올리기"라고 한다.

`TemperatureInput`이 가지고 있던 지역 state를 공통 조상인 `Calculator`로 옮겨놓는다. `Calculator`가 공유될 state를 소유하고 있으면 이 컴포넌트는 두 입력 필드의 현재 온도에 대한 진리의 원천(source of truth)이 되고, 이를 통해 두 입력 필드가 서로 간에 일관된 값을 유지하도록 만들 수 있다. 두 `TemperatureInput` 컴포넌트의 props가 공통 조상, 같은 부모인 `Calculator`로부터 전달되기 때문에, 두 입력 필드는 항상 동기화된 상태를 유지할 수 있다.

`TemperatureInput` 컴포넌트의 `this.state.temperature`를 `this.props.temperature`로 대체한다. 일단 있다고 가정하고 수정하고, 나중에 이 값을 `Caculator`로부터 건네는 순서로 수정한다.

```jsx
//...
render() {
  const temperature = this.props.temperature;
  // ...
}
```

props는 읽기 전용이다. `temperature`가 지역 state였을 때는 값 변경을 위해 `TemperatureInput`의 `this.setState`를 호출하면 됐지만, 이제는 부모로부터 prop으로 전달되기 때문에 `TemperatureInput`은 그 값을 제어할 능력이 없다.

이 문제를 React에서는 컴포넌트를 제어 가능하게 만드는 방식으로 해결한다. DOM `<input>`이 `value`와 `onChange` prop을 건네받았듯이, 사용자 정의된 `TemperatureInput` 역시 `temperature`와 `onTemperatureChange` props를 자신의 부모인 `Calculator`로부터 건네받을 수 있다. 따라서, 이제 `TemperatureInput`에서 온도를 갱신하려면 `this.props.onTemperatureChange`를 호출하면 된다.

```jsx
handleChange(e) {
  this.props.onTemperatureChange(e.target.value)
}
```

이 `onTemperatureChange` prop은 부모 컴포넌트인 `Calculator`로부터 `temperature` prop와 함께 제공될 것이다. 이를 위용해 자신의 지역 state를 수정해서 변경 사항을 처리하므로, 변경된 새 값을 전달받은 두 입력 필드는 모두 리렌더링된다.

이를 수정해 종합하면 다음과 같다.

```jsx
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature} onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

`Calculator` 컴포넌트에선, `temperature`와 `scale`의 현재 입력값을 이 컴포넌트의 지역 state에 저장한다. 이것은 입력 필드들로부터 "끌어올린" state이며, 그들에 대한 진리의 원천으로 작용한다.

가령, 섭씨 입력 필드에 37을 입력하면 `Calculator` 컴포넌트의 state는 `{ temperature: "37", scale: "c" }`가 되고, 화씨 입력 필드를 212로 수정하면 `{ temperature: "212", scale: "f" }`가 될 것이다. 두 필드 모두에 값을 저장할 수도 있지만, 결국은 불필요한 작업이다. 가장 최근에 변경된 입력값과 그 값이 나타내는 단위를 저장하는 것만으로도 충분하다. 그 뒤에 `temperature`와 `scale`에 기반해 다른 입력 필드의 값을 추론할 수 있다. 동일한 state로부터 계산되기 때문에, 두 입력 필드의 값은 항상 동기화된 상태를 유지한다.

```jsx
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = { temperature: "", scale: "c" };
  }

  handleCelsiusChange(temperature) {
    this.setState = { scale: "c", temperature };
  }

  handleFahrenheitChange(temperature) {
    this.setState = { scale: "f", temperature };
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius =
      scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit =
      scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}
        />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
        />
        <BoilingVerdict celsius={parseFloat(celsius)} />
      </div>
    );
  }
}
```

어떤 필드를 수정하든간에 `Calculator`의 `this.state.scale`과 `this.state.temperature`가 수정되며, 두 필드는 이 값에 기반해 각자의 값으로 재계산한다.

입력값을 변경할 때 일어나는 일을 정리하면 다음과 같다.

- React는 DOM `<input>`의 `onChange`에 지정된 함수를 호출한다. 위 예시의 경우 `TemperatureInput`의 `handleChange` 메서드이다.
- `TemperatureInput` 컴포넌트의 `handleChange` 메서드는 새로 입력된 값과 함께 `this.props.onTemperatureChange()`를 호출한다. `onTemperatureChange`를 포함한 이 컴포넌트의 props는 부모 컴포넌트인 `Calculator`로부터 제공받는다.
- 두 `TemperatureInput` 중 어떤 필드의 값을 수정하느냐에 따라서, `Calculator`의 메서드인 `handleCelsiusChange`, `handleFahrenheitChange` 둘 중 하나가 호출된다.
- 이 두 메서드는 내부적으로 `Calculator` 컴포넌트가 새 입력값, 그리고 현재 수정한 입력 필드의 입력 단위와 함께 `this.setState()`를 호출하게 함으로써 React에게 자신을 다시 렌더링하도록 요청한다.
- React는 UI가 어떻게 보여야 하는지 알아내기 위해 `Calculator` 컴포넌트의 `render` 메서드를 호출한다.
- React는 `BoilingVerdict` 컴포넌트에게 섭씨온도를 props로 건네면서 그 컴포넌트의 `render` 메서드를 호출한다.
- React DOM은 물의 끓는 여부와 올바른 입력값을 일치시키는 작업과 함께 DOM을 갱신한다. 값을 변경한 입력 필드는 현재 입력값을 그대로 받고, 다른 입력 필드는 변환된 온도 값으로 갱신된다.

## 교훈

React 애플리케이션 안에서 변경이 일어나는 데이터에 대해서는 진리의 원천을 하나만 두어야 한다. 보통, state는 렌더링에 그 값을 필요로 하는 컴포넌트에 먼저 추가된다. 그 뒤 다른 컴포넌트도 그 값을 필요로 하면 그 값을 그들의 가장 공통 조상으로 끌어올리면 된다.

state를 끌어올리는 것은 양방향 바인딩 접근 방식보다 더 많은 "보일러 플레이트" 코드를 유발하지만, 버그를 찾고 격리하기 더 쉽게 만든다는 장점이 있다. 어떤 state든 특정 컴포넌트 안에서 존재하고, 그 컴포넌트가 자신의 state를 스스로 변경할 수 있으므로 버그가 존재할 수 있는 범위가 크게 줄어든다.

어떤 값이 props 또는 state로부터 계산될 수 있다면, 그 값을 state에 두어서는 안 된다. props 또는 state로부터 계산될 수 있다면, `render()` 메서드 안에서 계산하는 것이 사용자 입력값의 정밀도를 유지한 채 다른 필드의 입력값에 변화를 줄 수 있는 방법이다.
