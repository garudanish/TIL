# SQL 시작하기

## SELECT 문으로 데이터 검색하기

SELECT 문은 데이터베이스에서 데이터를 검색하는 구문이다. 사용하기 쉽지만 시스템 성능에 많은 영향을 미치므로 주의해서 사용한다.

SELECT 문을 가장 자주 사용하는 형태로 줄이면 다음과 같다.

```sql
SELECT 열
FROM 테이블
WHERE 조건
ORDER BY 열
```

### 주석 작성 방법과 쿼리 실행 방법 알아보기

한줄 주석은 `--주석`과 같이 사용한다.

여러 줄 주석은 `/* ... */`을 사용한다.

### SELECT 문으로 특정 열 검색하기

SELECT 문의 기본 형식은 다음과 같다.

`SELECT [열] FROM [테이블]`

- `SELECT`: 데이터를 검색하는 구문
- `[열]`: 검색하려는 데이터의 열을 입력한다. 여러 열을 검색할 때는 쉼표로 구분하여 연결한다. `*`을 입력하면 테이블의 전체 열을 검색한다.
- `FROM`: 데이터를 가져올 테이블을 정하는 구문
- `[테이블]`: 데이터가 저장된 테이블 이름

전체 열 검색은 불필요한 열의 데이터까지 검색하므로 CPU나 디스크에 많은 부담을 주므로 조금만 쓰는 것이 좋다.

## WHERE 문으로 조건에 맞는 데이터 검색하기

원하는 조건에 맞는 행을 검색하려면 `WHERE`문을 사용하면 된다.

```sql
SELECT [열] FROM [테이블] WHERE [열] = [조건값]
```

조건을 적용할 열과 조건을 적용할 연산자, 조건값을 입력하면 된다.

### WHERE 문으로 특정 값 검색하기

`SELECT * FROM nasdaq_company WHERE symbol = 'MSFT'` 로 `symbol`이 `MSFT`인 데이터를 검색할 수 있다.

필요한 데이터를 필터링하면 원하는 데이터만 빠르게 검색할 수 있고, 시스템의 부하를 줄일 수 있다.

`=` 외에도, `<`, `<=`, `>`, `>=`, `<>`, `!=`, `!<`, `!>` 등을 사용할 수 있다.

`<=` 등의 크기 비교 연산자는 문자열에도 사용할 수 있지만, 데이터베이스 시스템이 정의한 정렬 기준에 따라 결괏값이 달라지므로 주의한다. 정렬이 중요한 데이터는 `ORDER BY` 문을 사용하는 것이 좋다.

### WHERE 문에서 논리 연산자 사용하기

논리 연산자는 조건의 참 거짓을 판단하며, 더 복잡한 조건문이 필요한 경우 비교 연산자와 조합해 많이 사용한다.

| 연산자  | 설명                                        |
| ------- | ------------------------------------------- |
| ALL     | 모든 비교 집합이 TRUE이면 TRUE              |
| AND     | 두 부울 표현식이 모두 TRUE이면 TRUE         |
| ANY     | 비교 집합 중 하나라도 TRUE이면 TRUE         |
| BETWEEN | 피연산자가 범위 내에 있으면 TRUE            |
| EXISTS  | 하위 쿼리에 행이 포함되면 TRUE              |
| IN      | 피연산자가 리스트 중 하나라도 포함되면 TRUE |
| LIKE    | 피연산자가 패턴과 일치하면 TRUE             |
| NOT     | 부울 연산자를 반대로 실행                   |
| OR      | 하나의 부울식이 TRUE이면 TRUE               |
| SOME    | 비교 집합 중 일부가 TRUE이면 TRUE           |

#### BETWEEN을 이용한 데이터 검색

BETWEEN은 검색하는 값의 범위를 지정할 수 있다. 보통은 날짜형 데이터에 사용하지만 문자열형이나 숫자형 데이터에도 사용할 수 있다.

```sql
SELECT * FROM nasdaq_company
WHERE ipo_year BETWEEN 2010 AND 2011;

SELECT * FROM nasdaq_company
WHERE last_crawel_date BETWEEN '2021-03-17' AND '2021-03-19';
```

날짜형 데이터를 검색할 때는 밀리초를 고려해야 한다.

#### AND와 OR을 이용한 데이터 검색

여러 조건을 결합할 때는 `AND`와 `OR`을 사용한다.

`AND`는 두 개의 조건이 모두 만족하는 데이터만 검색하고, `OR`는 입력한 두 조건 중 하나라도 만족하는 데이터를 모두 검색한다.

