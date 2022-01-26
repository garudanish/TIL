# Float

> 김버그의 HTML&CSS는 재밌다

## float를 쓰는 이유

`block`은 다른 요소들을 '길막'하는 성격이 있어 가로배치하기가 힘든데 이때 `float` 속성을 사용한다.

## float를 사용하면 어떤 일이 일어나는가

1. '집 나간 자식' 취급

   `float`는 그 단어의 뜻대로 그 요소를 '띄운다'. 즉, 한 요소에 float 속성을 주면 부모 요소는 그 요소가 있던 자리를 빈 공간으로 인식한다.

   부모 요소의 `height`는 자식 요소의 `height`의 합과 같으므로, `float`된 요소의 `height` 요소는 부모 요소의 `height`의 계산에서 빠지게 된다.

2. `block`으로 신분 상승

   `float`를 먹인 요소는 `display`의 값이 `inline`이든 `inline-block`이든 `block`으로 바뀐다. 즉, `width`, `height`. `margin-top` 등 사용하지 못했던 프로퍼티를 사용할 수 있다.

3. '길막'하지 못하는 `block`

   `float` 속성이 적용된 요소는 `display: block;`이 자동으로 적용되지만, `width`값을 지정하지 않았을 때 부모 요소의 100%를 따라가지 않고 컨텐츠의 길이만큼 차지한다.

   `width` 값이 지정된 경우라면 기존처럼 우측의 공간이 자동으로 `margin`으로 채워지지 않는다.

4. `inline` 요소만 `float` 요소를 인식할 수 있다

   `inline` 요소는 `float` 요소를 피해서 배치된다. 자식 요소가 모두 `float` 속성을 가진다면 그 요소를 가진 부모 요소는 `height`가 `0`이 된다는 점과 함께 쓰이면 레이아웃이 쉽게 망가지게 된다.

## float로 발생한 레이아웃 오류 수정하기

### 1. 쉬운 방법

부모 요소에 `overflow: hidden;` 사용. 이 속성을 사용하면 `float` 속성을 사용하는 자식 요소를 인식하게 된다.

### 2. 어려운 방법: Clearfix

`clear` 속성은 오로지 `float` 속성 사용으로 인해 망가진 레이아웃을 fix하기 위해 존재하는 속성이다. `float` 다음의 형제 요소에 `clear: left | right | both` 속성을 부여한다. 각각 `float: left | right` 속성을 가진 속성을 인식하게 되며, `both`는 두 속성 모두 인식한다. `clear` 속성은 `display: block` 요소에만 사용 가능하다.

모든 요소가 `float` 속성을 가진다면 CSS를 이용해 가상 요소를 사용할 수 있다. 가상 요소는 각 요소 당 두개씩 만들 수 있다. `요소::before`, `요소::after`.

가상 요소를 만들 때는 반드시 `content` 속성을 작성해야 한다.

```css
.parent::after {
  content: "";
  display: block;
  clear: both;
}
```
