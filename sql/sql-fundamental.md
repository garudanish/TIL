# SELECT ALL FROM SQL

> [https://edu.goorm.io/learn/lecture/18815/select-all-from-sql](https://edu.goorm.io/learn/lecture/18815/select-all-from-sql)

## SELECT

```sql
SELECT 열이름(들) FROM 테이블명;
```

테이블에서 열 이름(들)을 가져온다. 열 이름이 여러 개일 경우 쉼표`,`로 구분한다.

```sql
SELECT PRODUCT_ID, CNT, COLOR FROM PRODUCT_INFO;
```

### LIMIT

가져오는 데이터의 숫자를 제한하고 싶은 경우에 사용한다.

```sql
SELECT PRODUCT_ID FROM PRODUCT_INFO LIMIT 5;
```

### ORDER BY

가져오는 데이터를 정렬하고자 할 때 사용한다.

```sql
SELECT * FROM PRODUCT_INFO ORDER BY PRODUCT_ID ASC;
```

### DISTINCT

데이터를 중복 없이 가져오고자 할 때 사용한다.

```sql
SELECT DISTINCT KIND FROM PRODUCT_INFO;
```

## WHERE

```sql
SELECT 열이름 FROM 테이블명 WHERE 조건;
```

테이블에서 열 이름을 가져오는데, 조건에 맞는 것만 가져온다.

### 논리연산자

`=`, `!=`, `>=`, `>`, `<=`, `<`를 사용한다.

```sql
SELECT ProductID, Price FROM Products WHERE Price >= 15;
```

### 목록 포함

`IN (...)`, `NOT IN (...)`을 사용한다. 괄호 안의 목록 안에 포함되거나, 포함되지 않는 데이터만 가져온다.

```sql
SELECT * FROM PRODUCT_INFO WHERE COLOR NOT IN ("WHITE", "BLACK", "GREY");
```

`COLOR`가 `WHITE`, `BLACK`, `GREY`가 아닌 데이터만 가져온다.

### 문자열 포함

`LIKE "문자열"`를 사용한다. 문자열을 포함하는 데이터만 가져온다.

```sql
SELECT * FROM PRODUCT_INFO WHERE NAME LIKE "기본%";
```

`%`는 문자열의 앞뒤로 다른 글자의 포함 여부를 나타낸다. 즉, 위 예시의 `"기본%"`는 `기본`으로 **시작**하는 데이터를 가져오는 조건이다.

### 조건 결합

`AND`, `OR`를 사용한다.

```sql
SELECT NAME, CNT FROM PRODUCT_INFO WHERE CNT >= 100 AND KIND = "겉옷";
```

`CNT`가 100 이상**이고** `KIND`가 겉옷인 데이터만 가져온다.

## GROUP BY

```sql
SELECT 열이름, 통계함수 FROM 테이블명 GROUP BY 열이름;
```

```sql
SELECT Country, COUNT(CustomerID) FROM Customers GROUP BY Country;
```

Country를 기준으로 몇 개의 CustomerID 데이터가 있는지 COUNT한다.

### `HAVING`

GROUP BY를 통해 가져온 데이터에 조건을 달 때 사용한다.

```sql
SELECT Country, COUNT(CustomerID) FROM Customers GROUP BY Country HAVING COUNT(CustomerID) >= 10;
```

## JOIN

### INNER JOIN

```sql
SELECT 열이름 FROM 테이블명A INNER JOIN 테이블명B ON B.Key = A.Key;
```

A 테이블과 B 테이블에 중 Key 값이 같은 정보를 모두 합친다. 교집합을 만드는 개념이다.

```sql
SELECT Customers.CustomerID, Orders.OrderID
FROM Customers

INNER JOIN Orders
ON Orders.CustomerID = Customers.CustomersID
```

`AS`를 통해 테이블의 약어를 만들 수 있다.

```sql
SELECT C.CustomerID, O.OrderID
FROM Customers AS C

INNER JOIN Orders AS O
ON O.CustomerID = C.CustomersID
```

### LEFT JOIN

```sql
SELECT C.CustomerID, O.OrderID
FROM Customers AS C

LEFT JOIN Orders AS O
ON O.CustomerID = C.CustomersID
```

한 테이블(위의 예시에선 `Customers`)과 교집합을 함께 가져오는 문법이다.

교집합에 포함되지 않는 데이터(즉, 회원이지만 Order를 하지 않은 경우)는 `null`을 값으로 갖게 된다.
