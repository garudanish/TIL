## transition

`transition`: CSS 속성 값이 변할 때 값의 변화가 일정 시간에 걸쳐 일어나도록 하는 것.

### `transition-delay`

트랜지션이 발생할 때 얼마나 기다렸다가 실행할지 결정해주는 속성.
기본값은 `0s`로, 기입하지 않았을 때는 지연 없이 바로 트랜지션이 실행된다.
프로퍼티 값으로 시간이 필요하며, 단위는 `s`, `ms`를 사용한다.
프로퍼티는 음수 값이 올 수 있다. 지연 없이 실행되지만, 지정한 음수 값의 절대값 시간만큼 건너 뛰고 시작한다.

### `transition-duration`

트랜지션이 발생하는 지속 시간을 지정하는 속성.
기본값은 `0s`로, 기입하지 않았을 때는 지속 시간 없이 바로 트랜지션이 실행된다.
프로퍼티 값으로 시간이 필요하며, 단위는 `s`, `ms`를 사용한다.

### `transition-property`

트랜지션 효과를 지정할 프로퍼티를 지정하는 속성.
`transition-property: width, height;`처럼 변화를 줄 특정 속성만 선택할 수도 있고,
`transition-property: all;`처럼 모두 변화를 주도록 할 수도 있다.
`transition-property: none;`을 지정하면 다른 트랜지션 선언을 무시한다.

### `transition-timing-function`

트랜지션의 진행 속도를 설정하는 프로퍼티. IE 10부터 사용 가능하다.
대부분의 `timing-function`은 cubic bezier를 사용한다. cubic bezier 곡선은 4개의 컨트롤 포인트를 사용해 트랜지션의 시작과 끝까지의 효과를 제어한다.

- `initial`: 속성 기본값 적용
- `inherit`: 부모의 영향을 받아 적용
- `ease`: 기본 값으로 시작해 점차 빨라지고, 종료될 때까지 점차 느려짐.
- `linear`: 처음부터 끝가지 일정 속도로 진행
- `ease-in`: 천천히 시작
- `ease-out`: 천천히 종결
- `ease-in-out`: 천천히 시작하여 천천히 종결
- `step-start`: 시작하는 시점에 스텝을 끊음
- `step-end`: 끝나는 시점에 스텝을 끊음
- `steps(int, start|end)`: `int` 자리에 정수를 넣고 `start` 혹은 `end`를 선택. 삽입한 정수만큼 시작 혹은 끝 시점에 스텝을 끊음.
- `cubic-bezier(n, n, n, n)`: bezier 곡선에 원하는 컨트롤 포인트를 직접 삽입

### `transition`

`transition: transition-property transition-duration transition-timing-function transition-delay;`의 형태로 한 번에 적용할 수 있다.

## transform

`transform`: 대상을 여러 형태로 변형할 때 사용하는 프로퍼티.
`trnasition`과 함께 사용하면 엄청난 효과를 낼 수 있다.

### `scale`

형태의 크기를 변환시킬 때 사용한다.
`width`와 `height`의 크기가 중심점을 기준으로 값만큼 늘어난다.
`scale(1)`은 100%를 뜻하기 때문에 `1` 이상의 값을 입력해야 크기가 커진다.
`scale(x, y)`처럼 인자를 두 개 넣을 수 있으며, 각각 x축, y축을 의미한다. 하나만 입력한다면 x축과 y축에 같은 값이 들어간다.

### `rotate`

객체를 회전시킬 때 사용한다.
`rotate(360deg)`은 값인 `360deg`만큼 오른쪽 방향으로 회전시킨다.
각도 값의 단위로 `deg`를 사용한다.
한 바퀴 회전을 `transform: rotate(1turn);`으로도 작성할 수 있다.

### `translate`

객체를 (x, y) 지점으로 옮길 때 사용한다.
기준점은 `scale`과 동일하게 가운데이며, 각 값이 증가할 때 x축으로는 오른쪽, y축으로는 아래쪽으로 이동한다. 만일 값이 음수라면 반대로 이동한다.
값을 하나만 입력했을 때 `scale`과 달리 x축 방향에만 값이 들어간다.

### `skew`

객체를 비틀거나 기본 형태를 왜곡하고 싶을 때 사용한다.
속성 값은 각도 값이며 `deg` 단위를 사용한다.
값으로 x축, y축 두 개의 인자를 가지며, 하나만 입력했을 땐 x축 방향에만 값이 들어간다.
객체 기준점을 기준으로 왼쪽 상단 끝점과 오른쪽 하단 끝점을 움직인다.

