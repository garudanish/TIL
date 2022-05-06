# AdvancedRouter

Path parameter / query parameter의 개념, 어떻게 쓸 수 있는지, 어디서 갖고 오는지, 라우팅할 때 어떻게 쓰는지가 중요하다.

`useNavigate`, `useLocation`, `useParams` 훅의 용도가 무엇인지 설명할 수 있어야 한다.

- 내용이 어려운 게 아니라, 흐름이 어색한 것이기 때문에, 실습해보면서 큰 그림을 느끼면 흐름을 이해할 수 있을 것입니다!
- 브라우저 입력 url과 fetch로 보내는 API 주소를 구분할 줄 알아야 함!
- 페이지네이션은 백엔드와 함께 구현하는 기능이기 때문에 혼자 연습해보기 어려움. 실습 과제를 통해 실습해보세용.

## Routing

라우팅: 경로를 찾아가는 행위.

SPA의 특징: 페이지 전체를 새로고침하진 않음. 사용자가 느끼기에 깜빡거리지 않고, 딜레이 없이 새로운 화면을 받아볼 수 있음. 컴포넌트를 계속 갈아 끼우는 느낌. 리액트는 자체적 라우팅 기능이 없기 때문에 `react-router-dom` 라이브러리를 사용함.

그동안 우리는 정적 라우팅만을 사용해왔음. `/main` 경로로 가면 `<Users />` 컴포넌트가 나오는 식. 경로를 **지정한 대로** 컴포넌트가 보였음. 만일 지정되지 않은 경로에 접근할 경우 빈 화면이 뜨게 됨.

정적 라우팅을 사용하면, 같은 ui를 사용하는 여러 데이터들의 `id` 값에 따라 무수히 많은 url이 나타날 것이고, 각각의 모든 url에 대해 모든 경로를 다 지정해줄 수 없음.

동적 라우팅은 경로를 지정해주지 않고, 변수를 받아와서 그것을 기반으로 화면에 뿌려주는 것. 생긴 것은 다 똑같고, 안에 있는 데이터만 갈아끼우는 셈. 변수를 확인하려면 개발자 도구 네트워크 탭에 들어가서 확인할 수 있음.

## 동적인 라우팅을 처리하는 방법

### Path Parameter

```jsx
// Bad
"/users/1" => <Users id ={1} />
"/users/2" => <Users id ={2} />
"/users/3" => <Users id ={3} />

// Good
"/users/:id" => <Users /> // useParams().id
```

Path parameter는 엔드포인트의 뒤에 붙는다. Router.js 에서 Path 뒤에 `:id`와 같이 쓰고 싶은 매개변수를 사용하면 된다.

### Query Parameter

```jsx
//Bad
"/search?keyword=위코드" => <Search keyword="위코드" />
"/search?keyword=넷플릭스" => <Search keyword="넷플릭스" />

//Good
"/search?keyword=something" => <Search /> // useLocation().search
```

물음표로 시작해, 키=밸류 형식으로 존재한다. 만일 키=밸류 쌍이 여러 개일 경우 `&`으로 연결하면 쿼리스트링이 된다.

둘이 생긴게 다르듯, 사용하는 방법이 다르다.

패스 파라미터는 상세 페이지 등 한 가지의 정보만을 다룰 때 사용하고, 쿼리 파라미터는 보내야 할 정보가 여러 가지일 때 사용한다고 이해하면 된다.

## Dynamic Routing & Path Parameter

```jsx
<BrowserRouter>
  <Routes></Routes>
</BrowserRouter>
```

1. 프로덕트 리스트에 카드들이 뿌려진다. 각각마다 id를 하나씩 갖고 있다. 어떤 게 어떤 id일지는 모르겠지만, 어떤 카드를 클릭하면 해당 객체에 있는 아이디로 접근한다. 접근할 때 useNavigate 훅스를 사용해 경로를 바꿔서 해당 컴포넌트에 접근한다. `useNavigate("/product/1")`
2. 해당 경로로 가면 `<ProductDetail />` 이라는 컴포넌트가 있다. 해당 컴포넌트에 접근하면 `fetch`로 해당 경로에 있는 데이터를 받아와 `setData`를 해주는 순이다.
   1. url: "/product/1"
   2. pathname: "/product/:id"

URL을 바꾸는 건 useNavigte를 이용해서 url을 바꿔준 것임. 다른 페이지로 이동할 때 Link, 로직을 추가할 때 useNavigate를 사용한다 정도로만 알고 있었다. 그 방법이 url을 바꿔줘서 그런 것.

useNavigate는 함수를 반환한다. 경로에 `/detail`을 입력하면 엔드포인트를 바꾸고, `detail`만 입력하면 현재 엔드포인트 뒤에 붙는다.

```jsx
const goToDetail = ({ id }) => {
  navigate(`/product/${id}`);
};
```

`useParams`는 파라미터의 값을 가져오는 것. 객체를 반환한다.

```jsx
const params = useParams();
console.log(params); // { id : 1 }
```

콘솔에 찍힌 `id`는 Router에서 `:id`로 표기해준 값이다. 다른 명칭을 사용할 경우 다른 키로 들어가게 된다.

라우터에서 `:id`를 입력하는 것만으로 주소는 이동하고, 컴포넌트를 라우트에 연결할 수 있다. 하지만 클릭한 데이터를 전달해줘야 한다. 데이터를 받아온 곳, fetch를 한 곳(monsterDetail.js)에서 useParams를 사용한다.

---

`useLocation`은 엔드포인트 뒤에 있는 쿼리 스트링을 다 가져올 수 있다. 역시 객체를 반환하며, 주로 `pathname`, `search` 프로퍼티를 많이 사용한다.

`search` 프로퍼티에 `navigate` 훅을 통해 작성한 쿼리스트링이 값으로 들어간다

useNavigate는 해당 url로 보내주고, **패스 파라미터는 useParams, 쿼리 파라미터는 useLocation** 을 사용해 해당 url에서 정보를 받아온다.
클릭 -> navigate로 경로 변경 -> params로 주솟값 조회 -> 백엔드에 데이터 요청 -> 수리한 데이터 렌더링 순

- navigate는 경로 변경밖에 하는 일이 없다. 바뀐 경로에서 params가 바뀐 엔드포인트를 가져와 그것을 기반으로 새로 fetch를 보낼 뿐.

## 페이지네이션

많은 양의 데이터를 한 번에 받아 로딩이 느려지는 것을 방지하고, 원하는 양만큼 데이터를 받아오는 것을 페이지네이션이라고 한다. 이를 위해 쿼리 파라미터를 사용한다.

offset, limit으로 할 수도 있고, page로 할 수도 있다. 고정된 문법은 아니고, 백엔드와 맞추면 된다.
