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
//인식을 위해서 id 추가함
// {id: '111111', date : '20250220',name : '하리보', content: '작은 사이즈 봉투에 들어있음'}

//[x]liTag 만드는 함수
//a태그 > url에 id와 name을 포함
//제목은 list[i].name

//? [x] url > 그냥 들어갈 때, admin으로 들어갈 때
function url(obj){
  return qs.stringify(obj).split("&",2).join("&")
}
function adminUrl(obj){
  return 'admin/'+url(obj)
}
function liTag(urlFunc,obj) {
  return `<li><a href=/${urlFunc(obj)}>${obj.name}</a></li>`;
}

//[x]liTag를 사용해서 ul태그 만드는 함수
function ulTag(urlFunc,obj) {
  let liTags = obj.reduce((acc, i) => acc + liTag(urlFunc,i), "");
  return `<ul>${liTags}</ul>`;
}

function aAddTag(){
  return '<a href="/add">추가</a>'
}

//[x]만들어진 ul태그를 사용해서 홈페이지 문자열 만드는 함수
//[x] a태그에 hover하면 스타일 변화
//[x] list.json 파일이 존재하지 않으면 오류 발생
//파일이 존재하지 않아도 페이지는 열려야함 (초기 화면을 생각하면)
//만약에 파일이 존재하지 않으면 > ul태그 없이 작성
//만약에 파일이 있으면 원래 하려던 방향으로 진행
function indexHtml(urlFunc) {
  let string = "";
  let aTag= ''

  if (!fs.existsSync("list.json")) {
    fs.writeFile("list.json", JSON.stringify([]));
  } else {
    let listJson = fs.readFileSync("list.json");
    let list = JSON.parse(listJson);
    string = ulTag(urlFunc,list);
  }

  if(urlFunc===adminUrl){
    aTag = aAddTag()
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
      ${aTag}
      ${string}
      </section>
      </div>
      </body>
      </html>
      `;
  return htmlString;
}
// console.log(indexHtml(adminUrl))

//[x]addPage 함수 만들기
//따로 추가할 내용 없어보임...?
//일단 다 들고와
// [x] date는 숫자만 입력
// [x] date와 name만 입력해도 제출 완료 > content는 없어도 됨
// muunji/issue10-1-1에서 실험 결과 > input타입 변경, 속성 추가하기로 함
//[x] 데이터 유효성 검사를 위한 script넣을 변수 만들어주기
//[x] alert을 위한 함수 작성
//[x]form태그에서 랜덤 숫자 가져오기
//[x]만든 함수를 script에 포함하기
function randomId(){
  let randomScript = `
    let id = document.getElementsByTagName('input')[0]
    id.value = Math.floor(Math.random()*899999)+100000;
  `
  return randomScript
}
function alert(){
  return `alert("'2025MMDD'의 형식을 지켜주세요")`
}
function addHtml(when) {
  if(when === 'first'){
    when = randomId();
  }
  if(when === 'alert'){
    when = alert()+randomId()
  }
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
          <input type="hidden" name="id">
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
    <script>
    ${when}
    </script>
  </body>
</html>
`;
  return htmlString;
}

//[x] 상세 페이지
//url : /id=111111&date=20250101
//수정하기 버튼
//삭제하기 버튼

//[x]url을 통해 정보 칮기
//date를 수정하고 싶을 수도 있는데 date를 url에 넣으면 수정한 후엔...?
//[x]일단 url로 값을 찾는 거 부터 진행

//[x] 상세페이지에서 목록으로 이동하는 버튼
//? [x] admin에서 글 목록 : '/admin/id=111111&date=20250101'
//? admin으로 들어옴 : 수정하기, 삭제하기 버튼
//? /으로 진입했을 때 글 목록 : '/id=111111&date=20250101'
//? /으로 진입 : 수정하기, 삭제하기 버튼 없음

//? [x] 경로에 따른 객체 만드는 방식이 달라짐
//? [x] 경로에 따라 버튼의 유무 달라짐

function btnTag(url){
  return `<section>
      <ul>
        <li><a href="/edit/${url}">수정</a></li>
        <li><a href="/delete/${url}">삭제</a></li>
      </ul>
    </section>`
}


function detailHtml(url,admin){
  let listJson = fs.readFileSync('list.json');
  let list = JSON.parse(listJson)

  let urlObj  = {}
  let isBtn = ''

  if(admin===''){
    urlObj = qs.parse(url.slice(1))
  } else {
    urlObj = qs.parse(url.slice(7))
    isBtn = btnTag(url.slice(7).split('&',2).join('&'))
  }


  let find = list.filter(i=> (i.id === urlObj.id)&&(i.date===urlObj.date))[0]

  //값 찾는게 필요함
  //url에 id와 date가 있음
  //이 값이 들어있는 값을 찾는 게 중요할 듯
  //find / filter 사용

  let htmlString = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
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
    #root > div {
      position: absolute;
      top: 2%;
      right: 5%;
    }
    #root > div > a {
      background-color:#fff;
      font-size: 30px;
      color:#ccc;
    }
    #root > div > a:hover {
      color:black;
    }
    #root > section {
      width: 90%;
    }
    a{
      text-decoration: none;
      color: black;
      background-color: #ccc;
      padding: 5px 10px;
    }
    a:hover {
      background-color: black;
      color: white;
    }
    ul {
      list-style: none;
      display: flex;
      gap: 20px;
      padding: 0;
    }
    section > div > p:first-child {
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;
    }
  </style>
