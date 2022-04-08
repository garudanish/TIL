# React로 사고하기

## 목업으로 시작하기

![목업 이미지](https://ko.reactjs.org/static/1071fbcc9eed01fddc115b41e193ec11/d4770/thinking-in-react-mock.png)

```JSON
[
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];
```

위와 같은 JSON API와 목업을 받았다고 가정하자.

### 1단계: UI를 컴포넌트 계층 구조로 나누기

첫 단계는 모든 컴포넌트(와 하위 컴포넌트)에 박스를 그리고 각각에 이름을 붙이는 것이다.

컴포넌트가 되는 것의 기준은 함수나 객체를 만드는 기준과 비슷하다. "단일 책임 원칙"을 생각하며 만드는 것이 좋다. 단일 책임 원칙이란 하나의 컴포넌트는 한 가지 일을 하는 게 이상적이라는 원칙이다. 하나의 컴포넌트가 너무 커지게 된다면 보다 작은 하위 컴포넌트로 분리돼 쪼개져야 한다.

주로 JSON 데이터를 유저에게 보여주기 때문에, 데이터 모델이 적절하다면 UI가 잘 연결될 것이다. 이는 UI와 데이터 모델이 같은 정보구조(information architecture)를 가지는 경향이 있기 때문이다. 각 컴포넌트가 데이터 모델의 한 조각을 나타내도록 분리한다.

![컴포넌트 계층으로 나눈 목업](https://ko.reactjs.org/static/9381f09e609723a8bb6e4ba1a7713b46/90cbd/thinking-in-react-components.png)

1. `FilterableProductTable`(노란색): 예시 전체를 포괄한다.
2. `SearchBar`(파란색): 모든 유저의 입력(user input)을 받는다.
3. `ProductTable`(연두색): 유저의 입력(user input)을 기반으로 데이터 콜렉션(data collection)을 필터링해서 보여준다.
4. `ProductCategoryRow`(하늘색): 각 카테고리(category)의 헤더를 보여준다.
5. `ProductRow`(빨간색): 각각의 제품(product)에 해당하는 행을 보여준다.

`ProductTable`(연두색)을 보면 Name과 Price 레이블을 포함한 테이블 헤더만을 가진 컴포넌트는 없다. 이 같은 경우, 뎅이터를 위한 독립된 컴포넌트를 생성할지 말지는 선택이다. 이 예시에서는 `ProductTable`의 책임인 데이터 콜렉션이 렌더링의 일부이기 때문에 `ProductTable`을 남겨두었지만, 헤더가 복잡해지면 `ProductTableHeader` 컴포넌트를 만드는 것이 더 합리적일 것이다.

컴포넌트들을 계층 구조로 나열하면 다음과 같다. 모형의 다른 컴포넌트 내부에 나타나는 컴포넌트는 계층 구조의 자식으로 나타낸다.

- `FilterableProductTable`
  - `SearchBar`
  - `ProductTable`
    - `ProductCategoryRow`
    - `ProductRow`

### 2단계: React로 정적인 버전 반들기

앱을 구현하는 가장 쉬운 방법은 데이터 모델을 가지고, UI를 렌더링은 되지만 아무 동작도 없는 버전을 만들어보는 것이다. 정적 버전은 생각은 적게, 타이핑은 많이 필요하고, 상호작용을 만드는 것은 생각은 많이, 타이핑은 적게 필요하다.

앱의 정적 버전을 만들기 위해 다른 컴포넌트를 재사용하는 컴포넌트를 만들고, props를 이용해 데이터를 전달한다. **정적 버전을 만드는 단계에선 state를 사용하지 않는다**. state는 오직 상호작용을 위해서만, 즉 시간이 지남에 따라 데이터가 바뀌는 것에만 사용한다. 앱의 정적 버전에서는 필요하지 않다.

앱을 만들 때 탑다운, 바텀업 두 가지 방식 모두 가능하다. 간단한 예시에서는 하향식으로 만드는 게 쉽지만, 프로젝트가 커지면 상향식으로 만들고 테스트를 작성하면서 개발하는 것이 더 쉽다.

이 단계가 끝나면 데이터 렌더링을 위해 만들어진, 재사용 가능한 컴포넌트들의 라이브러리를 가지게 된다. 현재 단계에선 정적 버전이기에 `render()` 메서드만 가지고 있을 것이다. 계층 구조의 최상단 컴포넌트(`FilterableProductTable`)는 prop으로 데이터 모델을 받는다. 데이터 모델이 변경되면 `ReactDOM.render()`를 다시 호출해서 UI가 업데이트 된다. React의 단방향 데이터 흐름(one-way data flow)은 모든 것을 모듈화하고 빠르게 만들어준다.

### 3단계: UI state에 대한 최소한의(하지만 완전한) 표현 찾아내기

UI를 상호작용하게 만들려면 기반 데이터 모델을 변경할 수 있는 방법이 있어야 하며, React는 이를 state를 통해 변경한다.

앱을 올바르게 만들기 위해서는 앱에서 필요로 하는 변경 가능한 state의 최소 집합을 생각해보아야 한다. **핵심은 중복배제** 원칙이다. 앱이 필요로 하는 가장 최소한의 state를 찾고, 이를 통해 나머지 모든 것들이 필요에 따라 그때그때 계산되도록 만든다. TODO리스트를 만드는 예시라면, TODO 아이템을 저장하는 배열만을 state로 유지하고, 아이템의 개수를 나타내는 state는 만들지 않는다. 만일 개수를 렌더링해야 한다면 TODO 아이템을 저장해둔 배열의 길이를 가져오면 된다.

각 데이터에 아래의 세 질문을 통해 어떤 것이 state가 되어야 하는지 결정할 수 있다.

1. 부모로부터 props를 통해 전달되는가? 그렇다면 state가 아니다.
2. 시간이 지나도 변하지 않는가? 그렇다면 state가 아니다.
3. 컴포넌트 안의 다른 state나 props를 가지고 계산 가능한가? 그렇다면 state가 아니다.

우리가 만들어야 할 예제에서 **제품의 원본 목록**은 props로 전달되므로 state가 아니다. **유저가 입력한 검색어**, **체크박스의 체크 여부**는 시간이 지남에 따라 변하기도 하면서 다른 state로부터 계산되는 것이 아니므로 state로 볼 수 있다. **필터링된 제품들의 목록**은 앞의 세 가지를 조합해서 계산해낼 수 있으므로 state가 아니다.

따라서, 예제 애플리케이션은 1) 유저가 입력한 검색어, 2) 체크박스의 값 두 가지를 state로 갖는다.

