# Animation

> 김버그의 HTML&CSS는 재밌다

Transition은 요소의 CSS 속성의 값이 변할 때 부드럽게 바꾸는 것이고, Animation은 그와 별개로 애니메이션을 주고 싶을 때 사용할 수 있어서 훨씬 더 자유롭다.

## `animation-name`

`@keyframes`을 사용해서 어떤 애니메이션을 줄 건지 정의해야 한다. `@keyframes` 이후에 적히는 이름이 애니메이션의 이름이 되며, 블록 이후에 작성한 것이 애니메이션의 내용이 된다.

```css
@keyframes name {
  from {
    /* Rules */
  }

  to {
    /* Rules */
  }
}
```

```css
@keyframes name {
  0% {
    /* Rules */
  }

  50% {
    /* Rules */
  }

  100% {
    /* Rules */
  }
}
```

위 두 가지 방식으로 애니메이션을 지정할 수 있다.

## `animation-duration`

애니메이션의 지속 시간. `ms`, `s` 단위를 값으로 사용할 수 있다.

## `animation-timing-function`

애니메이션의 속도를 제어하는 속성. `ease-in`, `ease-out`, `ease-in-out`, `cubic-bezier()` 등을 값으로 사용할 수 있다.

## `animation-delay`

애니메이션이 시작하기까지의 지연 시간. `ms`, `s` 단위를 값으로 사용할 수 있다.

## `animation-iteration-count`

애니메이션을 몇 번 반복할 것인지 설정하는 속성. `3`을 값으로 설정하면 총 3번 반복하며, `infinite`을 값으로 설정하면 무한 반복한다.

## `animation-direction`

애니메이션의 진행 방향을 설정하는 속성. `reverse`를 값으로 설정하면 애니메이션이 반대로 진행되며, `alternative`를 값으로 설정하면 애니메이션이 `from`-`to`-`from`-`to`... 식으로 진행된다.
