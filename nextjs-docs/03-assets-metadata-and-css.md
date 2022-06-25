# Assets, Metadata, and CSS

우리가 추가한 두번째 페이지는 스타일링이 되어있지 않다. 페이지에 CSS를 추가해보자.

Next.js는 CSS와 Sass에 대한 빌트인 지원을 갖고 있다. 이 코스에선 CSS를 사용한다.

이 레슨은 또한 어떻게 Next.js가 이미지, `<title>` 태그와 같은 페이지 메타데이터 등의 정적 애셋들을 다루는지 이야기할 것이다.

## What You’ll Learn in This Lesson

이 레슨에서 당신은 이런 것을 배울 것이다:

- Next.js에 정적 파일(이미지 등)을 추가하는 방법
- 각 페이지의 `<head>` 태그 안의 요소를 커스터마이징하는 방법
- CSS 모듈로 스타일링된 재사용 가능한 리액트 컴포넌트를 만드는 방법
- `pages/_app.js`에 글로벌 CSS를 추가하는 방법
- Next.js에서의 스타일링을 위한 유용한 팁들

## 사전 준비물

- 기초 CSS 지식. 이 코스는 Next.js 앱에 CSS를 추가하는 방법을 다루지만, CSS 기초까지 다루진 않는다.

## Assets

Next.js는 최상위 폴더 하의 `public` 디렉토리에서 이미지와 같은 정적 애셋을 제공할 수 있다. `public` 디렉토리 안의 파일들은 `pages` 처럼 어플리케이션의 루트에서 참조될 수 있다.