</head>
<body>
  <div id="root">
    <h1>${find.name}</h1>
    <div>
      <a href="/${admin}">x</a>
    </div>
    ${isBtn}
    <section>
      <div>
        <p>${find.date}</p>
        <p>${find.content}</p>
      </div>
    </section>
  </div>
</body>
</html>

  `

  return htmlString
}

//페이지 안에서 이동해도 req.url은 href안에 적힌 내용만 해당됨
//href안에 데이터 추가하기...?
//[x] 수정하기 /edit
//list.json에서 수정하고자하는 데이터에 접근할 수 있어야함함
//수정하기를 누르면 나오는 페이지는 addHtml가 동일한 구성에 입력창에 내용이 나오면 될듯듯

//admin이 포함 되었을 때면 수정 버튼 나타남 > url 문자열 처리 수정 필요성
function editHtml(url){
  //url에서 가져온 정보를 input value 안에 넣음
  let listJson = fs.readFileSync('list.json');
  let list = JSON.parse(listJson)

  let urlObj = qs.parse(url.slice(6))

  let find = list.filter(i=> (i.id === urlObj.id)&&(i.date===urlObj.date))[0]
  //post edit으로 가져온 정보를 수정
  let editHtml = `
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
      <form action="/edit" method="POST">
        <input type="hidden" name="id">
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
        <button type="submit">수정완료</button>
      </form>
    </section>
  </div>
  <script>
    let input = document.getElementsByTagName('input');
    let content = document.getElementsByTagName('textarea')[0]
    input[0].value = ${find.id}
    input[1].value = '${find.date}'
    input[2].value = '${find.name}'
    content.value = '${find.content}'
  </script>
