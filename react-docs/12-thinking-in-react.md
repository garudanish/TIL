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

앱에서 최소한으로 필요한 state가 무엇인지 찾아 낸 다음 단계는 어떤 컴포넌트가 state를 변경하거나 소유할 지를 찾는 것이다.
