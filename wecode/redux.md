# Redux

`Action`, `Dispatch`, `Reducer`, `Store`, `useSelector`, `useDispatch`

## Design Pattern

### 왜 디자인 패턴을 사용해야 하는가?

디자인 패턴: 소프트웨어 개발 도중 개발자들이 겪을 수 있는 여러 어려움들에 대한 일종의 모범 답안.

**바퀴를 재발명하지 말라**. 대부분의 어려움은 누군가가 이미 겪고 해결법이 만들어져 있으니, 그들이 패턴화 해둔 문제 해결방식을 적용해 활용만 하면 된다.

규모가 큰 프로젝트에서 정형화된 패턴, 이름 붙여진 패턴을 사용하면 장황하고 디테일한 설명 대신 미리 약속해 둔 단어와 문장으로 설명할 수 있다.

### MVC

Model, View, Controller로 프로젝트의 구성 요소를 나눠 작성하는 패턴. 역할의 분담을 통해 각 코드의 존재 의의를 명확히 할 수 있다. 역할의 분담을 통해 각 코드의 존재 의의를 명확히 할 수 있다. 따라서 불필요한 코드가 줄어들고, 유지 보수가 쉬워지고, 확장이 용이해지고, 중복 코드를 제거하기 편하다.

이를 SoC 원칙, 관심사의 분리라고 한다.

- Model: 데이터를 다루는 파트. 어떤 데이터를 갖고 있고 어떻게 수정할 건지. 데이터베이스를 다루는 단. 작은 프로젝트에서는 상태를 다루는 단이라고도 볼 수 있다.
- View: 유저들이 접하는 화면을 다루는 파트.
- Controller: 로직을 다루는 파트. 모델에는 데이터를 +1하고, 뷰에는 +1 된 데이터를 렌더링하도록 하는 파트.

1. 유저가 뷰에서 액션을 취한다.(카트 추가, 인풋 작성)
2. 컨트롤러가 로직을 작동시키며 모델에 보낸다.
3. 모델이 바로 뷰를 업데이트하거나, 컨트롤러가 뷰를 업데이트 한다.

컨트롤러는 모델도 신경써야 하고, 뷰도 신경 써야 한다. 이것이 mvc 패턴의 가장 큰 특징이다.

#### MVC 패턴의 한계

한 컨트롤러에서 한 모델이 바뀌면 다른 뷰가 바뀌고, 그 뷰가 바뀌면 다른 모델이 바뀌고, 그 모델이 바뀌면 다른 뷰가 바뀌고... 식의 눈사태가 일어난다. 이렇게 되면 버그가 터졌을 때 문제 추적이 어려워진다.

### Flux

짜잔! 그래서 나온 `Flux` 패턴. FE 기술 개발에 최적화된 패턴이다. 컨트롤러가 모델, 뷰 둘 다 영향을 끼칠 수 있었던 반면, Flux 패턴은 `Action → Dispatcher → Store → View` 라는 단방향 흐름을 가진다. 흐름이 단순하니 변화 가능한 시나리오가 하나밖에 없고, 따라서 데이터의 변화를 예측할 수 있게 된다.

## redux

### What is Redux?

> `Redux`는 자바스크립트 앱을 위한 예측 가능한 상태 컨테이너입니다.

Flux는 단순한 개념이고, 이를 구현하기 위해선 코드를 작성해야 한다. 그리고 자바스크립트로 Flux 패턴을 구현한 것이 Redux이다. (라고 생각하자.)

Redux의 동작 방식은 ㄷ아래와 같다.

- Action: 하려하는 행위.
- Dispatcher: 전달자. Action을 Store까지 전달해주는 역할을 한다.
- Store: 변화를 일으키는 곳. 상태를 변화시키거나, 카트에 추가하거나 등.
- View: Store의 변화가 View에 반영된다.

Flux 패턴을 이용한 Redux의 가장 큰 특징은 `제약` 이다. 기존 MVC 패턴은 데이터의 흐름이 복잡하기 때문에 데이터의 흐름을 제약할 필요가 있었다.

> Flux 패턴을 써야 하나? 싶으면 쓰지 마라.
>
> 바닐라 리액트로 문제를 겪기 전까진 Redux를 쓰지 마라. 괜히 도입해서 복잡하게 만들지 마라.

### Redux의 세가지 원칙

#### 진실은 하나의 소스로부터: Single source of truth

애플리 케이션의 모든 상태는 하나의 저장소 안에 하나의 객체 트리 구조로 저장된다.

#### 상태는 읽기 전용이다: State is read-only

상태 state는 직접 변경해서는 안 되며, Action 객체와 함께 Dispatch를 호출해서만 바꿔야 한다.

이렇게 업데이트의 방식과 ㅅㅣ점을 제한함으로서 변화에 대한 예측 가능성을 얻을 수 있다.

- Dispatch가 호출된 순서대로 상태를 변경하여 변경된 순서와 내역을 쉽게 관리
- Action 객체는 평범한 자바스크립트 객체이며, 이 객체가 Store에 입력된 순서와 내용을 저장해두면 나중에 그 과정을 쉽게 재현할 수 있음.

