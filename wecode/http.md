# HTTP

HTTP는 웹서비스 개발자라면 당연히 알고 있어야할 핵심 프로토콜이다. HTTP 통신은 어떻게 구성되고 사용되어야 하는지 꼭 알고 넘어가야 한다.

## 🚀 학습 목표

1. HTTP의 특징인 Stateless를 설명할 수 있다.
2. Request, Response 구조에 대해 설명할 수 있다.
3. HTTP request method의 종류를 알고 서로의 차이점을 설명할 수 있다.
4. 대표적인 Status code의 종류를 설명할 수 있다.

## 💁🏻‍♂️ 멘토 가이드

- 크게 세가지만 기억하자! 나머지는 앞으로 할 소중한 세션 _(인증/인가, 프론트엔드/백엔드 로그인 실습, RESTFUL API)_ 들과 프로젝트를 진행하며 차차 이해할 수 있습니다.

1. HTTP 는 컴퓨터 끼리의 소통을 위한 통신규약이다.
2. HTTP 통신은 Request(요청)과. Response(응답)으로 이루어 진다.
3. HTTP 통신의 stateless한 특징으로인해 매 요청과 응답은 이전 상태를 알지 못 한다.

## 통신과 HTTP

HTTP는 쉽게 말하면 **소통하는 방법**임. http는 컴퓨터끼리, 특히 웹에서 소통할 때 사용하는 방법임.

HTTP: HyperText Transfer Protocol.

- HyperText
  - HTML의 HT와 같음.
  - 웹 페이지는 페이지끼리 넘어갈 수 있음. 즉, 문서와 문서가 링크로 연결되어 있음. 이것을 하이퍼텍스트라고 함.
- Transfer
  - html로 만든 웹페이지 문서(파일)를 보낸다.
- Protocol
  - 컴퓨터끼리 어떻게 html 파일을 주고 받을 지에 대한 소통 방식 또는 약속, 규약.

**HTML 파일을 주고 받기 위한 규약**임. 초창기 목적은 전송 목적이었기 때문에 그랬음.

하지만 요즘엔 단순이 페이지 전송에만 한정해 사용하지 않음. 요즘에는 데이터 전송을 주고받는데도 사용함. 프-백 간 데이터를 주고받을 때 http 라는 규약을 지키면서 데이터를 주고받게 됨. 마치 우리가 한국어로 얘기하자고 정해놓듯.

### http의 특징

#### request-response

http는 request와 response로 이루어져있다. 단, response를 request에 앞서 보낼수는 없다. _http에게 TMI란 없다._ 클라이언트가 서버에 리퀘스트를 보내면, 서버가 클라이언트에게 리스폰스를 보내준다. 프론트엔드에서 백엔드에 리퀘스트 보내면, 백엔드가 프론트엔드에 리스폰스를 보내준다.

로그인의 예시: 서버야 나 누구인데 로그인 시켜줘(프론트엔드) -> 유저 맞네? 로그인 성공!(백엔드)

#### stateless

http에는 상태가 없다. 개발에서 상태라는 것은 "무언가를 기억하고 있다"라는 뜻이다. http의 모든 개별 통신은 모두 독립적이기 때문에, stateful하지 않고 stateless하므로 상태를 저장하지 않는다. 따라서 필요한 정보를 한꺼번에 다 담아서 보내면, 상태를 기억할 필요가 없도록 하면 된다.

로그인 요청 역시 독립적이다. "서버야 리트리버 영상 보여줘" -> "로그인 해주세요" - 로그인 - "이제 리트리버 영상 보여줘" -> "? 어케 앎 로그인 해주세요"가 돼버린다. 따라서 "서버야 나 로그인한 누구인데, 리트리버 영상 보여줘" -> "오키 보여드립니다"의 방식으로 진행되어야 한다. '로그인한 누구'를 전달하는 방식으로는 **토큰**을 주로 사용한다.

통신상에서 stateful하게 쓰는 건 많이 없다. 소켓이라는 방식도 많이 쓰이는데, 그건 req, res 방식이 ㅇㅏ니다. 창구가 항상 열려있고 클라, 서버 어느 방향에서든 먼저 보낼 수 있는 구조. 거기서는 계속 기억할 수 있을 것이다. 엄밀하게 stateful하진 않지만 비슷하다곤 할 수 있다.

