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
