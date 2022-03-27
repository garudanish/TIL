# 리스트와 Key

```jsx
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled); // [2, 4, 6, 8, 10]
```

위 예제는 `map()` 함수를 이용해 `numbers` 배열의 값을 두 배로 만들고, 그 배열을 `doubled` 변수에 할당한 뒤 로그로 확인하는 코드이다. React에서 배열을 엘리먼트 리스트로 만드는 방식은 이와 거의 동일하다.

## 여러개의 컴포넌트 렌더링하기

엘리먼트 모음을 만들고 JSX에 `{}`를 사용해 포함시킬 수 있다.

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => <li>{number}</li>);

ReactDOM.render(<ul>{listItems}</ul>, document.querySelector("#root"));
```

`map()` 함수를 사용해 `numbers` 배열을 순회하며, 각 요소에 대해 `<li>` 엘리먼트를 반환하고 그 결과를 `listItems`에 저장한다. 이후 배열을 `<ul>` 엘리먼트 안에 포함하고 DOM에 렌더링한다.

## 기본 리스트 컴포넌트

일반적으로 컴포넌트 안에서 리스트를 렌더링한다.

이전의 예시를 `numbers` 배열을 받아서 엘리먼트들의 리스트를 반환하는 예제로 리팩토링할 수 있다.

```jsx
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => <li>{number}</li>);
  return <ul>{listItems}</ul>;
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.querySelector("#root")
);
```

이 코드를 실행하면 리스트의 각 항목에 key를 넣어야 한다는 경고가 표시된다. "key"는 엘리먼트 리스트를 만들 때 포함해야 하는 특수한 문자열 어트리뷰트이다.

```jsx
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => (
    <li key={number.toString()}>{number}</li>
  ));
  return <ul>{listItems}</ul>;
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.querySelector("#root")
);
```

## Key

key는 React가 어떤 항목을 변경, 추가, 삭제할지 식별하는 것을 돕는다. key는 엘리먼트에 안정적인 고유성을 부여하기 위해 배열 내부의 엘리먼트에 지정해야 한다.

key를 선택하는 가장 좋은 방법은 리스트의 다른 항목들 사이에서 해당 항목을 고유하게 식별할 수 있는 문자열을 사용하는 것이다. 대부분의 경우 데이터의 ID를 사용한다. 만일 사용할 ID가 없다면 최후의 수단으로 항목의 인덱스를 key로 사용할 수 있다.

항목의 순서가 바뀔 수 있는 경우 key에 인덱스를 사용하면 성능이 저하되거나 컴포넌트의 state와 관련된 문제가 발생할 수 있다. 명시적으로 key를 지정하지 않는 경우 React는 기본적으로 인덱스를 key로 사용한다.

## Key로 컴포넌트 추출하기

키는 주변 배열의 context에서만 의미가 있다. `ListItem`이라는 컴포넌트를 추출한 경우, `ListItem` 안의 `<li>` 가 아닌, 배열의 `<ListItem />` 엘리먼트가 key를 가져야 한다.

```jsx
function ListItem(props) {
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => (
    // 배열 안에 key를 지정한다.
    <ListItem key={number.toString()} value={number} />
  ));
  return <ul>{listItems}</ul>;
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.querySelector("#root")
);
```

경험 상 `map()` 함수 내부에 있는 엘리먼트에 key를 넣어주는 게 좋다.

## Key는 형제 사이에서만 고유한 값이어야 한다

key는 배열 안, 형제 사이에서 고유해야 한다. 전체 범위에서까지 고유할 필요는 없다. 즉, 두 개의 다른 배열이 동일한 key를 사용할 수 있다.

React에서 key는 힌트를 제공하지만, 컴포넌트를 전달하지는 않는다. 컴포넌트 안에서 같은 값이 필요하다면 다른 이름의 prop으로 명시적으로 전달한다.

```jsx
const content = posts.map((post) => (
  <Post key={post.id} id={post.id} title={post.title} />
));
```

이 예시에서 `Post` 컴포넌트는 `props.id`를 읽을 수 있지만 `props.key`는 읽을 수 없다.

## JSX에 `map()` 포함시키기

JSX를 사용하면 중괄호 안에 모든 표현식을 포함시킬 수 있다. 따라서 `map()` 함수의 결과 역시 인라인으로 처리할 수 있다.

```jsx
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) => (
        <ListItem key={number.toString()} value={number} />
      ))}
    </ul>
  );
}
```

코드가 더 깔끔해질 수 있지만 악용될 수도 있다. JS와 마찬가지로, 가독성을 위해 변수로 추출할지의 여부는 개발자의 판단에 달려있다. 만일 `map()` 함수가 많이 중첩될 경우, 컴포넌트로 추출하는 것이 좋다는 것을 명심해야 한다.