### `transform-origin`

> `transform`의 속성 값이 아니라 별개의 프로퍼티이다.

`transform` 되는 대상의 기준점을 변경할 때 사용한다.
기본적으로 `transform`의 기준점은 가운데지만, `transform-origin: left top;`을 설정하면 기준점이 왼쪽 위로 바뀐다.

## keyframe

어떤 변화가 일어나는 지점을 설정하고, 특정 시간 동안 지점마다 설정해 둔 프로퍼티의 값으로 변화시키고자 할 때 사용한다.

### `transition`과 `animation`의 차이

- `transition`: 요소의 상태가 변경되어야 애니메이션을 실행할 수 있다.
- `animation`: 요소의 상태 변화와 상관 없이 애니메이션을 실행할 수 있다.
  - `transition`과는 달리 `@keyframes` 속성을 이용해 프레임을 추가할 수 있으며, 원하는 컨트롤을 추가해 좀 더 역동적으로 변경할 수 있다.

### `@keyframes` 규칙

`@keyframes`는 애니메이션이 만들어지는 부분이다.
`from` 혹은 `0%` 속성에서 설정한 스타일부터 `to` 혹은 `100%` 속성에 설정한 스타일로 점차 변경하며 애니메이션이 재생된다.

```css
/* [ 0% ~ 100% 속성 ] */
@keyframes animation-name {
/* 애니메이션의 시작 프레임 */
0% {
  color: black;
}
50% {
  color: white;
}
/* 애니메이션의 종료 프레임 */
100% {
  color: red;
}
```

### `animation-name`

애니메이션을 재생하려면 반드시 이름을 정의해야 한다.
`name`은 `@keyframes` 속성에서 설정한 이름을 동일하게 사용해야 한다.

- 영문 소문자, 숫자, 문자열, 언더바(`_`), 하이픈(`-`)으로 시작해야 한다.
- 영문 대문자, 숫자, 특수문자는 사용할 수 없다. (단 파일 및 폴더 명에는 허용)
- 여러 개의 `animation-name`을 동시에 나열할 경우 `,`를 사용한다.

### `animation-duration`

애니메이션의 시작부터 종료까지의 총 지속 시간을 설정할 때 사용한다.
값은 양수로 지정해야 한다. `0` 혹은 음수로 설정하면 애니메이션이 실행되지 않는다.

### `animation-iteration-count`

애니메이션을 여러 번 실행시킬 때 사용한다.
`iteration-count` 속성은 애니메이션을 재생하는 횟수를 지정한다.

- 속성의 기본값은 `1`이다.
- 값을 `0`으로 지정하면 애니메이션이 재생되지 않는다.
- 값이 음수라면 기본 값인 `1`과 같은 결과를 출력한다.
- 값이 `1.5`와 같은 양의 유리수라면 애니메이션 재생 도중 첫 번째 프레임으로 돌아가 종료된다.
- 값이 `infinite`라면 애니메이션이 무한 반복된다.

### `animation-timing-function`

애니메이션 `@keyframes` 사이의 재생 속도를 조절할 때 사용한다.

`ease`, `linear`, `ease-in`, `ease-out`, `ease-in-out`, `cubic-bezier(n, n, n, n)` 등을 값으로 사용할 수 있다.

### `animation-direction`

애니메이션의 재생 방향을 설정할 때 사용한다.

값으로는 `normal`, `reverse`, `alternate`, `alternate-reverse`를 사용할 수 있다.

- `normal`: 기본 값. `from` - `to` 혹은 `0%` - `100%`의 방향으로 재생된다.
- `reverse`: `normal`의 역방향으로 재생된다.
- `alternate`: 순방향 - 역방향 - 순방향 ...으로 번갈아 재생된다.
- `alternate-reverse`: 역방향 - 순방향 - 역방향 ...으로 번갈아 재생된다.

### `animation-delay`

애니메이션 시작을 지연시킬 때 사용한다.
기본 값은 `0` 혹은 `now`로, 지연 없이 시작한다는 뜻이다.

- 값이 양수라면 양수 값 만큼 기다렸다 애니메이션이 진행된다.
- 값이 음수라면 지정된 시간이 지난 이후의 장면부터 **지연 없이** 애니메이션이 시작된다.

### `animation-play-state`

애니메이션 재생 여부를 설정할 때 사용한다

값이 `running`이면 애니메이션을 재생하고, `paused`일 경우 애니메이션을 정지한다.