#### 변화는 순수 함수로 작성되어야 한다: Changes are made with pure functions

순수함수: 같은 인풋을 입력하면 같은 아웃풋이 나와야 한다. 즉 부수 효과(side effect)가 없어야 한다.

store를 변화시키는 함수를 reducer라고 하는데, reducer는 반드시 순수 함수로 작성되어야 한다.

### Redux Concepts

Root Reducer: 모든 state가 담겨있는 하나의 객체. 이를 Reducer 조각들(slice reducer)로 나눈다. 정확히는 조각들을 하나로 합친다(combine).

이들을 props로 컴포넌트에 전달하고, 만일 컴포넌트에서 state를 변경하고자 한다면 Action을 담아서 Dispatch를 호출해야 한다.

#### Action / Action Creator

- Action이란 상태 변화에 대한 의도를 표현하는 단순한 자바스크립트 객체
- Action Creator: 액션을 만드는 함수. Action 객체를 정해진 틀에 맞게 리턴하는 단순한 함수. 단 Action을 reducer로 보내는 건 아님.

Action에서 필수적으로 들어가야 하는 요소: `type` . 그 외의 속성 이름은 자유.

```jsx
// 액션을 만드는 함수: 객체(액션)를 리턴한다.
export const addCart = (item) =>
  return {
    type: "ADD_ITEM",
    payload: item,
  }
}
```

#### Dispatcher

Action 객체를 Reducer에 보내는 역할을 하는 함수. `store.dispatch()` 형태로 제공됨. **기본 dispatch 함수는 반드시 동기적으로 처리되어야 한다.** 만약 비동기 Action이 필요하다면, 비동기 처리가 완료된 이후에 Action을 Dispatch하거나, 미들웨어를 활용해 비동기 처리를 해줘야 한다.

#### Reducer

Reducer는 변화를 일으키는 함수이며, 반드시 순수함수여야 한다. 이름이 리듀서인 이유는 `Array.prototype.reduce` 처럼 여러 요소를 하나로 줄이기 때문이다. Redux의 Reducer 역시 Store와 Action을 받아 새로운 Store로 값을 합쳐 내보낸다.

#### Store

Redux 앱 전체의 상태로 보통 깊게 중첩되어 있는 객체이다. store에서 관리되고, `store.getState()` 로 읽어올 수 있다.

#### Middleware

비동기 API 호출 등 순수하지 않은 요청(부수 효과)을 처리하거나, Redux Store로 전달되는 Action 등을 로깅하는 장소. 만일 설정하지 않으면 action은 바로 reducer로 전달된다.

## React-Redux

### React에서 Redux를 사용하는 이유

1. 전역 상태 관리
2. Props drilling

### react-redux가 우리를 위해 해주는 일

Redux는 자바스크립트 라이브러리이지, 리액트 라이브러리가 아니다. 즉, Redux를 리액트에 적용하려면 React-Redux를 사용해야 한다.

#### redux API

- createStore: store 생성
- combineReducer: 여러개의 slice를 결합하여 하나의 root reducer를 만듦
- applyMiddleware : middleware 정의

#### react-redux API

- Provider: react app 전체에 제공할 store를 주입하는 장소
- useSelector: storefㅡㄹ 가져오는 역할
- useDispatch: action을 ㄱeducer로 보내는 역할(setState)

### Redux 패턴에 맞게 프로젝트 폴더 구조 작성하기

#### Ducks Pattern

Redux의 구성 요소인 Action Type, Action, Reducer 셋을 하나의 파일 안에서 관리하는 패턴. 즉, 기능별로 나누는 방식.

`src/redux/counter.js` 파일 안에 initial state, action type, action creator, reducer가 모두 들어있는 형식이다.

Ducs Pattern을 사용한다면 action creator는 `export` 하고, reducer는 `export default` 해줘야 한다.

이렇게 각 파일에서 만들어진 slice reducer들은 `src/redux/index.js` 에서 `combineReducers`를 통해 root reducer를 만들어줘야 한다.

```jsx
// src/redux/index.js

import { combineReducers } from "redux";
import counter from "./counter";

const rootReducer = combineReducer({
  counter,
});

export default rootReducer;
```

이렇게 만든 rootReducer를 엔트리 파일에서 `createStore`와 `Provider`를 통해 사용한다.

```jsx
// src/index.js

import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./redux";

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

이렇게 만든 전역 state를 뷰에서 가져와 적용한다.

```jsx
// src/App.js

import { useSelector, useDispatch } from "react-redux";
import { increase, decrease } from "./redux/counter";

function App() {
  const count = useSelector((store) => store.counter);
  const dispatch = useDispatch();

  const up = () => {
    const action = increase();
    dispatch(action);
  };

  const down = () => {
    const action = decrease();
    dispatch(action);
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={up}>up</button>
      <button onClick={down}>down</button>
    </div>
  );
}

export default App;
```
