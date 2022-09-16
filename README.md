# hello-nature
:green_heart: :herb: :four_leaf_clover:
### 필요한 개발환경

- 안드로이드 스튜디오
    - 안드로이드 기기 혹은 에뮬레이터를 연결해주세요.
- IntelliJ 혹은 스프링부트 프로그램을 실행시킬 수 있는 IDE 환경

### 소스 코드 다운로드

git clone 혹은 Download ZIP 버튼을 눌러서 소스 코드를 다운로드 받아주세요.

![스크린샷 2022-09-16 오후 8.02.22.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/229e39a0-a589-4642-8535-dfb2130638ee/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-09-16_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_8.02.22.png)

### 실행 방법

1. (로컬 환경에서) 백엔드 서버 실행

**준비 단계**

키 값을 “path”에 폴더를 만들어서 넣어주세요. 

*AWS RDS 키 값입니다. 

**실행 하기**

- (개발 환경) 컴퓨터에 java JDK와 intelliJ가 설치되어야합니다.

IntelliJ에서 폴더로 이동

```jsx
cd hello-nature-main/backend/src/main/java/helloNature/backend
```

[BackendApplication.java](http://BackendApplication.java) 실행하기 

backend 폴더 안에 있는 BackendApplication을 실행시켜주세요.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c11a9cc5-5170-4b6b-9f29-552d16d04948/Untitled.png)

1. 프론트엔드 실행 

**준비 단계**

credentials.json과 plantchatbot1.json 파일을 “path”에 폴더를 만들어서 넣어주세요. 

*MLkit와 Dialogflow 관련  GCP 서비스 계정의 키 값입니다

**실행 하기**

- (개발 환경) 컴퓨터에 npm과 react native 프로그램을 돌릴 수 있는 IDE와 개발 환경이 설치되어야합니다.

폴더로 이동하기

```jsx
cd hello-nature-main/helloNature
```

configuration 설치하기

```jsx
npm install 
```

실행시키기 

```jsx
npm run android 또는 react-native run android
```

(*실행 에러 발생 시 1. cd android 2. ./gradlew clean 3. cd .. 4. npm cache clean -force 한 후 다시 npm run android 명령어 입력)
