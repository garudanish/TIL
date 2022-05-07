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
