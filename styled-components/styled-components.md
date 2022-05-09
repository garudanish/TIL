# styled-components

## 기초

### 영감

styled-components는 리액트 컴포넌트를 스타일링할 때 CSS를 강화하는 방법을 탐구한 결과이다. 하나의 용례에 집중해서, 우리는 사용자에게 보이는 아웃풋과 더불어, 개발자 경험을 최적화할 수 있었다.

개발자 경험 외에도, styled-components는 다음과 같은 사항을 제공한다:

- 자동적으로, 필요한 CSS만: styled-components는 페이지의 어떤 요소가 렌더링되는지 추적하고, 스타일을 주입한다. 그리고 이것은 완전히 자동화되어있다. 코드 분할과 결합했을 때, 이것은 사용자가 필요한 만큼의 코드만을 로드하는 것을 의미한다.
- 클래스 이름 버그 없음: styled-components는 유니크한 클래스 네임을 생성한다. 개발자는 복제, 덮어쓰기, 오타를 걱정할 필요가 없다.
- 삭제 편의성: 코드를 작성하다 보면 어디선가 쓰일 수도 있는 클래스 네임을 삭제해도 될지 알기 어렵다. styled-components에서 모든 스타일링은 특정한 컴포넌트와 결합되어 있기 때문에, 삭제해도 되는지를 명확히 알 수 있다. 만일 컴포넌트가 쓰이지 않아서 삭제된다면, 그것의 스타일 역시 함께 삭제된다.
- 간단하고 동적인 스타일링: 컴포넌트의 스타일을 props나 전역 테마에 기반해 적용하는 것은, 직접 여러 개의 클래스를 관리하는 것보다 단순하고 직관적이다.
- 쉬운 유지보수: 어떤 스타일이 적용될 지를 파악하기 위해 여러 파일들을 찾아 다닐 필요가 없다. 따라서 코드의 양과 상관 없이 유지보수가 쉬워진다.
- 자동 벤더 설정: 현재 스탠다드에 맞게 CSS를 작성하면, styled-components가 벤더와 관련된 나머지 일을 자동으로 설정해준다.

이 모든 것은 기존에 작성했던 CSS 코드를 개별 컴포넌트에 적용시키기만 하면 얻을 수 있다.

### 시작하기

`styled-components`는 태그된 템플릿 리터럴을 통해 컴포넌트의 스타일을 지정한다.

그것은 컴포넌트와 스타일 간의 매핑을 제거한다. 즉, 당신은 스타일을 정의할 때, 스타일이 부착되어 있는 평범한 리액트 컴포넌트를 만드는 것이다.

다음의 예시는 wrapper와 title이라는 스타일이 부착된 단순한 컴포넌트를 만드는 예시이다.

```jsx
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Wrapper = styled.section`
  padding: 4em;
  background-color: papayawhip;
`;

render(
  <Wrapper>
    <Title>Hello World!</Title>
  </Wrapper>
);
```

### props에 기반해 적용하기

함수를 통해 styled components의 템플릿 리터럴이 props에 기반해 스타일을 적용하게 할 수 있다.

다음의 버튼 컴포넌트들은 색을 바꾸는 `primary` state를 갖고 있다. `primary` prop을 `true`로 설정하면 `background-color` 와 `color`가 바뀌는 것을 확인할 수 있다.

```jsx
const Button = styled.button`
  background-color: ${(props) => (props.primary ? "palevioletred" : "white")};
  color: ${(props) => (props.primary ? "white" : "palevioletred")};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

render(
  <div>
    <Button>Normal</Button>
    <Button primary>Primary</Button>
  </div>
);
```

### 스타일 확장하기

컴포넌트를 사용하고 싶지만 어떨 때는 스타일을 조금 바꾸고 싶을 때가 자주 있다. 함수를 전달함으로써 props에 기반해 바꿀 수 있으며, 이때 스타일을 덮어 씌우는 데에는 큰 공수가 들지 않는다.

새로운 컴포넌트에 스타일을 상속시키기 위해서는 `styled()` 생성자로 감싸면 된다. 다음의 예시는 지난 섹션의 버튼을 확장해, 컬러와 관련된 스타일만 바꾼 예시이다.

```jsx
const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
`;

render(
  <div>
    <Button>Normal Button</Button>
    <TomatoButton>Tomato Button</TomatoButton>
  </div>
);
```

`TomatoButton` 컴포넌트는 새로 추가한 두 줄의 선언만 다르고 `Button`의 속성을 그대로 가져온다.