### 4단계: state가 어디에 있어야 할 지 찾기

앱에서 최소한으로 필요한 state가 무엇인지 찾아 낸 다음 단계는 어떤 컴포넌트가 state를 변경하거나 소유할 지를 찾는 것이다. **React는 항상 컴포넌트 계층구조를 따라 아래로 내려가는 단방향 데이터 흐름을 따른다.** 다음 과정을 따라 결정하면 된다.

애플리케이션이 가지는 각각의 state에 대해서

- state를 기반으로 렌더링하는 모든 컴포넌트를 찾는다.
- 공통 소유 컴포넌트(common owner component)를 찾는다. (계층 구조 내에서 특정 state가 있어야 하는 모든 컴포넌트들의 상위에 있는 하나의 컴포넌트)
- 공통 혹은 더 상위의 컴포넌트가 state를 가져야 한다.
- state를 소유할 적절한 컴포넌트를 찾지 못했다면, state를 소유하는 컴포넌트를 하나 만들어서 공통 오너 컴포넌트의 상위 계층에 추가한다.

이를 예제 애플리케이션에 적용하면 다음과 같다.

- `ProductTable`은 state에 기반해 상품 리스트를 필터링해야 하고, `SearchBar`는 검색어와 체크박스 스테이트를 출력해야 한다.
- 공통 소유 컴포넌트는 `FilterProductTable`이다.
- 검색어와 체크박스의 체크 여부가 `FilterableProductTable`에 위치하는 것이 의미상으로도 타당하다.

state를 `FilterablProductTable`에 두기로 하자. 먼저 인스턴스 속성인 `this.state = {filterText: "", isStockOnly: false}`를 `FilterableProductTable`의 `constructor`에 추가해 애플리케이션의 초기 상태를 반영한다. 그 후 `filterText`와 `isStockOnly`를 `ProductTable`과 `SearchBar`에 prop으로 전달한다. 마지막으로 이 props를 사용해 `ProductTable`의 행을 정렬하고 `SearchBar`의 폼 필드 값을 설정한다.

### 5단계: 역방향 데이터 흐름 추가하기

지금까지는 계층 구조 아래로 흐르는 props와 state의 함수로 앱을 만들었다. 이 단계에선 다른 방향의 데이터 흐름, 즉 계층 구조의 하단에 있는 폼 컴포넌트에서 `FilterableProductTable`의 state를 업데이트할 수 있도록 만들어야 한다.

React는 전통적인 양방향 데이터 바인딩과 비교하면 더 많은 타이핑을 필요로 한다. 하지만, 데이터 흐름을 명시적으로 보이게 만들어서 프로그램이 어떻게 동작하는지 파악할 수 있게 도와준다.

사용자가 폼을 변경할 때마다 사용자의 입력을 반영할 수 있도록 state를 업데이트해야 한다. 컴포넌트는 그 자신의 state만을 변경할 수 있기 때문에, `FilterableProductTable`은 `SearchBar`에 콜백을 넘겨서 state가 업데이트되어야 할 때마다 호출되도록 한다. input에 onChange 이벤트를 사용해 알림을 받을 수 있다. `FilterableProductTable`에서 존달된 콜백은 `setState()`를 호출하고 앱이 업데이트 된다.
