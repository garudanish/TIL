# Create a Next.js App

지금까지, 우리가 만든 Next.js 앱은 하나의 페이지만을 가지고 있다. 웹사이트와 웹 애플리케이션은 보통 많은 페이지들을 갖고 있다.

어떻게 우리 애플리케이션에 더 많은 페이지들을 추가할 수 있는지 알아보자.

## What You’ll Learn in This Lesson

이 레슨에서 당신은 이런 것을 배울 것이다:

- 통합적인 파일 시스템 라우팅을 이용해 새 페이지를 만드는 법
- 링크 컴포넌트를 이용해 페이지 간 클라이언트 사이드 내비게이션 활성화하는 방법
- 코드 스플리팅과 사전 fetch에 대한 빌트인 지원

> Next.js 라우팅에 대한 자세한 문서를 찾고 있다면, [라우팅 문서](https://nextjs.org/docs/routing/introduction)를 살펴봐라.

## Pages in Next.js

Next.js에서, 페이지는 `pages` 디렉토리의 파일에서 내보내진 리액트 컴포넌트이다.

페이지들은 페이지의 파일명에 기반한 경로와 관련돼있다.. 예를 들어, 개발에서:

- `pages/index.js`는 `/` 경로와 관련돼있다.
- `pages/posts/first-post.js`는 `/post/first-post` 경로와 관련돼있다.

우리는 이미 `pages/index.js` 파일을 갖고 있으므로, `pages/posts/first-post.js`를 만들어 어떻게 작동되는지 확인하자.

## Creagte a New Page

`pages` 디렉토리 아래 `posts`를 만든다.

`first-post.js`를 `posts` 디렉토리 안에 다음과 같은 내용으로 생성한다.

```js
export default function FirstPost() {
  return <h1>First Post</h1>;
}
```

컴포넌트는 어떤 이름이나 가질 수 있지만, 반드시 `default`로 export 되어져야 한다.

이제, 개발 서버를 열고 [http://localhost:3000/posts/first-post](http://localhost:3000/posts/first-post)로 접근하면 다음과 같은 페이지를 볼 수 있다.

이것이 Next.js가 다른 페이지를 만드는 방법이다.

단순히 `pages` 디렉토리 아래에 자바스크립트 파일을 생성하면 파일의 경로가 URL 경로가 된다.

이 방식은 HTML 혹은 PHP 파일들로 웹사이트를 만드는 것과 비슷하다. HTML을 작성하는 것 대신에, JSX를 쓰고 리액트 컴포넌트를 사용하는 것이다.

새로 만들어진 페이지에 대한 링크를 추가해 홈페이지에서 해당 페이지로 이동할 수 있게 하자.
