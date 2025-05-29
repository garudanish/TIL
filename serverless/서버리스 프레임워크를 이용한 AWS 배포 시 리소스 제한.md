# 서버리스 프레임워크를 이용한 AWS 배포 시 리소스 제한

## 에러 발생

회사의 프로젝트 중 serverless.yml에 `httpApi` 경로를 일일이 다 적어 운영하는 사례가 있었다.

```yml
service: api

functions:
  api:
      handler: index.handler
        events:
          - httpApi:
              path: /foo
                method: GET
          - httpApi:
              path: /bar
                method: GET
```

평소처럼 배포 파이프라인을 돌리던 중 에러가 나면서 파이프라인이 터졌는데, 에러 메시지는 다음과 같았다:

> Error:
> The CloudFormation template is invalid: Template format error: Number of resources, 516, is greater than maximum allowed, 500

서버리스 프레임워크를 이용해 AWS로 배포할 땐 CloudFormation template로 배포가 이루어진다. 하나의 CloudFormation template에 정의될 수 있는 AWS resource의 수는 최대 500개인데, 프로젝트에 정의된 resource가 리밋을 넘겼다는 내용이었다.

## serverless.yml에서 함수를 배포하면 생기는 일

serverless.yml의 `functions`에 함수를 설정하면, 배포할 때 다음 세가지 resource가 생성된다.

1. `AWS::Lambda::Function`: 실제 람다 함수
2. `AWS::Lambda::Version`: 함수의 특정 버전. 이를 통해 빠르고 쉬운 롤백이 가능하다.
3. `AWS::Logs::LogGroup`: CloudWatch의 함수 로그 그룹. 함수가 CloudWatch에 로그를 남길 수 있게 해준다.

이것만으로는 큰 문제가 없지만, 함수가 실행되는 트리거인 `events`에 `httpApi`를 달면 아래와 같이 세개의 resource가 추가로 생성된다.

## events에 httpApi를 추가하면 생성되는 resource

1. `AWS::Lambda::Permission`: API Gateway가 함수를 실행할 수 있게 하는 권한
2. `AWS::ApiGateway::Resource`: resource path를 엔드포인트에 구성한다.
3. `AWS:ApiGateway::Method`: 엔드포인트와 HTTP 메서드를 구성한다.

이 resource들은 httpApi가 하나 추가될 때마다 매번 생성된다. 즉, api 역할을 하는 함수를 생성하며 3개, 경로 n개마다 (n \* 3)개의 resource가 생성되는 셈이다.

## 해결 방법

나는 람다에 배포하는 함수가 fastify 앱이었으므로, 함수 안에서 자체적으로 라우팅이 되기 때문에 `- httpApi: '*'` 로 명시해서 resource 수를 줄이는 방법을 사용했다.

path를 명시적으로 정의해야 하거나, 프레임워크를 사용하지 않는다면 `/path/{proxy+}` 등을 사용해 resource를 줄일 수 있다.

---

참고문헌

- [https://www.serverless.com/blog/serverless-workaround-cloudformation-200-resource-limit/](https://www.serverless.com/blog/serverless-workaround-cloudformation-200-resource-limit/)
