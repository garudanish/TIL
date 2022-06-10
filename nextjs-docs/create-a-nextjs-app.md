# Create a Next.js App

처음부터 리액트로 완성된 웹 어플리케이션을 만들려면, 고려해야 할 중요한 사항들이 많다:

- 웹팩과 같은 번들러를 이용해 코드가 번들되어야 하고, 바벨 등의 컴파일러를 이용해 변환되어야 한다.
- 코드 스플리팅과 같은 프로덕션 최적화가 필요하다.
- 성능과 SEO를 위해 몇몇 정적으로 사전 렌더링되기를 원할 수 있다. 또한 서버 사이드 렌더링이나 클라이언트 사이드 렌더링을 사용하기를 원할 수 있다.
- 리액트 앱을 데이터 저장소에 연결하기 위해서 서버 사이드 코드를 작성해야 할 수 있다.

*프레임워크*는 이 모든 문제들을 해결할 수 있다. 하지만 프레임워크는 반드시 올바른 수준의 추상화를 가져야 한다. 그렇지 못하다면 그다지 유용하지 않을 것이다. 또한 당신과 당신의 팀이 코드를 작성하면서 겪을 훌륭한 "개발자 경험"을 가져야 한다.

## Next.js: 리액트 프레임워크

리액트 프레임워크인 Next.js를 만나라. Next.js는 위에 언급한 모든 문제들에 대해 해답을 제공한다. 하지만 가장 중요한건, Next.js는 당신과 당신의 팀이 리액트 애플리케이션을 제작할 때 [성공의 구덩이](https://blog.codinghorror.com/falling-into-the-pit-of-success/)로 이끌 것이다.

Next.js는 최고의 개발자 경험과 많은 빌트인 기능을 제공하는 것을 목표로 한다. 예를 들어:

- 직관적이고 페이지에 기반한 라우팅 시스템(동적 라우팅 지원)
- 페이지마다 사전 렌더링, 정적 생성과 서버 사이드 렌더링을 지원
- 빠른 페이지 로드를 위해 자동 코드 스플리팅
- 최적화된 사전 fetch와 함께 클라이언트 사이드 라우팅
- 빌트인 CSS, Sass, CSS-in-JS 라이브러리 지원
- 빠른 새로고침 지원 등의 개발 환경
- 서버리스 함수 등의 API 엔드포인트를 개발하기 위한 API 라우트
- 완전히 확장 가능

Next.js는 세계 최대 브랜드들을 포함해, 수만 개의 프로덕션 관련 웹 사이트 및 웹 애플리케이션에서 사용된다.

## 이 튜토리얼에 관해

이 무료 상호착용 코스는 당신에게 Next.js로 시작하는 방법을 알려줄 것이다.

이 튜토리얼에서, 당신은 간단한 블로그 앱을 만듦으로써 Next.js의 기본을 배우게 될 것이다. 최종 결과의 예시는 다음과 같다:

[https://next-learn-starter.vercel.app](https://next-learn-starter.vercel.app) ([source](https://github.com/vercel/next-learn/tree/master/basics/demo))

> 이 튜토리얼은 자바스크립트와 리액트에 대한 기초 지식을 가정한다. 만약 당신이 리액트 코드를 작성해본 적이 없다면, 반드시 리액트 공식 튜토리얼을 먼저 배워야 한다.
>
> 만일 문서를 찾고 있다면, [Next.js 공식 문서에 찾아가라](https://nextjs.org/docs/getting-started).

## Setup

먼저, 개발 환경이 준비되었는지 확인해야 한다.

- 만약 Node.js가 설치되어 있지 않다면 [이곳에서 설치할 수 있다](https://nodejs.org/en/). 10.13 버전 이상의 Node.js가 필요하다.
- 텍스트 에디터와 터미널 앱이 필요하다.

> 만일 윈도우 환경이라면, Git for Window를 다운로드 받는 것과 함께 다운로드되는 Git Bash를 사용하는 것을 추천한다. Git Bash는 이 튜토리얼에서 쓰이는 UNIX에 특화된 커맨드를 지원한다. Windows Subsystem for Linux (WSL)을 사용할 수도 있다.

### Create a Next.js app

Next.js 앱을 만들기 위해서, 터미널을 연 뒤 앱을 만들 디렉토리에 `cd`로 이동한 뒤 다음의 커맨드를 입력한다:

```sh
npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/learn-starter"
```

> 자세히 살펴보면, 이는 당신에게 Next.js app을 만들어 제공해주는 `create-next-app`이라는 도구를 사용한다. 이 도구는 `--example` 플래그를 통해 [이 템플릿](https://github.com/vercel/next-learn/tree/master/basics/learn-starter)을 이용한다.
>
> 만일 작동하지 않는다면 [이 페이지](https://github.com/vercel/next-learn/blob/master/basics/errors/install.md)를 참고하라.

### Run the development server

이제 `nextjs-blog`라는 새 폴더가 생겼을 것이다. `cd`로 이동한다:

```sh
cd nextjs-blog
```

그리고 다음의 커맨드를 실행한다:

```sh
npm run dev
```

이 커맨드는 당신의 Next.js 앱의 개발 서버를 3000번 포트에 띄운다. 잘 동작하는지 확인하려면 브라우저에서 [http://localhost:3000](http://localhost:3000)에 접속하면 된다.

## Welcome to Next.js

[http://localhost:3000](http://localhost:3000)에 접속하면 다음과 같은 페이지를 볼 수 있을 것이다. 이는 Next.js에 대해 도움이 되는 정보를 보여주는 스타터 템플릿 페이지이다.

![welcome to next.js](https://nextjs.org/static/images/learn/create-nextjs-app/welcome-to-nextjs.png)

## Editing the Page

스타터 페이지를 편집해보자.

- Next.js 개발 서버가 실행되고 있는지 확인한다.
- 텍스트 에디터에서 `pages/index.js`를 연다.
- `<h1>` 태그 아래의 **"Welcome to"** 텍스트를 찾아 **"Learn"**으로 수정한다.
- 파일을 저장한다.

파일을 저장하자마자 브라우저는 자동으로 새로운 텍스트로 페이지를 업데이트 한다.

![learn next.js](https://nextjs.org/static/images/learn/create-nextjs-app/learn-nextjs.png)

Next.js 개발 서버는 Fast Refresh가 활성화 되어있다. 파일이 수정되면 Next.js는 거의 즉시, 자동적으로 브라우저에 변화를 반영한다. 새로고침을 할 필요가 없다! 이 기능은 당신의 앱을 빠르게 돌아보는데 도움을 준다.
