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
