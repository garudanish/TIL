# Transition

> 김버그의 HTML&CSS는 재밌다

요소의 스타일링에 변화를 줄 때 자연스럽게 바뀌도록 하기 위해 설정하는 것이 transition이다.

## property

변화가 일어날 CSS 속성을 가장 먼저 표시한다. 모든 프로퍼티에 적용하고 싶다면 `all`을 입력할 수 있으며, 각각의 프로퍼티마다 다르게 적용하고자 한다면 `,`로 구분할 수 있다.

## duration

변화가 일어날 얼마 간 지속될 지 시간을 작성한다. 단위로 `ms`, `s`를 사용한다.

## timing-function

변화의 속도를 지정한다. 생략 가능하다. `ease-in`, `ease-out`, `ease-in-out`, `cubic-bezier()` 등을 값으로 가질 수 있다. [cubic-bezier.com](https://cubic-bezier.com)에서 원하는 수치로 조정해 값을 얻을 수 있다.

## delay

변화를 지연시킬 시간을 작성한다. 단위로 `ms`, `s`를 사용한다.

```css
.box {
  display: flex;
  justify-content: center;
  align-content: center;
  width: 300px;
  height: 300px;
  font-size: 20px;
  color: #fff;
  background-color: black;
  transition: font-size 1s ease-in, background-color 2s ease-out 1000ms;
}

.box:hover {
  font-size: 50px;
  background-color: orangered;
}
```