`public` 디렉토리는 `robots.txt`, Google Site Verification, 다른 정적 애셋들에게 유용하다. 더 자세히 알기 위해선 정적 [파일 제공에 대한 문서](https://nextjs.org/docs/basic-features/static-file-serving)를 확인하라.

### Download Your Profile Picture

먼저, 당신의 프로필 사진을 검색하라.

- 프로필 사진은 `.jpg` 포맷으로 다운로드한다
- `public` 디렉토리 안의 `images` 디렉토리를 생성한다.
- `public/images` 디렉토리 안에 `profile.jpg`로 프로필 사진을 저장한다.
- 이미지 크기는 약 400px \* 400px이다.
- `public` 디렉토리에 있는 사용하지 않는 SVG 로고 파일들은 삭제할 수 있다.

### Unoptimized Image

일반 HTML이라면, 당신은 프로필 사진을 다음과 같이 추가했을 것이다:

```html
<img src="/images/profile.jpg" alt="Your Name" />
```

그러나, 이것은 당신이 수동적으로 다음을 관리해야한다는 것을 의미한다:

- 다른 스크린 사이즈에서 이미지가 반응형일 것
- 서드파티나 라이브러리를 이용해 이미지를 최적화하는 것
- 뷰포트에 있을 때만 이미지를 로딩하는 것

그리고 기타등등. Next.js는 `Image` 컴포넌트를 제공함으로써 이것을 관리할 수 있게 해준다.

### Image Component and Image Optimization

`next/image`는 HTML `<img>` 요소의 확장으로, 현대 욉을 위해 진화되었다.

Next.js는 또한 기본적으로 이미지 최적화를 지원한다. 이것은 리사이징, 최적화, 브라우저가 지원한다면 WebP 등의 현대 포맷으로 이미지를 제공하는 등의 일을 할 수 있다. 이것은 작은 뷰포트를 갖고있는 기기에 큰 이미지를 제공하는 것을 피한다. 또한 Next.js는 자동적으로 미래의 이미지 포맷을 채택하며, 브라우저가 그 이미지 포맷을 지원할 때 그 포맷을 제공한다.

자동 이미지 최적화는 어떠한 이미지 소스에도 적용된다. 이미지가 CMS와 같은 외부 데이터 소스에 있다고 하더라도, 여전히 최적화될 수 있다.

### Using the Image Component

이미지를 빌드할 때 최적화하는 것 대신, Next.js는 유저가 원할 때 이미지를 최적화시킨다. 정적 사이트 생성기와 정적만을 제공하는 솔루션과는 다르게, 이미지가 얼마나 많든 관계없이 빌드 시간은 늘어나지 않는다.

이미지는 기본적으로 lazy loaded된다. 이는 뷰포트 바깥의 이미지들은 페이지 속도에 영향을 주지 않음을 뜻한다. 이미지들은 뷰포트 안에 들어왔을 때 로드된다.

이미지는 구글이 검색 순위에 사용할 [Core Web Vital](https://web.dev/vitals/#core-web-vitals)인 [누적 레이아웃 이동](https://web.dev/cls/)을 방지하는 방식으로 항상 렌더링된다.

우리의 프로필 사진을 디스플레이하기 위한 `next/image`의 사용례는 다음과 같다. `height`와 `width` props는 반드시 원하는 렌더링 사이즈여야 하며, 원본 이미지와 비율이 같아야 한다.

```jsx
import Image from "next/image";

const YourComponent = () => (
  <Image src="/images/profile.jpg" height={144} width={144} alt="Your Name" />
);
```

## Metadata

만일 우리가 `<title>` 태그 같은 페이지의 메타데이터를 수정하고자 한다면 어떻게 해야할까?

`<title>`은 `<head>` 태그의 일부이므로, 우리는 Next.js 페이지의 `<head>` 태그를 수정하는 방법을 알아봐야 한다.

에디터에서 `page/index.js`를 연 뒤 다음 줄을 찾는다.

```jsx
<Head>
  <title>Create Next App</title>
  <link rel="icon" href="/favicon.ico" />
</Head>
```

`<Head>`는 소문자로 쓰인 `<head>` 대신에 쓰였다는 것을 파악해야 한다. `<Head>`는 Next.js 안에 있는 리액트 컴포넌트이다. 이 컴포넌트는 페이지의 `<head>`를 수정할 수 있게 해준다.

`<Head>` 컴포넌트는 `next/head` 모듈에서 임포트할 수 있다.

### Adding `Head` to `first-post.js`

우리는 `/posts/first-post` 라우트에 `<title>`을 추가하지 않았다. 한 번 추가해보자.

`pages/posts/first-post.js` 파일을 열어 파일 첫 라인에 `next/head`로부터 `Head`를 임포트한다.

```jsx
import Head from "next/head";
```

그 후, export되는 `FirstPost` 컴포넌트에 `Head` 컴포넌트를 포함시킨다. 그 후, 단순히 `title` 태그를 추가하면 된다.

```jsx
export default function FirstPost() {
  return (
    <>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  );
}
```

[http://localhost:3000/posts/first-post](http://localhost:3000/posts/first-post)에 접속해보면, 우리가 `<head>`에 `title` 태그를 작성한 대로 브라우저 탭에 "First Post"라고 적힌 것을 확인할 수 있다.

## Third-Party JavaScript

서드 파티 자바스크립트는 서드 파티로부터 추가된 스크립트를 말한다. 보통, 서드파티 스크립트는 분석, 광고, 고객 지원 위젯 등 처음부터 작성될 필요가 없는 새로운 기능을 사이트에 추가하기 위해 포함된다.

### Adding Third-Party JavaScript

Next.js 페이지에 서드 파티 스크립트를 추가하는 방법을 알아보자.

`pages/posts/first-post.js`를 에디터에서 열어 다음 라인을 찾는다:

```jsx
<Head>
  <title>First Post</title>
</Head>
```

메타데이터와 더불어, 가능한 빨리 로드되고 실행되어야 할 스크립트들은 페이지의 `<head>` 태그 안에 추가된다. 일반적인 `<script>` HTML 요소를 사용해 외부 스크립트는 다음과 같이 추가될 수 있다:

```JSX
<Head>
  <title>First Post</title>
  <script src="https://connect.facebook.net/en_US/sdk.js" />
</Head>
```

이 스크립트는 페이스북 SDK를 포함하며, 페이스북 소셜 플러그인과 기타 기능을 소개할 때 일반적으로 사용된다. 이 접근 방법 역시 작동하지만, 이 방식으로 스크립트를 포함하는 것은 한 페이지에서 다른 자바스크립트 코드들이 언제 로딩되는지는 명확하게 알려주지 않는다. 특정한 스크립트가 렌더링을 막고 페이지 컨텐츠가 로딩되는 것을 지연시킨다면, 이는 상당히 퍼포먼스에 영향을 끼칠 것이다.

### Using the Script Component

`next/script`는 HTML `<script>` 요소의 확장이자, 추가적인 스크립트들이 fetch되고 실행될 때 최적화해준다.

같은 파일에서, `next/script`로 부터 `Script`를 파일의 첫 부분에 임포트한다.

```jsx
import Script from "next/script";
```

이제, `FirstPost` 컴포넌트에 `Script` 컴포넌트를 포함해 업데이트한다.

```jsx
export default function FirstPost() {
  return (
    <>
      <Head>
        <title>First Post</title>
      </Head>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      />
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  );
}
```

Script 컴포넌트에 몇 가지 프로퍼티가 추가로 선언된 것에 주목하라.

- `strategy`는 서드 파티 스크립트가 언제 로딩되어야 할지를 결정한다. `lazyOnload`라는 값은 Next.js가 브라우저 idle time 동안 특정한 스크립트를 lazy하게 로드해야한다고 알려준다.
- `onLoad`는 스크립트가 로딩되는 것이 완료되자마자 자바스크립트 코드를 즉시 실행시키기 위해 쓰인다. 위 예시에서는 스크립트가 올바르게 로딩되었다고 언급하는 메시지를 콘솔에 찍었다.

[http://localhost:3000/posts/first-post](http://localhost:3000/posts/first-post)에 접속해보면, 브라우저의 개발자 도구에서 위에서 찍었던 콘솔 메시지를 콘솔 패널에서 확인할 수 있을 것이다. 거기에, `window.FB`를 실행시켜 스크립트가 전역 변수를 덧씌운 것을 확인할 수 있다.

**참고**: 페이스북 SDK는 좋은 성능으로 서드파티 스크립트를 당신의 애플리케이션에 추가하는 방법을 보여주기 위해 고안된 예시로 쓰였다. 이제 당신은 Next.js에 서드파티 기능을 포함하는 것의 기본을 이해했으므로, 다음 레슨을 시작하기 전에 `FirstPost`에서 Script 컴포넌트를 지울 수 있다.

## CSS Styling

CSS 스타일링에 대해 알아보자.

확인할 수 있듯, 인덱스 페이지([http://localhost:3000](http://localhost:3000))는 이미 스타일을 갖고 있다. `pages/index.js`를 열어보면 다음과 같은 코드를 확인할 수 있다:

```jsx
<style jsx>{`
  …
`}</style>
```

이 페이지는 styled-jsx라는 라이브러리를 사용하고 있다. 이는 "CSS-in-JS" 라이브러리로, 리액트 컴포넌트 안에 CSS를 작성할 수 있게 해주며, CSS 스타일에 스코프를 적용해 다른 컴포넌트들에는 적용되지 않게끔 한다.

Next.js는 styled-jsx에 대한 빌트인 지원을 갖고 있지만, styled-components나 emotion과 같은 다른 CSS-in-JS 라이브러리를 사용할 수도 있다.

### Writing and Importing CSS

Next.js는 CSS와 Sass를 빌트인 지원하므로 당신은 `.css`와 `.scss` 파일을 임포트할 수 있다.

Tailwind CSS와 같은 유명한 CSS 라비르러리 역시 지원된다.

이 레슨에선, 어떻게 Next.js에서 CSS를 작성하고 임포트하는 지 알아볼 것이다. 또한 Next.js의 CSS 모듈과 Sass에 대한 빌트인 지원에 대해서도 알아볼 것이다.

## Layout Component

먼저, 모든 페이지에서 쓰이는 레이아웃 컴포넌트를 만든다.

- 최상위에 `components` 디렉토리를 만든다.
- `components` 안에 다음과 같은 내용의 `layout.js` 파일을 만든다.

```jsx
export default function Layout({ children }) {
  return <div>{children}</div>;
}
```

그 후, `pages/posts/first-post.js`를 열어 `Layout` 컴포넌트를 임포트하고, 최상위 컴포넌트로써 사용한다.

```jsx
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/layout";

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout>
  );
}
```

### Adding CSS

`Layout` 컴포넌트에 몇 가지 스타일을 추가해보자. 추가하기 위해서 우리는 리액트 컴포넌트에 CSS 파일을 임포트할 수 있게 해주는 CSS 모듈을 사용할 것이다.

다음과 같은 내용의 `components/layout.module.css` 파일을 생성한다.

```css
.container {
  max-width: 36rem;
  padding: 0 1rem;
  margin: 3rem auto 6rem;
}
```

> 중요사항: CSS 모듈을 사용하기 위해선 CSS 파일의 이름이 반드시 `.module.css`로 끝나야한다.

`container` 클래스를 `components/layout.js`에서 사용하기 위해선 다음과 같이 해야한다:

- CSS 파일을 임포트하고 `styles`와 같은 이름을 할당해야 한다.
- `styles.container`를 `className`으로 사용해야 한다.

`components/layout.js`를 열고 내용을 다음과 같이 수정한다:

```jsx
import styles from "./layout.module.css";

export default function Layout({ children }) {
  return <div className={styles.container}>{children}</div>;
}
```

[http://localhost:3000/posts/first-post](http://localhost:3000/posts/first-post)에 가 보면, 텍스트들이 중앙 정렬된 컨테이너에 들어가 있는 것을 확인할 수 있다.

### Automatically Generates Unique Class Names

브라우저의 개발자 도구에서 HTML을 살펴보면, `Layout` 컴포넌트에 의해 렌더된 `div`가 `layout_container__...`과 같은 클래스 이름을 갖고 있는 것을 확인할 수 있다.

이것이 CSS 모듈이 하는 일이다: 자동으로 고유한 클래스 이름을 만들어준다. CSS 모듈을 사용하는 한, 당신은 클래스 이름이 충돌하는 것을 걱정할 필요가 없다.

게다가, Next.js의 코드 스필리팅 기능은 CSS 모듈에서도 작동한다. 즉, 각 페이지에서 최소한의 CSS만이 로드된다. 이를 통해 번들 사이즈가 더욱 작아진다.

CSS 모듈들은 빌드 될 때 자바스크립트 번들로부터 추출되고, Next.js에 의해 자동으로 로드되는 `.css` 파일을 생성한다.

## Global Styles

CSS 모듈은 컴포넌트 레벨 스타일에서 유용하다. 하지만 어떤 CSS를 모든 페이지에 적용하고자 한다면, Next.js는 그것 역시 지원한다.

글로벌 CSS 파일들을 로드하고자 할 때, 다음과 같은 내용의 `pages/_app.js`를 만든다:

```jsx
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

이 `App` 컴포넌트는 모든 페이지들을 가로지르는 최상위 컴포넌트이다. 이 `App` 컴포넌트를 페이지를 이동할 때 state를 유지하는 용도 등으로 사용할 수 있다.

### Restart the Development Server

**중요사항**: `pages/_app.js`를 추가한 뒤엔 개발 서버를 재시작해야 한다. `Ctrl + C`를 눌러 서버를 중지한 뒤 다음의 커맨드를 실행한다:

```shell
npm run dev
```

### Adding Global CSS

Next.js에서, 글로벌 CSS 파일을 `pages/_app.js`에 임포트함으로써 적용할 수 있다. 이곳 외에 글로벌 CSS를 임포트할 수 있는 곳은 없다.

글로벌 CSS를 `pages/_app.js` 외에 임포트할 수 없는 이유는 글로벌 CSS는 페이지의 모든 요소에 영향을 끼치기 때문이다.

만일 홈페이지에서 `/post/first-post` 페이지로 이동했을 때, 홈페이지에 적용된 글로벌 스타일은 의도하지 않게 `/posts/first-post`에도 영향을 끼칠 것이다.

글로벌 CSS 파일은 어느 위치에 어느 이름으로도 저장될 수 있다. 따라서 다음과 같이 한다:

- 최상위에 `styles` 디렉토리를 생성하고, 그 안에 `global.css` 파일을 생성한다.
- `styles/global.css`에 다음과 같은 내용을 추가한다. 이는 몇 가지 스타일을 리셋하고 `a` 태그의 색을 변경한다:

- ```css
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
      Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    line-height: 1.6;
    font-size: 18px;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: #0070f3;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  img {
    max-width: 100%;
    display: block;
  }
  ```

마지막으로, `pages/_app.js` 파일을 열어 CSS 파일을 다음과 같이 추가한다:

```jsx
import "../styles/global.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

이제, [http://localhost:3000/posts/first-post](http://localhost:3000/posts/first-post)에 접속하면 작성한 스타일이 적용된 것을 확인할 수 있다.
