# 태그(2): `<Form>`
> 김버그의 HTML&CSS는 재밌다

## 폼 Form
`<form action="" method="">`
`<form>` 태그는 사용자로부터 인풋을 받기 위해 사용하는 태그이다. `action="API 주소"`, `method="GET|POST"` 속성은 함께 작성되어야 한다.
- `action="API 주소"`
  - `form`의 자료를 처리할 url, API 주소를 적는다.
  - API 경로는 백엔드 개발자가 알려줄 것이다...?
- `method="GET|POST"`
  - 중요한 정보가 있거나, 정보의 양이 많을 때는 `POST`, 그렇지 않다면 `GET`이라고 일단 가볍게 생각하면 된다.

## 인풋 Input
`<input type="text" />`
입력창을 나타내는 태그이다. `type` 속성을 반드시 작성하여야 한다.
### `<input>` 태그에 사용할 수 있는 속성
- `placeholder=""`: 아무런 값도 입력되지 않았을 때 설정할 기본 문구.
- `minlength=""`, `maxlength=""`: input 창에 작성할 수 있는 문자열의 최소, 최대 길이.
- `required`: 반드시 입력해야 하는 필드로 설정할 수 있다.
- `disabled`: 필드를 사용하지 못하도록 할 수 있다.
- `value`: 필드를 미리 채워놓을 수 있다.
### `<input>`의 다양한 `<type>`
- `email`: 이메일의 형태가 아니면, 즉 @을 작성하지 않으면 form이 작동하지 않는다. 서버에 데이터가 보내지기 전 이메일의 형식이 맞는지 미리 유효성 검사를 하는 셈이다.
- `password`: 입력한 비밀번호가 보이지 않는다.
- `url`
- `tel`: 전화번호를 입력할 수 있다. 이때, [`pattern` 속성](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-pattern)을 사용하여 정규표현식에 맞게 유효성 검사를 진행할 수 있다. 
- `number`: 숫자 외의 문자를 입력할 수 없다.
  - `min`과 `max` 속성을 통해 입력값의 범위를 설정할 수 있다.
- `file`: 파일 첨부를 할 수 있다.
  - `accept` 속성을 통해 첨부할 파일의 확장자를 제한할 수 있다.
  - `accept=".png, .jpg"`, `accept="image/*, audio/*, video/*"` 등.

## 라벨 Label
`<label for="">`
라벨은 특정 케이스 빼고는 부가적인 태그여서 반드시 사용하지 않아도 괜찮다. 폼 양식중 특정 `<input>` 태그에 이름, 라벨을 붙여준다.
특정 태그에 다는 것이므로, `for` 속성이 필수이다. 속성의 값으론 `input`의 id 값을 똑같이 작성한다. 이때, `#`을 적지 않는 것에 유의한다.

## Radio & Checkbox
`<input type="radio" name="" value="">`
`<input type="checkbox" name="" value="">`
라디오 버튼은 여러 가지 항목 중에 하나만 선택할 수 있고, 체크박스 버튼은 여러 가지 항목 중 다수를 선택할 수 있다.
두 가지 모두 `name`과 `value` 속성을 반드시 작성하여야 한다.
- `name`: 버튼들을 한 개의 그룹으로 묶기 위해 필요한 속성. `name` 속성이 같은 버튼들은 하나의 그룹으로 묶인다. `radio`의 경우, `name`이 같은 선택지 중 하나만 선택이 가능하다.
- `value`: 서버에 전달할 때 선택지를 구분하여 알려주기 위한 속성. 서버에는 `name=value`의 형태로 전달되게 된다.

각 선택지는 `<label>` 태그를 통해 이름붙일 수 있다.

## Select & Option
`<select>`
풀다운 메뉴를 만들기 위한 태그. 풀다운 메뉴의 리스트에는 `<option>` 태그만을 사용할 수 있다.
`<select>`는 `name` 속성이 필수이고, `<option>`는 `value` 속성이 필수이다.
라디오나 체크박스와는 달리, `<option>` 태그들은 모두 `<select>`의 자식 요소이므로, `name` 속성은 `<select>` 태그에만 작성한다.
- `multiple` 속성을 통해 여러가지를 선택하게 할 수 있다.

## Textarea
`<textarea>`
여러 줄에 걸쳐 텍스트 입력을 받을 수 있는 태그. 세로 길이는 `rows` 속성으로, 가로 길이는 `cols` 속성으로 지정 가능하지만, CSS로도 조정 가능하다.

## Button
`<button type="">`
버튼을 만들기 위해 사용하는 태그. `type` 속성을 반드시 함께 작성하여야 한다. `type` 속성은 `button`, `submit`, `reset` 세 가지가 있다.
- `button`: 특정 목적 없이 버튼을 만들 때 사용한다.
- `submit`: form을 제출하는 용도일 경우 사용한다.
- `reset`: 작성한 form을 다시 새로 작성할 용도일 경우 사용한다.