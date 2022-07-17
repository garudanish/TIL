# API Routes

Next.js는 API 라우트를 지원하며, 이는 Node.js 서버리스 함수로써 API 엔드포인트를 쉽게 만들 수 있게 해준다. 블로그 앱에서 꼭 필요하진 않지만, 사용하는 방법에 대해 간단히 다룰 것이다.

이 레슨에선 다음과 같은 것을 배운다:

- API 라우트를 만드는 방법
- API 라우트에 대한 유용한 정보

## Creating API Routes

API 라우트는 Next.js 앱 안에 API 엔드포인트를 만들 수 있게 해준다. `pages/api` 디렉토리 안에 다음과 같은 형태로 함수를 만듦으로써 가능하다.

```jsx
// req = HTTP incoming message, res = HTTP server response
export default function handler(req, res) {
  // ...
}
```

이 함수들은 람다로도 알려진 서버리스 함수로 배포될 수 있다.

### Creating a simple API endpoint

`pages/api` 안에 다음과 같은 내용의 `hello.js` 파일을 만든다:

```jsx
export default function handler(req, res) {
  res.status(200).json({ text: "Hello" });
}
```

[http://localhost:3000/api/hello](http://localhost:3000/api/hello)에 접근하면 `{"text": "Hello"}`라는 내용을 볼 수 있다.

- `req`는 프리빌트 미들웨어가 더해진 http.IncomingMessage의 인스턴스이다.
- `res`는 헬퍼 함수가 더해진 http.ServerResponse의 인스턴스이다.

## API Routes Details

API 라우트에 대해 알아야 할 필수적인 정보를 다룬다.

### Do Not Fetch an API Route from getStaticProps or getStaticPaths

`getStaticProps`나 `getStaticPaths`에서 API 라우트를 fetch해서는 안된다. 대신, `getStaticProps`나 `getStaticPaths` 안에서 직접 서버사이드 코드를 작성한다(혹은 헬퍼 함수를 호출한다).

이유는 다음과 같다: `getStaticPrps`와 `getStaticPaths`는 서버사이드에서만 실행되고 클라이언트 사이드에서는 절대 실행되지 않는다. 거기다, 이 함수들은 브라우저를 위한 JS 번들에 포함되지 않는다. 이는 브라우저에 보내지 않는 데이터베이스 쿼리와 같은 코드를 쓸 수도 있다는 것을 의미한다.

### A Good Use Case: Handling Form Input

API 라우트의 좋은 사용 예시는 폼 인풋을 다루는 것이다. 예를 들어, 페이지에 폼을 만들고 그것을 API 라우트에 `POST` 요청으로 보낼 수 있다. 그 이후 그 폼을 데이터베이스에 바로 저장하는 코드를 작성할 수 있다. API 라우트 코드는 클라이언트 번들에는 포함되지 않고, 따라서 안전하게 서버 사이드 코드를 작성할 수 있다.

```jsx
export default function handler(req, res) {
  const email = req.body.email;
  // Then save email to your database, etc...
}
```

### Preview Mode

정적 생성은 페이지가 헤드리스 CMS에서 헤드리스 데이터를 fetch할 때 유용하다. 하지만 이는 헤드리스 CMS에 초안을 작성하고 페이지에 즉시 그 초안을 미리보는 것을 원할 때는 이상적이지 않다. Next.js가 빌드 시간 대신 요청 시간에 이러한 페이지를 렌더링하고 게시된 내용 대신 초안 내용을 가져오는 것을 원할 수 있다. Next.js는 이 특정 경우에 대해서만 정적 생성을 바이패스하는 것을 원할 수 있다.

Next.js는 위의 문제를 해결하기 위해 프리뷰 모드라는 기능이 있으며, 이는 API 라우트를 활용한다.

### Dynamic API Routes

API 라우트는 다른 페이지들처럼 동적일 수 있다.