</body>
</html>
  `

return editHtml
}
//[x] 삭제하기 /delete
//list.json에서 해당 데이터를 삭제
//그 후 홈페이지로 이동하면 글 목록에서 삭제되어 있을 듯

//삭제하기, 수정하기 둘 다 해당 데이터에 접근하는 게 중요한듯
//처음엔 date와 name으로 구별하려고 했는데 동일한 날짜에 동일한 제목이 있는 경우가 생각남
//list.word에 저장될 정보에 랜덤 숫자를 적용해볼까 생각중

//* page를 readFile로 읽기 > err일 때 : 404에러
//[x] write에 넣어주고 이 외의 req.url일 때 404 에러

//TODO데이터 유효성 검사 필요성 있음
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
      res.write(addHtml('first'));
      res.end();
    }
    //[x] 상세 페이지 : url에 id와 name이 포함되어 있으면
    else if (req.url.includes('id') && !req.url.includes('delete')&&!req.url.includes('edit')){
      res.writeHead(200,{'content-type':'text/html; charset=utf-8'});
      res.write(detailHtml(req.url));
      res.end()
    }
    //[x] 삭제하기
    else if (req.url.includes('delete')){
      //[x]url을 통해 데이터를 찾음
      //url에서 /delete/를 삭제해야함
      let listJson = fs.readFileSync('list.json');
      let list = JSON.parse(listJson)
    
      let urlObj = qs.parse(req.url.slice(8))
      console.log(urlObj)
    
      list = list.filter(i=> !((i.id === urlObj.id)&&(i.date===urlObj.date)))
      //삭제한 후 다시 writeFile하는 과정이 필요
      fs.writeFileSync('list.json',JSON.stringify(list));
      //[x]데이터 삭제후 다시 홈페이지로 돌아가기
      res.writeHead(200,{'content-type':'text/html; charset=urf-8'});
      res.write(indexHtml());
      res.end()
    }
    //[x]수정하기
    else if(req.url.includes('edit')){
      //페이지로 이동
      res.writeHead(200,{'content-type':'text/html; charset=utf-8'});
      res.write(editHtml(req.url));
      res.end()
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
    // [x] 입력한 데이터로 list.json 생성
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
        //[x]여기서 유효성 검사
        console.log(typeof dataObj.date)
        let year = Number(dataObj.date.slice(0,4))
        let month = Number(dataObj.date.slice(4,6))
        let day = Number(dataObj.date.slice(-2))
        console.log (year,month,day)
        if(!(year===2025 && (month>0||month<13)&&(day>0||day<32))){
          //[x]addPage로 돌아감 + alert 안내 메시지
          res.writeHead(200,{"content-type":'text/html;charset=utf-8'})
          res.write(addHtml('alert'))
          res.end();
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
        //[x] 객체를 문자열로 바꾼 후 저장 필요
        console.log(JSON.stringify(originObj))
        fs.writeFileSync('list.json',JSON.stringify(originObj));
        //[x] 홈페이지로 이동이 필요함
        res.writeHead(302,{location:'/'})
        res.write(indexHtml());
        res.end()
      });
    }
    //[x]수정하기 안에서 수정 완료
    if(req.url==='/edit'){
      let body = ""
      req.on('data',(data)=>
        body += data
      )
      req.on('end',()=>{
        //id 정보를 비교해서 동일하면 덮어씌우기
        //list.json 정보 -> 객체로 변경경
        let listJson = fs.readFileSync('list.json');
        let list = JSON.parse(listJson)
      
        //브라우저에서 입력한 정보 -> 객체
        let data = body.toString();
        let dataObj = qs.parse(data);
        //id로 해당 데이터를 찾고 값 덮어씌우기
        list.filter(i=>i.id === dataObj.id).map(i=> {
          i.name = dataObj.name; 
          i.date = dataObj.date; 
          i.content = dataObj.content
        })

        console.log(list)

        //다시 writeFile 사용
        fs.writeFileSync('list.json',JSON.stringify(list))
        //다시 상세페이지로 돌아가야함
        //date가 바뀔 수 있음 -> url에 /edit/이 지워지고 id와 name 정보가 들어가야함
        res.writeHead(200,{'content-type':'text.html; charset=utf-8'})
        res.write(detailHtml('/'+data));
        res.end()
      })
    }
  }
});

//8000번 포트 사용
const PORT = 8000;
server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

//! admin 경로를 테스트할 서버
const serverTwo = http.createServer((req,res)=>{
  //경로 확인
  console.log(`${req.method} ${req.url}`)
  if(req.method==="GET"){
    //진입입
    if(req.url==='/'){
      res.writeHead(200,{'content-type':'text/html; charset=utf-8'})
      res.write(indexHtml(url));
      res.end()
    }
    //admin
    if(req.url==='/admin'){
      res.writeHead(200,{'content-type':'text/html; charset=utf-8'})
      res.write(indexHtml(adminUrl));
      res.end()
    }
    //detail
    if(!req.url.includes('admin')&& req.url.includes('id')&&!req.url.includes('edit')&&!req.url.includes('delete')){
      res.writeHead(200,{'content-type':'text/html; charset=utf-8'})
      res.write(detailHtml(req.url,''))
      res.end()
    }
    //admin+detail
    if(req.url.includes('admin')&&req.url.includes('id')){
      res.writeHead(200,{'content-type':'text/html; charset=utf-8'})
      res.write(detailHtml(req.url,'admin'))
      res.end()
    }
    ///add
    if(req.url==='/add'){
      res.writeHead(200,{'content-type':'text/html; charset=utf-8'})
      res.write(addHtml('first'))
      res.end()
    }
    //edit
    if(req.url.includes('edit')){
      res.writeHead(200,{'content-type':'text/html;charset=utf-8'})
      res.write(editHtml(req.url));
      res.end()
    }
    //delete
    if(req.url.includes('delete')){
      let listJson = fs.readFileSync('list.json')
      let list = JSON.parse(listJson)

      //url을 통해 데이터 찾음
      let urlObj = qs.parse(req.url.slice(8));
      list = list.filter(i=>!((i.id===urlObj.id)&&(i.date===urlObj.date)))
      //삭제한 후 덮어씌우기
      fs.writeFileSync('list.json',JSON.stringify(list));
      // /admin으로 돌아가야함
      res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
      res.write(indexHtml(adminUrl))
      res.end()
    }
  }
  if(req.method==='POST'){
    ///plus
    if(req.url==='/plus'){
      //data 가져옴
      let body = '';
      req.on('data',(data)=>{
        body += data;
      })
      //data 가져온 후 list.json에 저장
      req.on('end',()=>{
        //입력한 데이터를 객체로 변경
        let data = body.toString()
        let dataObj = qs.parse(data)
        //데이터 유효성 검사
        let year = Number(dataObj.date.slice(0,4))
        let month = Number(dataObj.date.slice(4,6))
        let day = Number(dataObj.date.slice(-2))
        //유효성 검사 실패시 경고 페이지
        if(!(year===2025 && (month>0||month<13)&&(day>0||day<32))){
          res.writeHead(200,{'content-type':'text/html; charset=utf-8'})
          res.write(addHtml('alert'))
          res.end()
          return
        }
        //통과하면 기존의 list.json파일 읽어와서 객체로변경
        let origin = fs.readFileSync('list.json')
        let originObj = JSON.parse(origin)
        //데이터 추가후 덮어씌우기
        originObj.push(dataObj)
        fs.writeFileSync('list.json',JSON.stringify(originObj))
        // /admin으로 이동
        res.writeHead(302,{location:'/admin'})
        res.write(indexHtml(adminUrl))
        res.end()
      })
    }
    //edit
    if(req.url==='/edit'){
      //데이터 받아오기
      let body = ''
      req.on('data',(data)=>{
        body += data
      })
      // 데이터 받아온후
      req.on('end',()=>{
        // list.json 정보 > 객체로 변경
        let listJson = fs.readFileSync('list.json')
        let list = JSON.parse(listJson)
        // 브라우저 에서 입력한 정보 -> 객체로
        let data = body.toString()
        let dataObj = qs.parse(data)
        // id 정보를 비교해서 동일하면 덮어씌우기
        list.filter(i=>i.id === dataObj.id).map(i=> {
          i.name = dataObj.name; 
          i.date = dataObj.date; 
          i.content = dataObj.content
        })
        fs.writeFileSync('list.json',JSON.stringify(list))
        // 경로에 edit이 지워지고 admin이 붙은 경로로 돌아가야함  
        res.writeHead(200,{'content-type':'text/html; charset=utf-8'})
        res.write(detailHtml(`/admin/${data.split('&',2).join('&')}`,'admin'))
        res.end()
      })
    }
  }
})

serverTwo.listen(3050,()=>{
  console.log('http://localhost:3050/admin')
})