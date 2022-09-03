출처 : https://forceson.github.io/android/%EC%B1%84%ED%8C%85%EC%95%B1%EC%9D%84-%EC%84%A4%EA%B3%84%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B4-%EB%82%B4%EC%9A%A9/

출처2 : https://sendbird.com/ko/blog/%EC%9E%90%EC%B2%B4-or-%EC%99%B8%EC%A3%BC%EA%B0%9C%EB%B0%9C-%EC%B9%B4%ED%86%A1%EA%B3%BC-%EA%B0%99%EC%9D%80-%EB%A9%94%EC%8B%A0%EC%A0%80-%EC%96%B4%ED%94%8C%EC%9D%84-%EA%B0%9C%EB%B0%9C%ED%95%98%EA%B8%B0

### 개발할 내용
- 로그인 및 채팅 프로필 생성 기능.
- SNS 로그인 (카카오)
- 채팅방 생성.
- 채팅방 가입.
- 채팅방 그룹으로 통신 기능.
- 채팅 내용은 DB 서버에 저장.


### 기술 요건 검토

#### 백앤드
- Server Operaation : 자체서버 ( nodejs, express )
- Traffic handling : Load Balancing
- Database : No SQL(MongoDB), RDB (MySQL, Postgres)
- Network layer : WebScoket, HTTP, TCP socket
- client plaform : Web(JavaScript)
- 기타 : Logging, Monitoring, Analytics, Swagger

#### 포런트
- html/css/js
- 디자인 툴 : AdobeXD (export web tool)
- 프레임워크 : React.js (나중에 구현 예정.)



#### Nodejs 패키지 사용 목록
- swagger-jsdoc swagger-ui-express : API 명세서 자동화
- nodemon : 편리한 실행
- nunjucks : view엔진
- dotenv : .env 파일 사용.
- cookie-parser : 쿠키피싱
- color-hash : 사용자에게 컬러 부여
- path : 폴더 지정.
- jest : test 도구.
  - "test: "jest"



#### 참고 상트
- swagger api 문서 자동화
  - https://velog.io/@godkor200/%EA%B7%80%EC%B0%AE%EC%9D%80-api-%EB%AC%B8%EC%84%9C-swagger-UI%EB%A1%9C-%EC%9E%90%EB%8F%99%ED%99%94
- Rest Api - model 만들기
  - https://1-day-1-coding.tistory.com/51

