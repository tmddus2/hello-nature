# hello-nature
:green_heart: :herb: :four_leaf_clover:
### 필요한 개발환경

- 안드로이드 스튜디오
    - 안드로이드 기기 혹은 에뮬레이터를 연결해주세요.
- IntelliJ 혹은 스프링부트 프로그램을 실행시킬 수 있는 IDE 환경

### 소스 코드 다운로드

git clone 혹은 Download ZIP 버튼을 눌러서 소스 코드를 다운로드 받아주세요.
<img width="462" alt="스크린샷 2022-09-16 오후 8 02 22" src="https://user-images.githubusercontent.com/49024958/190628602-956f0dc9-fa55-4d95-85d1-95c4c3692df1.png">

### 실행 방법

1. (로컬 환경에서) 백엔드 서버 실행

**준비 단계**
'프로그램 실행을 위한 키값' 폴더에 있는 resources.zip 파일을 앱축해제하고 안에 들어 있는 application.yml 파일을 다음 경로에 복사해주세요.

/Users/mjjwa/Downloads/hello-nature-main/backend/src/main/resources 아래

/Users/mjjwa/Downloads/hello-nature-main/backend/src/main/resources/application.yml 처럼 넣어주세요.

*AWS RDS 키 값입니다. 

**실행 하기**

- (개발 환경) 컴퓨터에 java JDK와 intelliJ가 설치되어야합니다.

IntelliJ에서 폴더로 이동

```jsx
cd hello-nature-main/backend/src/main/java/helloNature/backend
```

[BackendApplication.java](http://BackendApplication.java) 실행하기 

backend 폴더 안에 있는 BackendApplication을 실행시켜주세요.
![Untitled](https://user-images.githubusercontent.com/49024958/190628549-07fa9281-0423-4312-95ff-018e7487775b.png)



1. 프론트엔드 실행 

**준비 단계**

'프로그램 실행을 위한 키값' 폴더에 있는 raw.zip 파일을 앱축해제하고 credentials.json과 plantchatbot1.json 파일이 들어있는 raw 폴더를 

cd hello-nature-main/helloNature/android/app/src/main/res 위치 아래 

cd hello-nature-main/helloNature/android/app/src/main/res/raw 처럼 넣어주세요. 

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
