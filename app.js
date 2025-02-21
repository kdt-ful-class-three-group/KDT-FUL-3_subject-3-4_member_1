import http from "http";
import fs from "fs";
import qs from "querystring";

//list.json 파일이 존재한다면
// let listJson = fs.readFileSync("list.json");
// let list = JSON.parse(listJson);
//JSON문자열
// console.log(JSON.stringify(list[0]));
// console.log(qs.stringify(list[0]).split("&", 2).join("&"));

//홈페이지
//[x]추가하기(/add)버튼
//[x]글 목록 (ul, li)

//[x]form태그로 받아올 데이터 객체 형식 정하기
// list.json
// date를 숫자만 작성하면 크기 비교하기 괜찮을지도...?
// {date : '20250220',name : '하리보', content: '작은 사이즈 봉투에 들어있음'}

//[x]liTag 만드는 함수
//a태그 > url에 date와 name포함...?
//제목은 list[i].name
function liTag(obj) {
  let url = qs.stringify(obj).split("&", 2).join("&");

  return `<li><a href=/${url}>${obj.name}</a></li>`;
}

//[x]liTag를 사용해서 ul태그 만드는 함수
function ulTag(obj) {
  let liTags = obj.reduce((acc, i) => acc + liTag(i), "");
  return `<ul>${liTags}</ul>`;
}

//[x]만들어진 ul태그를 사용해서 홈페이지 문자열 만드는 함수
//[x] a태그에 hover하면 스타일 변화
//[x] list.json 파일이 존재하지 않으면 오류 발생
//파일이 존재하지 않아도 페이지는 열려야함 (초기 화면을 생각하면)
//만약에 파일이 존재하지 않으면 > ul태그 없이 작성
//만약에 파일이 있으면 원래 하려던 방향으로 진행
function indexHtml() {
  let string = "";

  if (!fs.existsSync("list.json")) {
    fs.writeFile("list.json", JSON.stringify([]));
  } else {
    let listJson = fs.readFileSync("list.json");
    let list = JSON.parse(listJson);
    string = ulTag(list);
  }

  let htmlString = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>HOME</title>
    <style>
    body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100vh;
      }
      a {
        text-decoration: none;
        color: black;
        }
        ul {
          list-style: none;
          }
          #root {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        }
        #root > section {
          width: 90%;
          }
          section > a {
            background-color: #ccc;
            padding: 5px 10px;
            }
            section > a:hover {
              background-color: black;
              color:white;
              }
      ul > li {
        margin-bottom: 10px;
        }
        ul > li > a:hover {
          color: #ccc;
          }
          </style>
          </head>
          <body>
    <div id="root">
    <h1>오늘 간식</h1>
      <section>
      <a href="/add">추가</a>
      ${string}
      </section>
      </div>
      </body>
      </html>
      `;
  return htmlString;
}

//[x]addPage 함수 만들기
//따로 추가할 내용 없어보임...?
//일단 다 들고와
// [x] date는 숫자만 입력
// [x] date와 name만 입력해도 제출 완료 > content는 없어도 됨
// muunji/issue10-1-1에서 실험 결과 > input타입 변경, 속성 추가하기로 함
function addHtml() {
  let htmlString = `
  <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>ADD</title>
<style>
      body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100vh;
        }
        #root {
          width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        }
        #root > section {
          width: 90%;
          }
          #root > section > form {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        gap: 20px;
      }
      form > div:last-of-type {
        display: flex;
        gap: 10px;
        }
      form > div:last-of-type textarea {
        width: 380px;
        }
        form > button {
          border-style: none;
          padding: 5px 10px;
          cursor: pointer;
          background-color: #ccc;
          }
          form > button:hover {
            background-color: black;
            color: #fff;
      }
      </style>
      </head>
      <body>
    <div id="root">
    <h1>간식 추가</h1>
    <section>
    <form action="/plus" method="POST">
    <div>
    <label for="date">간식 먹은 날</label>
    <input type="number" name="date" placeholder="2025MMDD" required/>
    <label for="name">간식</label>
            <input type="text" name="name" placeholder="간식 이름" required/>
            </div>
            <div>
            <label for="content">내용</label>
            <textarea
            name="content"
              placeholder="후기나 하고싶은 말"
            ></textarea>
            </div>
            <button type="submit">작성완료</button>
            </form>
            </section>
            </div>
            </body>
</html>
`;
  return htmlString;
}

//* page를 readFile로 읽기 > err일 때 : 404에러
//[x] write에 넣어주고 이 외의 req.url일 때 404 에러

//TODO 데이터 유효성 검사 필요성 있음
const server = http.createServer((req, res) => {
  //req.method, req.url 확인
  console.log(`${req.method}  ${req.url}`);
  //GET
  if (req.method === "GET") {
    if (req.url === "/") {
      res.writeHead(200, { "content-type": "utf-8;text/html" });
      res.write(indexHtml());
      res.end();
    }
    //작성완료 버튼
    else if (req.url === "/add") {
      res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
      res.write(addHtml());
      res.end();
    }
    //! 지정한 url이외의 요청, else문 안에 넣어야함
    else {
      res.writeHead(404, { "content-type": "text/plain; charset=uft-8" });
      res.write("NOT FOUND");
      res.end();
    }
  }
  //POST
  if (req.method === "POST") {
    //addPage에서 form 태그에 대한 응답
    // [ ] 입력한 데이터로 list.json 생성
    if (req.url === "/plus") {
      //data 받아올 때
      let body = "";
      req.on("data", (data) => {
        body += data;
      });
      //data 받아온 후
      req.on("end", () => {
        //[x]입력한 데이터를 객체로 변경
        let data = body.toString();
        let dataObj = qs.parse(data);
        //[ ]여기서 유효성 검사
        console.log(typeof dataObj.date)
        let year = Number(dataObj.date.slice(0,4))
        let month = Number(dataObj.date.slice(4,6))
        let day = Number(dataObj.date.slice(-2))
        console.log (year,month,day)
        if(!(year===2025 && (month>0||month<13)&&(day>0||day<32))){
          //[ ]addPage로 돌아감 + alert 안내 메시지
        }
        //[x]파일이 없으면 json파일을 만들고 빈 배열 넣어주기
        //indexHtml함수 안에서 처리 > 서버 실행되면 바로 진행됨
        //[x] 파일이 있으면 기존의 파일 데이터 가져오기
        let origin = fs.readFileSync("list.json");
        //[x] json에 저장된 데이터는 문자열-> 객체로 변경이 필요
        let originObj = JSON.parse(origin);
        //[x] 객체로 변경된 기존 데이터에 새로 받아온 데이터 추가
        originObj.push(dataObj);
        console.log(originObj);
        //[ ] 객체를 문자열로 바꾼 후 저장 필요
      });
    }
  }
});

//8000번 포트 사용
const PORT = 8000;
server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
