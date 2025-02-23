# 프로젝트 구조 설명
KDT-Ful-3_SUBJECT-3-4_member_1/  
├── method/ # app.js안에 사용한 메서드  
│   ├── add.js # 추가,수정 페이지 문자열  
│   ├── detail.js # 상세페이지 문자열  
│   ├── home.js # 시작페이지 문자열  
│   ├── read.js # 파일 읽는 메서드  
├── app.js # 진입점, 서버 실행  
├── list.json # form태그에서 입력한 데이터  
├── package.json # 의존성  
└── README.md # 프로젝트 설명  

# 실행 방법
1. 저장소를 클론  
  git clone https://github.com/kdt-ful-class-three-group/KDT-FUL-3_subject-3-4_member_1.git

2. 프로젝트 폴더로 이동  
  cd KDT-FUL-3_subject-3-5_member_1

3. 터미널 명령어 입력 후 'localhost:8000'으로 이동  
  node app.js

# 구현 기능 목록
### 1. create
- 추가 버튼을 통해 데이터를 추가할 수 있음

### 2. read
- html문자열을 읽을 수 있음
- 목록, 상세페이지에서 데이터를 읽을 수 있음

### 3. update
- 수정 버튼을 통해 특정 데이터를 수정하고 데이터에 반영할 수 있음

### 4. delete
- 삭제 버튼을 통해 특정 데이터를 삭제하고 데이터에 반영할 수 있음
- 삭제한 후 목록이 보이는 페이지로 이동함

### 5. /admin
- 특정 경로로 들어가야 추가, 수정, 삭제 버튼이 보임
- '/' 경로에서는 목록과 상세페이지 볼 수 있음

# 학습 내용 정리
1. update에서 데이터를 수정
- a. url에서 데이터를 객체로 변환
- b. list.json을 불러와서 JSON.parse 사용 : 배열로 변환
- c. 배열 메서드를 사용해 url의 데이터를 가지고 있는 요소 찾음
- d. 수정한 값을 요소에 할당
- e. writeFileSync()를 사용해 list.json을 바뀐 데이터로 다시 생성
- f. 수정한 값을 사용해 생성한 url로 이동하면 상세페이로 이동, 수정된 내용 볼 수 있음

2. delete에서 데이터를 삭제하고 경로 이동
- a. a태그를 사용해서 GET방식에서 응답
- b. url에서 만든 데이터와 list.json을 불러와 비교
- c. 해당 요소가 아닌 요소들로만 배열 재반환 : filter() 사용
- d. 재구성된 배열을 writeFileSync()를 사용해서 list.json을 다시 생성
- f. 목록이 보이는 홈페이지로 이동

3. 데이터 유효성 검사
- date에 대한 유효성 검사 필요성 느낌 : 2025MMDD
- input에서 값을 받으면 숫자를 입력해도 string 타입
- Number() 함수를 사용해 타입을 string에서 number로 바꾼후 year, month, day로 분리
- 각각 조건에 맞게 조건문 작성한 후 적합하지 않으면 alert()이 script에 적힌 페이지로 이동
- 조건에 맞으면 list.json에 저장됨

4. admin 관리자
- 함수로 경로에 admin이 포함될 때와 아닐 때를 구별
- 추가, 수정, 삭제 버튼은 admin이 있어야 보이도록 구성
- 추가, 수정, 삭제를 한 뒤에도 계속 버튼이 보이도록 경로 수정
- '/'를 통해서 들어오면 글 목록과 상세페이지로 이동만 가능함