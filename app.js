import http from "http";
import fs from "fs";
import qs from "querystring";

//method
import home from './method/home.js'
import add from './method/add.js'
import detail from './method/detail.js'


//* page를 readFile로 읽기 > err일 때 : 404에러
//[x] write에 넣어주고 이 외의 req.url일 때 404 에러

//TODO데이터 유효성 검사 필요성 있음
const server = http.createServer((req, res) => {
    //! 지정한 url이외의 요청, else문 안에 넣어야함
    else {
      res.writeHead(404, { "content-type": "text/plain; charset=uft-8" });
      res.write("NOT FOUND");
      res.end();
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
  //GET
  if(req.method==="GET"){
    //진입
    if(req.url==='/'){
      res.writeHead(200,{'content-type':'text/html; charset=utf-8'})
      res.write(home.indexHtml(home.url));
      res.end()
    }
    //admin : 관리자
    if(req.url==='/admin'){
      res.writeHead(200,{'content-type':'text/html; charset=utf-8'})
      res.write(home.indexHtml(home.adminUrl));
      res.end()
    }
    //detail : 상세페이지 - id가 포함되어 있으면면
    //admin, edit, delete가 각각 포함된 경로가 있음
    //조건문으로 제어
    if(!req.url.includes('admin')&& req.url.includes('id')&&!req.url.includes('edit')&&!req.url.includes('delete')){
      res.writeHead(200,{'content-type':'text/html; charset=utf-8'})
      res.write(detail.detailHtml(req.url,''))
      res.end()
    }
    //admin+detail : 관리자 > 상세페이지
    if(req.url.includes('admin')&&req.url.includes('id')){
      res.writeHead(200,{'content-type':'text/html; charset=utf-8'})
      res.write(detail.detailHtml(req.url,'admin'))
      res.end()
    }
    //add : 추가페이지
    if(req.url==='/add'){
      res.writeHead(200,{'content-type':'text/html; charset=utf-8'})
      res.write(add.addHtml('first','plus',req.url))
      res.end()
    }
    //edit : 수정하기
    if(req.url.includes('edit')){
      res.writeHead(200,{'content-type':'text/html;charset=utf-8'})
      res.write(add.addHtml('edit','edit',req.url));
      res.end()
    }
    //delete : 삭제하기
    //list.json에서 해당 데이터를 삭제하고 홈페이지로 이동하면 삭제한 내용에 대한 목록 지워짐
    if(req.url.includes('delete')){
      let listJson = fs.readFileSync('list.json')
      let list = JSON.parse(listJson)

      //url을 통해 데이터 찾음
      //'/delete/'를 삭제 후 객체로 만듦
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