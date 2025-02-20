import http from "http";
import fs from "fs";
import qs from "querystring";

//홈페이지
//[ ]추가하기(/add)버튼
//[ ]글 목록 (ul, li)

//[x]form태그로 받아올 데이터 객체 형식 정하기
//{date : '2025-02-20',name : '하리보', content: '작은 사이즈 봉투에 들어있음'}

//[ ]liTag 만드는 함수

//[ ]liTag를 사용해서 ul태그 만드는 함수

//[ ]만들어진 ul태그를 사용해서 홈페이지 문자열 만드는 함수

const server = http.createServer((req, res) => {
  //req.method, req.url 확인
  console.log(`${req.method}  ${req.url}`);
  //GET
  if (req.method === "GET") {
  }
  //POST
  if (req.method === "POST") {
  }
});

//8000번 포트 사용
PORT = 8000;
server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
