# State, Props, Event

## Hooks Intro

> Hook은 함수 컴포넌트에서 React state와 생명주기 기능(lifecycle features)을 연동할 수 있게 해주는 함수입니다. - React 공식 문서

Hooks는 Hook이라는 함수들의 총칭. '후크'하면 생각나는 컨셉처럼, '끌고 오는' 이미지로 생각하면 된다. 단점이 있었음에도 클래스형 컴포넌트만 사용한 이유는, 클래스형 컴포넌트에서만 사용 가능했던 너무나도 중요한 기능이 있었기 때문이다. 그 기능이 state와 lifecycle 두 가지였고, 이 두 가지 기능을 함수형 컴포넌트에서 사용하기 위해 도입한 것이 Hooks이다. Hooks가 안정적으로 자리잡으면서 클래스형 컴포넌트를 함수형 컴포넌트가 대체했다.

## State & Event

### State

> 상태. 컴포넌트 내부에서 가지고 있는 컴포넌트의 상태값.

화면의 구성은 정적인 부분과 동적으로 변하는 부분으로 나뉜다. 기존에는 변수에 담아서 동적으로 변하는 부분을 관리했었지만, 앞으로는 state로 선언해서 관리하면 된다. 반대로, 정적인 부분은 state로 관리해서는 안 된다!

> `const [color, setColor] = useState("red");`

이 꼴이 `useState` 훅을 사용해 state를 선언하는 방법이다. `color`에는 `useState()`에 인자로 넘긴 초깃값이 할당되며, `setColor`에는 `color`를 바꿀 수 있는 함수가 할당된다. 이 함수가 `onClick` 등의 이벤트리스너에 전달해 줄 콜백함수 내부에서 state를 변경해주는 로직이 담겨있다면 이벤트가 발생할 때마다 state를 변경할 수 있다.

동적인 값을 이용해서 무언가를 관리하고자 할때 state를 사용하는 이유는, **UI 가 업데이트 되기 때문**이다! state가 변경되면(즉, state를 변경하는 함수를 사용하면), state가 쓰이고 있는 함수 컴포넌트를 다시 실행시킨다. 따라서 `return` 문 역시 실행되고, UI가 다시 실행되면서 업데이트되는 것이다.

```jsx
const Login = () => {
  const [color, setColor] = useState("red");

  const changeColor = () => {
    setColor("blue");
    console.log("함수 내부", color); // 함수 내부: red
  };

  console.log(color); // blue

  return <button onClick={changeColor}>색깔 변경</button>;
};
```

**state를 변경하는 함수는 비동기**이다. 따라서 state를 변경하는 함수와 같은 컨텍스트에서 변경한 state를 다룰 때는 변경되어 있지 않을 수 있으나, `return` 문을 실행할 때는 변경된 state가 적용된다.

## Props & Event

> 컴포넌트의 속성 값. 부모 컴포넌트로부터 전달받은 데이터를 지니고 있는 객체.

Props를 전달하기 위해서는 부모 컴포넌트와 자식 컴포넌트가 있어야 한다. React의 정보 흐름은 단방향성이어서, 무조건 수직적으로만, 반드시 부모 컴포넌트에서 자식 컴포넌트로만 전달할 수 있다. 단방향성을 지킨다면, 데이터의 흐름이 어디까지 깊게 내려가는지는 상관없이 사용할 수 있다.

자식 컴포넌트에서 props를 받아올 때, 함수에서 파라미터를 받듯이 props를 받아오면 된다. props는 객체이므로, 자식 컴포넌트에서 props를 받아올 때는 `props.key`의 형태로 사용하거나, 파라미터 자리에서 구조분해 할당을 통해 사용할 수 있다.

props로 넘겨줄 수 있는 자료형에는 제한이 없어서, 함수를 전달해줄 수도 있고, state를 전달해줄 수도, state를 변경하는 함수를 전달해줄 수도 있다.

```jsx
const Login = () => {
  const [color, setColor] = useState("red");
  const changeColor = () => {
    setColor("blue");
  }
  return (
    <p style={{color: "red"}}>WOW</p>
    <Child changeColor={changeColor} />
  )
}


// Child.js
const Child = ({ changeColor }) => {
  return <button onClick={changeColor}>Child Button</button>
}
```

props로 state를 전달했고, 부모 컴포넌트에서 state를 변경했다면, 부모 컴포넌트가 다시 실행되면서 자식 컴포넌트를 다시 그리면서 props로 변경된 state를 전달한다.
