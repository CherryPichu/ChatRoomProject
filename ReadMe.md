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
- socket.io : 소켓 통신에 사용
- express-socket.io-session : socket.io 내에서 session 데이터 접근
- ws : websocket 프로토콜을 위한 라이브러리
- express-session : session 관리 라이브러리
- cookie-parser : 쿠키 관리 라이브러리
- body-parser : post 요청의 매개변수를 받기 위해 사용
- passport : 로그인 처리를 도와주는 라이브러리 ( 로그인 전략 )
- passport-local :  로컬 (mysql) 로그인 전략이 구현된 라이브러리
- passport-kakao : 카카오 로그인 전략이 구현된 라이브러리
- bcrypt : 비밀번호 암호화에 필요한 라이브러리



#### 참고 사이트
- swagger api 문서 자동화
  - https://velog.io/@godkor200/%EA%B7%80%EC%B0%AE%EC%9D%80-api-%EB%AC%B8%EC%84%9C-swagger-UI%EB%A1%9C-%EC%9E%90%EB%8F%99%ED%99%94
- Rest Api - model 만들기
  - https://1-day-1-coding.tistory.com/51


#### 제작시 참고상황.
- MVC 패턴을 고려하여 만든다.
  - M (model) : restapi 구조로 작성한다.
  - C (Controller) : Model 조작에 대한 동적인 함수를 제공한다.
    - R (Router) : 요청에 대한 응답을 결정한다.
    - S (Socket) : WS(Web Socket) 프로토콜을 이용하여 채팅방을 구현한다.
  - V (View) : nunjucks view 엔진을 사용한다. 추후에는 React로 싱글페이지를 구현하다.


#### 명명(이름 규칙)
- 데이터 베이스
  - 데이터 베이스 이름의 첫번째는 반드시 대문자이다.
  - 단어와 단어 사이의 구분을 위해 단어의 첫번째 문자는 반드시 대문자로 정한다.
  - 
  
