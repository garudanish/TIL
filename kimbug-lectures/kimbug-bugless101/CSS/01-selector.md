# 선택자

> 김버그의 HTML&CSS는 재밌다

## 요소 선택자 Type Selector

HTML 태그 자체를 직접적으로 지칭한다. `p`, `div`, `blockquote` 등.

## 클래스 선택자 Class Selector

HTML 요소에 `class`라는 속성을 만들고 값을 붙인다. 그 값이 클래스가 된다. CSS에서는 `.`을 붙여 지칭한다. 여러 개의 요소에 동일한 스타일을 적용하고 싶을 때 사용하며, 따라서 굉장히 효율적이다.

한 개의 요소는 여러 개의 클래스를 가질 수 있으며, `class="box-0 box-1 box-2"`와 같이 띄어쓰기로 구분한다. 이를 CSS에서 `.box-0` 만으로 선택해도 해당 요소를 지칭할 수 있지만, `.box-0.box-1` 식으로 띄어쓰기 없이 두 속성을 연달아 작성하면 두 속성을 **모두** 갖고 있는 요소를 지칭하게 되어, 더 정확하게 선택할 수 있다.

## 아이디 선택자 ID Selector

HTML 요소에 `id`라는 속성을 만들고 값을 붙인다. 하나의 요소에 붙인 id 값은 다른 요소에 중복하여 사용하면 안 된다. CSS에선 `#`을 붙여 지칭한다.

## 자식 선택자 Child Combinator

```css
parent > child {
  color: blue;
}
```

상위 요소가 직접적으로 감싸고 있는 요소만 선택할 수 있다.

## 자손 선택자 Descendant Combinator

```css
parent descendants {
  color: blue;
}
```

자식 요소를 포함해, 자식 요소의 자식 요소까지 포함해 선택할 수 있다.

## 형제 선택자 Sibling Combinators

```css
li.active ~ li {
  color: blue;
}

li.active + li {
  color: red;
}
```

`li.active ~ li`는 `acitve` 속성을 가진 `li` **다음**부터 형제인 `li` 태그들을 **모두** 선택한다. `li.active`는 선택되지 않는다.

`li.active + li`는 `active` 속성을 가진 `li` 태그의 바로 다음 형제 `li` 요소 하나만 선택한다. `li.active`는 선택되지 않는다.

## 구조적 가상 클래스 선택자 Structural Pseudo-classes

가상 클래스는 어떤 상태나 조건을 만족했을 때 사용할 수 있는 클래스이다.

```css
li:first-child {
  color: blue;
}

li:last-child {
  color: yellow;
}

li:nth-child(3) {
  color: red;
}
```

`:first-child`, `:last-child`는 요소의 변동과 상관 없이 처음과 마지막 요소를 선택할 수 있다.

`:nth-child(n)`은 `n`번 째 요소를 지칭한다. 숫자를 기입할 수도 있지만 `2n`이나 `2n-1`을 기입해서 짝수, 홀수번 째 요소들에만 스타일을 적용할 수도 있다.

## 동적 가상 클래스 선택자 User Action Pseudo-classes

유저의 액션에 따라 상태 변화가 일어났을 때 사용하는 선택자.

```css
a:hover {
  background-color: pink;
}

a:active {
  background-color: hotpink;
}

input:focus {
}
```

`:hover`는 해당 요소에 마우스를 올렸을 때, `:active`는 해당 요소를 눌렀을 때 작동한다.

`:focus`는 해당 요소에 포커스되었을 때(e.g., `input` 요소가 클릭되어 유저가 `input` 요소에 작성할 수 있는 상태일 때 등) 작동한다.

`:active`는 `:focus`에 비해 누르는 **찰나**라고 생각하면 된다.

## 선택자의 우선순위

우선순위가 같다면 나중에 선언된 스타일이 이전의 스타일을 덮어쓴다.

하나의 요소를 여러번 스타일을 지정할 때, 스타일의 우선순위는 다음과 같다.

1. ID 선택자
2. 클래스 선택자, 가상 클래스 선택자
3. 요소 선택자

```CSS
#gnb.tab-nav {
  color: blue;
}

.tab-nav {
  color: red;
}

/* <nav id="gnb" class="tab-nav"> 의 색은 blue */
```

클래스 선택자를 이용한 스타일이 ID 선택자를 이용한 스타일 뒤에 있더라도 ID 선택자에 우선순위가 적용되어 ID 선택자를 이용한 스타일이 적용된다.

### 우선순위가 적용되지 않는 것

1. 인라인 스타일 Inline Style

   HTML 파일 안에 `style` 속성을 사용해 작성한 것은 `!important`를 제외한 다른 모든 CSS 스타일보다 앞서 적용된다.

2. `!important`

   ```CSS
   p {
     color: red !important
   }
   ```

   CSS 속성에 `!important`을 적용하면 인라인 스타일을 이기고 무조건 우선순위로 적용된다. 다른 스타일을 모두 무시하고 적용되기 때문에 정말 필요할 때가 아니면 사용하지 않는 것이 좋다.
