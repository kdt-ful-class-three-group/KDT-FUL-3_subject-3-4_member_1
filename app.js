import http from "http";
import fs from "fs";
import qs from "querystring";

//method
import home from './method/home.js'
import add from './method/add.js'
import detail from './method/detail.js'
import read from './method/read.js'

//server
const server= http.createServer((req,res)=>{
  //경로 확인
  console.log(`${req.method} ${req.url}`)
  //GET
  if(req.method==="GET"){
    //진입
    if(req.url==='/'){
      read.readFunc(res,home.indexHtml(home.url))
    }
    //admin : 관리자
    else if(req.url==='/admin'){
      read.readFunc(res,home.indexHtml(home.adminUrl))
    }
    //detail : 상세페이지 - id가 포함되어 있으면면
    //admin, edit, delete가 각각 포함된 경로가 있음
    //조건문으로 제어
    else if(!req.url.includes('admin')&& req.url.includes('id')&&!req.url.includes('edit')&&!req.url.includes('delete')){
      read.readFunc(res,detail.detailHtml(req.url,''))
    }
    //admin+detail : 관리자 > 상세페이지
    else if(req.url.includes('admin')&&req.url.includes('id')){
      read.readFunc(res,detail.detailHtml(req.url,'admin'))
    }
    //add : 추가페이지
    else if(req.url==='/add'){
      read.readFunc(res,add.addHtml('first','plus',req.url))
    }
    //edit : 수정하기
    else if(req.url.includes('edit')){
      read.readFunc(res,add.addHtml('edit','edit',req.url))
    }
    //delete : 삭제하기
    //list.json에서 해당 데이터를 삭제하고 홈페이지로 이동하면 삭제한 내용에 대한 목록 지워짐
    else if(req.url.includes('delete')){
      let list = read.readList()

      //url을 통해 데이터 찾음
      //'/delete/'를 삭제 후 객체로 만듦
      let urlObj = qs.parse(req.url.slice(8));
      list = list.filter(i=>!((i.id===urlObj.id)&&(i.date===urlObj.date)))
      //삭제한 후 덮어씌우기
      fs.writeFileSync('list.json',JSON.stringify(list));
      // /admin으로 돌아가야함
      read.readFunc(res,home.indexHtml(home.adminUrl))
    }
    //404 : 주어진 경로 외의 요청이 있을 때
    //else문 안에 넣어야함
    else {
      read.readErr(res)
    }
  }
  //POST
  if(req.method==='POST'){
    //plus : /add에서 from태그 제출
    //입력한 데이터로 list.json 생성
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
          readFunc(res,add.addHtml('alert','plus',req.url))
          return
        }
        //통과하면 기존의 list.json파일 읽어와서 객체로변경
        let originObj = read.readList()
        //데이터 추가후 덮어씌우기
        originObj.push(dataObj)
        fs.writeFileSync('list.json',JSON.stringify(originObj))
        // /admin으로 이동
        readLocation(res,home.indexHtml(home.adminUrl))
      })
    }
    //edit : admin > 상세페이지에서 수정 버튼
    if(req.url==='/edit'){
      //데이터 받아오기
      let body = ''
      req.on('data',(data)=>{
        body += data
      })
      // 데이터 받아온후
      req.on('end',()=>{
        // list.json 정보 > 객체로 변경
        let list = read.readList()
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
        //경로에는 id와 name만 포함되어야함
        read.readFunc(res,detail.detailHtml(`/admin/${data.split('&',2).join('&')}`,'admin'))
      })
    }
  }
})

const PORT = 8000
server.listen(PORT,()=>{
  console.log(`http://localhost:${PORT}`)
})