여러 데이터를 검색하려고 `OR`을 여러번 사용하면 계속해서 같은 연산자를 반복해야 하므로 비효율적이다.

`SELECT * FROM nasdaq_company WHERE symbol = 'MSFT' OR symbol = 'AMD' OR symbol = 'AMZN';` 과 같은 쿼리는 `OR`를 반복해 쓰는 것이 아니라 `IN`을 쓰면 된다. `IN`은 `OR`과 같은 역할을 하지만 쉼표를 사용한다는 점에서 사용 방법만 다르다.

```sql
SELECT * FROM nasdaq_company WHERE symbol IN ('MSFT', 'AMD', 'AMZN');
```

조건들의 연산 우선순위를 지정해주고 싶을 때는 소괄호로 묶어준다.

#### NULL 데이터 검색

`NULL`은 정의되지 않은 값으로, 데이터가 없는 상태이다. `NULL`은 정의되지 않은 상태이므로 일반적인 연산자로 비교할 수 없다. 따라서 `IS NULL` 혹은 `IS NOT NULL`을 사용한다.

```sql
SELECT * FROM nasdaq_company
WHERE sector IS NOT NULL;
```

## ORDER BY 문으로 데이터 정렬하기

데이터를 정렬하려면 ORDER BY 문을 SELECT 문의 가장 마지막에 추가해 사용한다.

```sql
SELECT [열] FROM [테이블] WHERE [열] = [조건값] ORDER BY [열] [ASC, DESC]
```

정렬할 열을 오름차순, 내림차순으로 정렬할 것을 입력하면 된다.

### ORDER BY 문으로 열 기준 정렬하기

데이터를 1개 열 기준으로 정렬할 때는 정렬할 열 이름을 ORDER BY문 뒤에 입력한다.

```sql
SELECT * FROM nasdaq_company ORDER BY symbol;
```

2개 이상 기준으로 정렬할 때는 정렬 순서에 따라 쉼표를 사용해 열 이름을 나열한다. 열 입력 순서에 따라 정렬 우선순위가 정해지므로 입력 순서에 주의한다.

#### ASC로 오름차순 정렬하기

오름차순 정렬은 ASC를 정렬하려는 열 이름 뒤에 붙이면 된다. 정렬 기본값은 오름차순이므로 ASC는 생략할 수 있다.

#### DESC로 내림차순 정렬하기

내림차순 정렬은 DESC를 정렬하려는 열 이름 뒤에 붙이면 된다.

#### 오름차순과 내림차순 조합해 정렬하기

오름차순과 내림차순을 각 열에 적용한 다음 조합해 정렬할 수도 있다. 각 열 이름 뒤에 ASC, DESC을 붙인 뒤 쉼표로 연결한다.

```sql
SELECT * FROM nasdaq_company
WHERE sector IS NOT NULL AND sector <> ''
ORDER BY sector ASC, symbol DESC;
```

#### TOP으로 상위 N개 데이터 검색하기

특정 조건에 해당하는 데이터 중 상위 N개의 데이터만 보고 싶다면 SELECT 문에 TOP을 조합한다. TOP은 상위 N개의 데이터를 반환하므로 정렬 우선순위가 중요하다.

```sql
SELECT TOP 10 * FROM nasdaq_company
ORDER BY ipo_year DESC, symbol ASC;
```

상위 N개의 데이터를 검색할 때는 반드시 ORDER BY 문을 사용하는 것이 좋다. 정렬하지 않으면 어떤 값을 기준으로 정렬한 상위 N개의 데이터가 출력되었는지 알 수 없기 때문이다.

#### OFFSET ... FETCH NEXT로 지정한 개수만큼 행 건너뛰고 검색하기

ORDER BY로 정렬한 데이터를, 상위나 하위가 아닌 특정 구간의 데이터를 검색해야 하는 경우가 있다. 페이지네이션 때와 같이 2페이지에 해당하는 데이터만을 가져오는 경우가 해당한다. 이럴 때는 `OFFSET ... FETCH NEXT`를 사용한다.

```sql
SELECT * FROM nasdaq_company
ORDER BY symbol
OFFSET 1000 ROWS;
```

OFFSET은 반드시 ORDER BY 문을 함께 사용해야 한다.

FETCH NEXT는 반드시 OFFSET과 함께 사용해야 하며, 출력할 행의 개수를 지정할 수 있다.

```sql
SELECT * FROM nasdaq_company
ORDER BY symbol
OFFSET 1000 ROWS
FETCH NEXT 10 ROWS ONLY;
```
