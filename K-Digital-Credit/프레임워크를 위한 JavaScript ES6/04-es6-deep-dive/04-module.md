# 모듈

> 프레임워크를 위한 JavaScript ES6

자바스크립트 파일 간에 주고받을 수 있는 코드 단위를 **모듈**이라고 한다. 즉, 재사용 가능한 코드 단위이자 파일 간에 주고받을 수 있는 코드 단위가 모듈이다.

모듈은 함수, 클래스, 배열, 객체, 상수 등이 될 수 있다.

모듈로 작업하는 원리는 두 가지이다.

1. 내보낸 녀석은 모듈이다.
2. 내보낸 녀석은 다른 파일에서 갖다 쓸 수 있다.
   1. 내보내지 않은 코드는 갖다 쓸 수 없다.

내보내는 것은 `export`, 가져 오는 것은 `import`라고 한다.

## `export`의 기본 사용

```js
// 함수를 정의한 후에 export
sayHello = (name) => console.log(`내 이름은 ${name}이야`)
export sayHello;

// 함수를 정의하면서 export
export getMajor = (major) => console.log(`내 전공은 ${major}야`)

// 상수 export
export const NAME = `김구름`;

// 배열 export
export let oddNumbers = [1, 3, 5, 7, 9];

// 클래스 export
export class Student {
  constructor(name) {
    this.name = name;
  }
}
```

### `export default`

만일 `export default`를 이용해 내보낸다면 이 파일에서 이 모듈 하나만 내보낸다는 의미이다. 파일 전체에서 내보낼 모듈이 하나 뿐이라면 `export default`로 내보내는 것을 권장한다.

### `export as`

내보낼 모듈의 이름을 `export 모듈 as 임의이름`으로 지정해 내보낼 수 있다.

```js
sayHello = (name) => console.log(`내 이름은 ${name}이야`)
export default sayHello as myName;
```

여러 모듈을 다른 이름으로 보낼 때는 다음과 같이 작성한다:

```js
export { sayHello as sayHi, sayBye as goodbye };
```

## `import`

다른 파일에서 내보낸 모듈을 가져올 때는 `import`를 사용한다.

```js
import { 모듈 } from "모듈을_내보낸_파일";

import { sayHello } from "./greeting.js";
```

여러 모듈을 가져올 때는 `,`를 사용하며, 모듈을 다른 이름으로 사용할 때는 `import as`를 사용한다.

```js
import {sayHello, sayGoodBye} form "./greeting.js"

import {sayHello as hihi, sayBye as goodbye} from "./greetings.js"
```
