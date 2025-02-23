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

3. 터미널 명령어 입력 후 'localhost:8000'으로 이동동
  node app.js

# 구현 기능 목록
1. create
- 추가 버튼을 통해 데이터를 추가할 수 있음
2. read
- html문자열을 읽을 수 있음
- 목록, 상세페이지에서 데이터를 읽을 수 있음
3. update
- 수정 버튼을 통해 특정 데이터를 수정하고 데이터에 반영할 수 있음
4. delete
- 삭제 버튼을 통해 특정 데이터를 삭제하고 데이터에 반영할 수 있음
- 삭제한 후 목록이 보이는 페이지로 이동함
5. /admin
- 특정 경로로 들어가야 추가, 수정, 삭제 버튼이 보임
- '/' 경로에서는 목록과 상세페이지 볼 수 있음

# 학습 내용 정리
1. list.json을 활용해서 url에 적용
2. update에서 데이터를 수정
3. delete에서 데이터를 삭제하고 경로 이동
4. 데이터 유효성 검사
5. admin 관리자