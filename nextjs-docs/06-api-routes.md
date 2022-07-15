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
