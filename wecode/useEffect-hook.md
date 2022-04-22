# `useEffect` Hook

Hooks 안에는 여러가지가 있는데, 가장 많이 쓰고 무조건 알아야 하는 훅으로 `useState`와 `useEffect` 가 있다.

## side Effect

렌더링은 그림을 그린다는 뜻. Ui 요소를 그려내는 것을 렌더링이라고 생각하면 된다. 단, 이때 state와 props를 기반으로 ui 요소를 그려내는 행위를 리액트 함수 컴포넌트에서의 렌더링이다. 함수 컴포넌트는 커다란 하나의 함수인데, 인풋으로 state와 props가 들어오면, 아웃풋으로 `return` 문 안의 jsx가 나오는 것.

Side Effect는 부수 효과라고도 부른다. 함수가 어떤 동작을 할 때, input-output 외의 다른 값을 조작한다면 "이 함수에는 side effect가 있다"라고 표현한다. 즉, 리액트에서는 state, props, UI와 관련 없는 추가적인 액션을 다루는 것이 side effect와 관련된 행위다. 대표적으로 Data Fetching, DOM에 직접 접근, 구독(setInterval 등)과 같은 행위들이 리액트에서 일어날 수 있는 side effect 들이다.

## Effect Hook

Side effect가 일어나는 곳은 정해져 있으며, 그곳은 `useEffect`라는 훅 공간 내이다.

`useEffect`는 `return` 문 이전에 사용해야 하며, `useEffect(() => {}, [])` 의 형태로 작성한다. 첫 인자로는 일으키고 싶은 부수 효과, 두 번째 인자로는 부수효과가 일어날 조건, 일어날 타이밍인 의존성 배열이다.

- 의존성 배열의 유무와는 상관 없이, 부수효과는 첫 번째 렌더링이 끝나고 `return` 까지 뱉어내고 실행된다. 이는 의존성 배열에 어떤 요소가 들어가든 무조건 한 번은 렌더링되기 때문이다.
- 의존성 배열이 빈 배열일 경우, 추가로, 빈 배열을 넣게 되면 첫 렌더링 이후로 부수 효과가 일어나지 않는다. 대표적으로 데이터를 fetch할 때 해당 형식으로 사용한다. 데이터는 처음에 한번만 가져오면 되기 때문이다.
- 만일 의존성 배열을 생략할 경우, 렌더링이 될 때마다 부수 효과가 발생한다. 즉, state나 props가 변화할 때마다 부수 효과가 발생한다. 따라서 이는 효율적이지 못할 가능성이 높으므로 잘 사용하지 않는다.
- 의존성 배열에 요소가 있는 경우, 해당 요소가 변할 때에만 부수 효과가 발생한다. 부수 효과가 일어날 조건이 여러개라면, 의존성 배열에 요소를 추가시켜 주면 된다.

## Clean up Effect

Cleanup Effect는 이전에 일으킬 side effect를 정리할 필요가 있을 때 사용한다. 컴포넌트가 소멸되는 시점, 생명주기가 끝나는 시점에 side effect를 정리해야 할 때가 있을 수 있다. 가령, 로그인 페이지에서 `useEffect`를 사용해 `setInterval`을 설정해두고, 메인 페이지로 이동한다면 효율을 위해서 `setInterval`을 해제해줘야 한다. `addEventListener` 등도 마찬가지이다.

부수 효과를 정리하는 방법은 `useEffect` 안에서 `return () => {// clearInterval ...}` 식으로 콜백 함수를 반환하면 된다. 다음 effect가 일어나기 전에, 이전 effect의 영향을 정리해줘야 한다. 효율을 위해서이기도 하고, 이전 effect가 다음 effect에 영향을 끼치지 않게 하기 위함이다.

```jsx
useEffect(() => {
  console.log("side");

  return () => {
    console.log("clean");
  };
}, [color]);

console.log("1");
console.log("2");

// 1 2 clean side
```

cleanup Effect를 사용하는 목적 자체가, 다음 Effect가 일어나기 전에 이전 Effect의 영향을 지우는 것이다. 따라서 clean up이 먼저 실행되면서 이전 Effect의 영향을 지우고, 그 다음에야 부수 효과가 일어나는 것이다.