## http 메세지 구조

Request 메시지는 크게 세 덩어리로 나누어진다: start line, headers, body

- Start line: 요청의 첫번째 줄
  - `POST /login HTTP/1.1`
  - 리퀘스트 메시지의 제목이라고 생각하면 된다.
  - http method, request target, http version이 담긴다.
  - method: 요청이 의도한 액션을 정의
  - request target: 요청이 전송되는 목표 url
  - http version: http의 버전.
- Headers: 요청의 메타데이터를 담고 있는 부분
  - 요청의 부가 정보(메타데이터)가 담겨 있는 곳임.
  - Key:value 형태로 이루어져 있음.
  - 필수적인 정보도 있고, 생략할 수 있는 정보들도 있다.
- Body: 요청의 실제 내용
  - 본문. 로그인 할 건데, 유저네임은 이거고, 패스워드는 이거야.
  - 요청 메서드에 따라 존재하지 않을 수도 있음.

reponse 메시지는 굉장히 비슷하게 생겼다: Status line, headers, body.

- Status line: 응답의 첫번째 줄-상태를 나타냄.
  - http version, status code, status text가 담긴다.
  - http version: http 버전
  - status code: 응답 상태 코드
    - 보통 코드로 상태를 많이 파악한다. 어느 곳에서도 http 코드를 통해 응답의 성공 여부를 알 수 있다.
  - status text: 응답의 상태를 간략히 설명하는 텍스트.
  - `HTTP/1.1 404 Not Found`
  - `HTTP/1.1 200 SUCCESS`

## http request methods

- GET
  - 데이터를 받아오기만 할 때 사용
  - 웹페이지에 접속해서 필요한 데이터를 불러올 때 사용
- POST
  - 데이터를 생성 / 수정할 때 사용
  - body에 담는 내용이 핵심임!
- DELETE
  - 서버에 저장된 특정 데이터를 삭제할 때 사용.

put, patch 등 여러 메서드들 있는데 필요할 때 찾아보면서 쓰세요!

HTTPS는 body를 암호화해서 보내기 때문에 안전하다!

사실 메서드는 절대적인 것이 아니어서 개발자들이 구현하기 나름이다. 단 표준이므로, 표준에 맞게 동작하게 하는 것이 좋겠죠? 따라서 post 메서드가 왔을 때 어떤 기능을 할지는 개발자가 정해두기 나름이다.

### status code

- success: 2--
  - 200: OK
    - 가장 자주 보게되는 status code
    - 문제 없이 요청에 대한 처리가 백엔드 서버에서 이루어지고 나서 오는 응답코드
  - 201: CREATED
    - 무언가가 잘 생성되었을 때(successfully created) 오는 코드.
    - 대개 post 메서드의 요청에 따라 백엔드 서버에 데이터가 잘 생성 도는 수정되었을 때 보내는 코드
  - 204: no content
    - 성공했지만 제공할 body가 없을 때.
    - 보통 delete로 성공적으로 삭제되었을 때 응답으로 보내느 코드.
- client error: 요청할 때 잘못했을 때. 400번대.
  - 400: bad request
    - 해당 요청이 잘못되었을 때 보내는 코드.
    - 주로 body에 뭔가를 잘못 실어보냈을 때 사용.
    - 예를 들어, 전화번호를 보내야되는데 숫자가 아닌 문자열을 보냈다든가.
  - 401: unauthorized
    - 인증되지 않았을 때.
    - 로그인 안 하고 회원만 이용할 수 있는 기능 사용하려 할 때 등.
  - 403: forbidden
    - 접근 불가능한 접근했을 경우.
    - 누군지는 알겠는데 접근 권한이 없을 경우. 401은 누군지도 모를 때 발생하는 것임.
    - 카드가 없으면 위워크에도 못들어오고(401), 카드가 있어도 9층엔 못 들어간다(403).
  - 404: not found
    - 요청한 URI가 존재하지 않을 때 보내느 코드.
- server error
  - 500: Internal Server Error
    - 예측하지 못한 오류. 에러처리 못한 에러. 이렇게 에러가 뜰 줄 전혀 몰랐는걸?

위의 모든 코드들은 표준이라서 "지켜야 하는 것"이지, "자동으로 지켜지는 것"이 아님. 모든 에러에 전부 400 때려버릴 수도 있음.
