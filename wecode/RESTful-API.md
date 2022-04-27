# RESTful API

## RESTful API란?

- API 시스템을 구현하기 위한 아키텍처 중에 가장 널리 사용되는 형식
  - API 시스템을 구현하기 위한 아키텍처에는 GraphQL, SOAP, GRPC, REST 등등이 있음.
- REST는 다른 아키텍처에 비해 눈에 띄는 장점들이 있음.
  - RESTful한 API를 설계하는 데 있어 비용이 적게 들음. 규약이기 때문에 서드파티 라이브러리를 사용할 필요 없음.
  - 진입장벽이 낮음.
  - graphQL은 `graphql`이라는 하나의 엔드포인트만으로 원하는 정보를 가져옴. 만일 `GET` 요청을 한다고 하면, 그 url로 뭘 원하는지만 보내면 되기에 편해보이긴 함. 하지만 아키텍처가 견고하지 못하다면 불필요하게 많은 연산을 해야할 수도 있음.
- Representational State Transfer
  - '무언가 상태를 나타내는 것을 보내준다.' REST 하다 = 요청이 가는데, 누가 봐도 자명하고 명확하게 나타낸다는 뜻임.
  - 웹상에서 사용되는 여러 리소스를 HTTP URI로 표현하고 그 리소스에 대한 행위를 HTTP Method로 정의하는 방식. '무엇'을 '어떻게 한다'를 나타내는 방식임.
  - "리소스(HTTP URI로 정의된)를 어떻게 한다(HTTP Method + Payload)"를 구조적으로 깔끔하게 표현할 수 있음.
- 장점: Self-descriptiveness, 누가봐도 자명함. 그 자체만으로도 API의 목적이 쉽게 이해된다.
- 단점: 표준 규약이 없어, 안티패턴으로 작성되는 경우가 흔하다.
  - RESTful API는 꼭 지켜야할 법이 아니고, 개발자로서 http 통신을 할 때 에러를 줄여주고 원활한 소통을 하기 위한 약속이다.

### 기본 배경 지식

- URI / HTTP Method / Payload 삼단구조로 되어있음.
  - URI: Uniform Resource Identifier. 해당 사이트의 특정 자원의 위치를 나타내는 **유일한** 주소
  - HTTP Method: HTTP Request가 의도하는 action을 정의한 것
  - Payload: HTTP request에서 server로 보내는 데이터(body).
- `GET https://10.58.4.1/products`
  - `GET`: Method
  - `https://`: Protocol
  - `10.58.4.1` : Host
  - `products`: Resouce

## RESTful API 설계 규칙

1. URI 정보를 명확하게 표현해야 한다.
   - `resource`는 명사를 사용해야 한다.
2. resource에 대한 대한 행위를 HTTP Method(GET, POST, PUT, DELETE)로 표현한다.
   - 단, URI에 HTTP Method가 포함되어서는 안 된다.
   - URI에 동사가 포함되어서는 안된다.
   - 두 가지 규칙 모두, 이미 HTTP Method에 행위가 담겨 있으므로, 불필요하게 URI를 늘리는 것이 된다. `GET delete/users/1`이 아니라, `DELETE /users/1` 을 사용하고, `GET /show/users/1` 이 아니라, `GET /users/1`을 사용한다.
3. resource 사이에 연관 관계가 있는 경우, `/리소스/고유id/관계 있는 리소스` 의 형태로 작성한다.
4. 파일의 경우 payload의 포맷을 나타내기 위한 파일 확장자를 URI에 포함시키지 않는다.
   - 웹 주소는 `.com` 등으로 끝나므로 확장자를 기입할 경우 브라우저를 혼동시킬 수 있다.
   - payload의 포맷은 headers에 accept를 사용한다.
5. URI는 `/` 구분자를 사용하여 자원의 계층 관계를 나타내는데 사용한다.
6. URI 마지막 문자로 `/`를 포함하지 않는다.
7. 불가피하게 URI가 길어지는 경우 `-`를 사용하여 가독성을 높인다.
   - `_`는 사용하지 않는다.
8. URI 경로에는 대문자 사용을 피하도록 규정하고 있다.

## Path parameter, Query parameter

Path parameter: `/숫자`에 해당하는 부분. 여러가지 데이터 중 작성한 숫자에 해당하는 아이디를 가진 데이터를 받을 수 있다.

Query parameter: `?=...` 에 해당하는 부분. 필터링, 정렬, 페이지네이션, 검색 등에 쓰인다.

- 물음표 뒤의 내용 들이 `키=밸류` 형태로 들어가서 백엔드에서 사용 가능하다. 쿼리 파라미터는 GET 요청을 할 때 많이 사용한다. 각 조건들은 `&` 로 원하는 조건들을 이어붙일 수 있다.
- `?ordering=-id` 만 주더라도 백엔드가 잘 처리하게 된다.
- `?offset=0&limit=100` 등으로 요청하면 전체 데이터가 아니라 원하는 갯수에 해당하는 내용만을 받을 수 있다.
- `?search=홍길동` 을 요청하면 요청한 것에 해당하는 내용만을 받을 수 있다.

기획과 의도에 따라 둘 중 무엇을 사용할지는 갈릴 수 있다. 하지만 대다수의 상황에서, 쿼리 파라미터는 필터링, 정렬, 검색 등에 사용하는 것이 Best Practice이다.

## RESTful하지 못한 API 설계 예시

`detail_page`, `main_page` 등은 RESTful 하지 않다. 딱 봐도 자명하도록 `product`, `products` 등으로 바꿔준다.

## Status Code

- `200 OK`: GET 요청일 경우 리소스 반환, PUT/PATCH 요청일 경우 상태 메시지 또는 리소스 반환
- `201 Created`: POST 요청일 경우, 상태 메시지 또는 새로 생성된 리소스 반환
- `204 No Content`: DELETE 요청일 경우, 성공적으로 삭제된 요청의 응답.
- `400 Bad Request`: 요청에 잘못된 값들이 포함됨. 전화번호에 글자가 포함된 경우.
- `401 Unauthorized`: 인증을 요청했으나 사용자가 인증 요건을 충족하지 못함. 로그인 시 잘못된 이메일을 입력한 경우.
- `403 Forbidden`: 사용자가 허용되지 않은 콘텐츠로 접근을 시도함. 미구독자가 구독형 서비스를 요청한 경우.
- `404 Not Found`: 리소스 없음.
- `405 Method Not allowed`: 허가되지 않은 HTTP Method로 시도됨. 백엔드가 허락하지 않은 Method로 요청한 경우.
- `500`: 99.99%의 확률로 백엔드의 잘못이지만 프론트엔드 잘못일 수도 있으니 서로 코드를 확인해 보아요...
