import fs from 'fs'

const read = {
  //server 안에서 받복되는 내용 함수로 작성
  readFunc:function(res,callback){
    //content-type은 항상 html
    res.writeHead(200,{'content-type':'text/html; charset=utf-8'})
    //경로에 따라 함수가 바뀜
    res.write(callback);
    res.end()
  },
  //404에러 함수
  readErr : function(res){
    res.writeHead(404,{'content-type':'text/plain; charset=utf-8'})
    res.write('NOT FOUNT')
    res.end()
  },
  //리다이렉트
  readLocation : function(res,callback){
    res.writeHead(302,{location:'/admin'})
    res.write(callback)
    res.end()
  },
  //list.json 데이터를 객체로 변경
  readList : function(){
    let listJson = fs.readFileSync('list.json')
    let list = JSON.parse(listJson)
    return list
  }
}

export default read