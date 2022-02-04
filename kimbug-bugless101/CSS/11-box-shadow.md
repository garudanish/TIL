# Box Shadow

> 김버그의 HTML&CSS는 재밌다

상자에 그림자를 부여하는 속성이다. 어떻게 사용하냐에 따라 천차만별의 느낌을 줄 수 있다. 굉장히 복잡하고 규칙이 많다.

[neumorphism.io](http://neumorphism.io)에 가면 네오몰피즘 그림자를 만들 수 있는 코드를 얻을 수 있다.

`box-shadow: h-offset v-offset blur spread color`
`box-shadow: 0 10px 16px 35% 0 rgba(255, 73, 73, 0.35);`

## h-offset

그림자를 X축으로 얼마나 이동시킬지 결정하는 값. 음수면 왼쪽으로 움직이고, 양수면 오른쪽으로 움직인다.

## v-offset

그림자를 Y축으로 얼마나 이동시킬지 결정하는 값. 음수면 위로 움직이고, 양수면 아래로 움직인다.

## blur

흐린 정도를 결정하는 값. 단위로 `px`을 사용한다.

## spread

그림자의 사이즈를 결정하는 값. 단위로 `px`을 사용한다.

## color

그림자의 색상을 결정하는 값. hex, rgb, rgba 단위를 사용할 수 있다.
