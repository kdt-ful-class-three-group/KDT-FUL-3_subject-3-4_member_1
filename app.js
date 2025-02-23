import http from "http";
import fs from "fs";
import qs from "querystring";

//method
import home from './method/home.js'
import add from './method/add.js'
import detail from './method/detail.js'

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
      res.write(home.indexHtml(home.url));
      res.end()
    }
    //admin
    if(req.url==='/admin'){
      res.writeHead(200,{'content-type':'text/html; charset=utf-8'})
      res.write(home.indexHtml(home.adminUrl));
      res.end()
    }
    //detail
    if(!req.url.includes('admin')&& req.url.includes('id')&&!req.url.includes('edit')&&!req.url.includes('delete')){
      res.writeHead(200,{'content-type':'text/html; charset=utf-8'})
      res.write(detail.detailHtml(req.url,''))
      res.end()
    }
    //admin+detail
    if(req.url.includes('admin')&&req.url.includes('id')){
      res.writeHead(200,{'content-type':'text/html; charset=utf-8'})
      res.write(detail.detailHtml(req.url,'admin'))
      res.end()
    }
    ///add
    if(req.url==='/add'){
      res.writeHead(200,{'content-type':'text/html; charset=utf-8'})
      res.write(add.addHtml('first','plus',req.url))
      res.end()
    }
    //edit
    if(req.url.includes('edit')){
      res.writeHead(200,{'content-type':'text/html;charset=utf-8'})
      res.write(add.addHtml('edit','edit',req.url));
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
      res.write(home.indexHtml(home.adminUrl))
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
          res.write(add.addHtml('alert','plus',req.url))
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
        res.write(home.indexHtml(home.adminUrl))
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
        res.write(detail.detailHtml(`/admin/${data.split('&',2).join('&')}`,'admin'))
        res.end()
      })
    }
  }
})

serverTwo.listen(3050,()=>{
  console.log('http://localhost:3050/admin')
})