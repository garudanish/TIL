# DevTools

> [https://developer.chrome.com/en/docs/devtools/](https://developer.chrome.com/en/docs/devtools/)

개발자들이 쓰는 도구. 프론트엔드 개발을 하면서 도움이 될만한 기능들이 모여있다.

따로 설정하는 것이 아니라, 브라우저가 제공해준다. 브라우저 제작 회사가 얼마나 잘 제작하는지에 따라서 개발자들이 편해진다. 하다보면 개발자 도구를 계속 띄워놓고 개발을 하게될 때도 있다.

- 맥: cmd option i,
- 윈도우: f12
- 마우스 우클릭 - 검사

## Elements 패널

- 웹페이지를 구성하는 요소들, html, css를 확인할 수 있는 패널.
- 확인 뿐 아니라 직접 수정, 삭제도 가능함. 코드를 직접 쓰지 않아도 엘리먼트 패널에서 수정해보면서 페이지에서 어떻게 보이는지 확인할 수 있음.
- 주로 html 구조를 변경하든가, css 적 스타일을 변경하면서 그 때 어떻게 바뀌는지 확인함. 실제 코드에는 반영되지 않음!
- 기업에서 일할 때 자잘한 수정할 때 코드를 짜면서 수정하기 보다는 엘리먼트 탭에서 수정하면서 기획자와 디자이너와 소통하는 경우 많음.
- 특히 프론트 사람들은 유념해서 보면 좋음!
- user agent stylesheet는 브라우저에서 고유하게 부여하는 스타일로, 이를 초기화하기 위해 reset css, normalize css, common css 등을 사용한다.

- 페이지와 스타일 검사 및 편집
  - select element를 사용하면 원하는 요소를 바로 선택할 수 있다.
- 스타일 수정
  - 요소에 적용된 CSS를 바로 볼 수 있고, 강제로 바꿀 수 있다.

## Console 패널

프론트엔드 개발자가 개발하면서 콘솔을 가장 많이 사용할 것임.

콘솔은 자바스크립트가 돌아가는 환경 그대로임.

자바스크립트 테스트를 계속 할 수 있음. 어떤 공부를 하다가 자바스크립트 내용이 나왔다면 VS Code가 아니라 콘솔에서 바로 확인해보고 수정할 수 있다.

shift + enter로 개행을 할 수 있다.

- `Console` 패널의 기능은?
  - The Console has 2 main uses: [viewing logged messages](https://developer.chrome.com/docs/devtools/console/#view) and [running JavaScript](https://developer.chrome.com/docs/devtools/console/#javascript).
  - 콘솔 패널은 두 가지 주요 기능이 있다: `log` 메시지 보기, 자바스크립트 실행하기.
- 화면을 새로고침 해도 `console` 내용이 지워지지 않고 남게 하는 방법은?
  - 콘솔 패널 - 설정 톱니바퀴 - 로그보존
  - 전체 환경설정 - 콘솔 섹션 - 탐색 시 로그 보존
- 콘솔에 기록된 로그를 모두 지울 때 사용하는 메소드는?
  - **콘솔 지우기** 클릭 ![Clear Console](https://wd.imgix.net/image/admin/PleTkKOHeF03hC4BxBvM.png?auto=format).
  - 메시지 우클릭 - 콘솔 지우기 선택.
  - 콘솔에서 `clear()` 입력하고 엔터 누르기.
  - 웹페이지 자바스크립트 파일에서 `console.clear()` 부르기.
  - 콘솔이 활성화되어 있는 동안 Ctrl + L / Cmd + k 누르기.
- 콘솔에서 `Warnings` , `Errors` 내용을 제외하고 보는 방법은?
  - 패널에서 level 설정을 통해 필터링 할 수 있다.
  - 콘솔 패널 바로 위에 "필터" 인풋의 오른쪽에 있다.
  - Default levels = 기본 수준, All levels = 모든 수준 으로 번역되어 있다.
- 다른 패널(ex. Elements panel)에서 Console Panel 같이 보는 방법은?
  - 다른 패널에서 `esc`를 누르면 뜬다!

## Source 패널

HTML, CSS, JS 파일은 브라우저에 다 노출돼있음. 폴더 구조, 파일 내용 전부 다. 하지만 요새는 난독화, 암호화 되어있어서 보기 어렵게 해놨음. 그래서 프론트엔드는 프라이버시에 민감하거나 중요한 정보가 들어간 것은 올리면 안됨.

디버깅할 때 source 패널에서 중단점을 설정해두면 자바스크립트를 멈추게 할 수 있음.

## Network 패널

프론트와 백엔드의 소통 창구. 프론트에서 어떤 요청을 하면 백에서 해당 요청에 대한 데이터를 전달해주는 공간. 어떤 요청이 왔는지, 어떤 응답이 갔는지 확인할 수 있음. 프로젝트 하면 여기서 에러 코드 보고 너 잘못이라고 싸움 ㅎㅎ

정말 다양한 데이터들이 들어옴. all을 선택하면 이 페이지에서 받은 데이터에서 모두 확인 가능. Fetch를 선택하면 프론트에서 요청한 것에 대한 답변을 받음. 그 외 각종 탭에 따라 여러가지 데이터들을 분류에 맞게 확인 가능.

통신할 때 문제가 생겼다 하면 콘솔과 함께 네트워크 패널을 확인하면 됨.

- request url: API 주소
- request method: GET, POST 등
- Status Code: 200(OK), 400번대(프론트에서 문제), 500번대(서버 쪽에서 문제) 등...

## Application 패널

브라우저에 설정되어있는 일종의 저장소. 보안이 취약한 편이기 때문에 민감한 개인정보는 담지 않도록 하고 있음.

![session img](https://api-media-storage.s3.amazonaws.com/session-media/e21d915901554a07a90138207d203195?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIASTLUR2MMQ5ONZX5V%2F20220401%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20220401T061250Z&X-Amz-Expires=60&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLW5vcnRoZWFzdC0yIkgwRgIhAL010ppZggI%2BrQMsZEsdUFUmdfSwV1bIrpg4vAU%2FcpWUAiEAuxgONcT8cp1Qu2dfv4Dsht9BWLqDV4mcDJ8%2B2hfcgOUqjgIIJxAEGgwxNzkwMjI0NTE0ODEiDEjA%2BtXPxQ6YQL6%2BlSrrAeQvuJKY4fIAWzhTXqJMveWUJ8z0TDpn2%2B9vIStkpUhBgau7B0YdwdnF9HBs9rzEvUtu3FnI2LFx4hg5BuRhuTUQtcpbUWExhQpsG%2Br9yPQ1KvrfNvQU8CgBR5pkw%2B1xWliB8E91vJbgx7zluJsYpXV3W9qzByWys341%2F1XWMBd8JdSNMEw52Q%2FD7kFsHoM2bvssaesEImup30MSQoWZI902mn3fcy0LJ5el5L8I1ZUdeYyhqBVrW%2B57URg66HQgLBfJVutOApBWs50iBq68qL9bA%2FysXFXXLAD3y1KMb3BGolSokuba8F8nQakw662akgY6mQH2cv%2BAi7%2Fgs%2FC%2BtyD9XDKU6trTSxSkZBg17Ijyc%2BW803RNmRrVjY1Cr2e9G9tScjxd11zp6jTRcJjLcQrP%2F%2FPhVRudIUFdzx8uM9q0iPULefhb6kyABhuAinl13IdRXUQO4%2FViulqq79P3toZsUr2JVt1m31bHamJkpVTXEADgFlCP1qjJaxdnAT5b9k5YSYhln93Aw%2F3l08g%3D&X-Amz-Signature=d88509799e975033e72d5daed38577c84b84e71b41e26265f3eb3d4b2bafbce4)

- **Storage** **:** 브라우저의 저장소
- **Local Storage** **:** 로컬스토리지의 데이터는 사용자가 지우지 않는 이상 계속 브라우저에 남아 있다. 즉, 데이터의 영구성이 보장된다. Key-Value 페어의 객체 형태로 데이터 저장.
- **Session Storage** **:** 세션 스토리지의 데이터는 윈도우나 브라우저 탭을 닫을 경우 제거된다. Key-Value 페어의 객체 형태로 데이터 저장.
- **Cookie** **:** 시간 제한 설정 가능. 쿠키는 프론트-백엔드 통신과 관련이 있음 >> 용량이 작을 수 밖에 없음. Key-Value 페어의 문자열 형태로 데이터 저장(세미콜론으로 구분). 텍스트 타입이라 문자열만 저장.
  - 일정 시간이 지나면 삭제됨.

아이디 등을 담지 말라고 하는 이유: 한 쪽에서 해당 데이터를 바로 확인할 수 있음.

그래서 토큰 방식으로, 나 인 것을 알려주지만 매번 바뀌는 고유한 값이기 때문에 개인정보를 보호할 수 있음.

- Local Storage
  - 지속적으로 필요한 데이터(**data persistant**)(ex. ID 저장, 비회원 카트)
  - UI 정보들(ex. 에어비앤비, 스카이스캐너 인천공항 - 베네치아 검색하면 그대로 유지)
- Session Storage
  - 잠깐 동안 필요한 정보
  - ex. 보안이 중요한 정보 (ex. 은행 사이트), specific한 유저 정보, 언어 선택
- Cookie
  - 서비스 직접적이지 않은 데이터
  - 오늘만 하는 이벤트 팝업, 서비스 약관에 동의했는지 등.
  - 팝업 창 "오늘 하루 안보기" 등.

> ❗️비밀번호와 같은 중요정보는 스토리지에 저장하면 위험합니다. 로컬스토리지나 세션스토리지는 클라이언트 사이드 이기 때문에 쉽게 해킹당할 수 있기 때문입니다. 사이트/서비스의 특성, 회사의 방침에 따라 user data 를 어떻게 처리 하는지 전부 다르기 때문에 서비스 특성이나 기획에 맞게 적절하게 처리합니다.

정확한 기준은 없음. 회사의 컨벤션에 맞게 진행하면 됨. 확실한 건 중요한 정보를 스토리지에 담는 것은 지양하라는 것! 어떻게 데이터들을 담고 빼서 사용하는지에 대해 공부하세용!

### Local Storage 에 특정 데이터를 저장하고 가져오는 방법

- 데이터 저장
  - `localStorage.setItem("key", "value")`
  - `sessionStorage.setItem("key", "value")`
  - `setcookie("key", "value", "지속시간 (초단위)")`
- 데이터 호출
  - `localStorage.getItem("key")`
  - `sessionStorage.getItem("key")`
  - `document.cookie`
- 기타 메소드
  - 외에도 `removeItem`, `clear` 등등의 공통 메소드 존재

## Etc

### Perfomance

사이트의 성능 확인할 때 보는 패널. 특정 비즈니스 아니면 볼 일이 자주 없음.
