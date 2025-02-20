import http from "http";
import fs from "fs";
import qs from "querystring";

//list.json 파일이 존재한다면
const list = [
  { date: "20250220", name: "하리보", content: "작은 사이즈 봉투에 들어있음" },
  {
    date: "20250221",
    name: "그래놀라",
    content: "바형식으로 되어있어 간단하게 먹기 좋음",
  },
  { date: "20250220", name: "감자칩", content: "수업시간에 하나씩 집어먹기" },
];

//홈페이지
//[ ]추가하기(/add)버튼
//[ ]글 목록 (ul, li)

//[x]form태그로 받아올 데이터 객체 형식 정하기
// list.json
// date를 숫자만 작성하면 크기 비교하기 괜찮을지도...?
// {date : '20250220',name : '하리보', content: '작은 사이즈 봉투에 들어있음'}

//[ ]liTag 만드는 함수
//a태그 > url에 date와 name포함...?
//제목은 list[i].name
function liTag(){
  return `<li><a href=${}>${}</a></li>`
}

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