때로는 스타일이 지정된 구성요소가 렌더링하는 태그나 컴포넌트를 변경해야 할 수 있다. 이러한 예시는 내비게이션 바에 `<a>` 태그와 `<button>` 태그가 섞여있지만 동일한 스타일을 가져야 할 때 흔하다.

이럴 때를 대비해 styled-components는 탈출구를 만들어 두었다. `as` 라는 다형성 prop을 사용해 스타일을 적용받는 요소를 동적으로 바꿀 수 있다.

```jsx
const Button = styled.button`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
`;

render(
  <div>
    <Button>Normal Button</Button>
    <Button as="a" href="#">
      Link with Button styles
    </Button>
    <TomatoButton as="a" href="#">
      Link with Tomato Button styles
    </TomatoButton>
  </div>
);
```

html 태그 뿐 아니라 직접 만든 컴포넌트에도 동작한다.

```jsx
const Button = styled.button`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const ReversedButton = (props) => (
  <Button {...props} children={props.children.split("").reverse()} />
);

render(
  <div>
    <Button>Normal Button</Button>
    <Button as={ReversedButton}>Custom Button with Normal Button styles</Button>
  </div>
);
```

### 아무 컴포넌트나 스타일링하기

`className` prop을 DOM 요소에 전달하기만 한다면, `styled` 메서드는 직접 만들었거나, 서드 파티에서 제공하는 컴포넌트에 모두 동작한다.

```jsx
const Link = ({ className, children }) => (
  <a className={className}>{children}</a>
);

const StyledLink = styled(Link)`
  color: palevioletred;
  font-weight: bold;
`;

render(
  <div>
    <Link>Unstyled, boring Link</Link>
    <StyledLink>Styled, exciting Link</StyledLink>
  </div>
);
```

### props 전달하기

스타일이 지정된 대상이 `div`와 같은 단순 요소인 경우, styled-components는 알려진 HTML 속성만을 DOM에 전달한다. 만일 커스텀 리액트 컴포넌트일 경우, styled-components는 모든 prop를 통해 전달한다.

다음의 예시는 Input의 모든 props가 DOM 노드가 마운팅 될 때 어떻게 전달되는지 보여준다.

```jsx
const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: ${(props) => props.inputColor || "palevioletred"};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

render(
  <div>
    <Input defaultValue="@probablyup" type="text" />
    <Input defaultValue="@geelen" type="text" inputColor="rebeccapurple" />
  </div>
);
```

`inputColor` prop은 DOM에 전달되지 않지만, `type`과 `defaultValue`는 전달 되는 것에 주목하라. styled-components는 표준적이지 않은 속성들을 자동으로 필터링한다.

## CSS로부터

### 어떻게 styled-components는 컴포넌트와 함께 동작하는가?

만일 CSSModules 등으로 컴포넌트에 CSS를 임포트하는데 친숙하다면, 다음 예시와 같은 코드를 작성하곤 했을 것이다.

```jsx
import React, { useState } from "react";
import styles from "./styles.css";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((count) => count + 1);
  };

  const decrement = () => {
    setCount((count) => count - 1);
  };

  return (
    <div className={styles.counter}>
      <p className={styles.paragraph}>{count}</p>
      <button className={styles.button} onClick={increment}>
        +
      </button>
      <button className={styles.button} onClick={decrement}>
        -
      </button>
    </div>
  );
};

export default Counter;
```

styled-components는 요소와 스타일 선언의 결합이므로, 위의 예시를 다음과 같이 작성할 것이다:

```jsx
import React, { useState } from "react";
import styled from "styled-components";

const StyledCounter = styled.div`
  // 스타일 선언
`;
const Paragraph = styled.p`
  // 스타일 선언
`;
const Button = styled.button`
  // 스타일 선언
`;

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((count) => count + 1);
  };

  const decrement = () => {
    setCount((count) => count - 1);
  };

  return (
    <StyledCounter>
      <Paragraph>{count}</Paragraph>
      <Button onClick={increment}>+</Button>
      <Button onClick={decrement}>-</Button>
    </StyledCounter>
  );
};

export default Counter;
```

`StyledCounter` 컴포넌트에 `Styled`라는 접두사를 붙여줌으로써, 리액트 컴포넌트 `Counter`와 스타일링된 컴포넌트인 `StyledCounter`는 충돌하지 않으면서도 개발자 도구 및 웹 검사기가 쉽게 다른 요소임을 알 수 있게 해준다는 점을 주목하라.
