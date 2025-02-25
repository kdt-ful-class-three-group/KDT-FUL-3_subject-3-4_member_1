const http = require('node:http')
const fs = require('node:fs')

//html에 대한 서버
const server = http.createServer((req, res)=>{
  //요청확인
  console.log(`${req.method} ${req.url}`)
  if(req.method==="GET"){
    if(req.url==='/'){
      res.writeHead(200,{'content-type':'text/html;charset=utf-8'})
      res.write(fs.readFileSync('index.html'))
      res.end()
      //CORS
      res.setHeader('Access-Control-Allow-Origin','http://localhost:8010')
    }
  }
})

server.listen(8000,()=>{
  console.log('http://localhost:8000')
})

//json파일에 대한 서버
const jsonServer =http.createServer((req,res)=>{
  res.writeHead(200,{'content-type':'application/json; charset=utf-8'})
  res.write(fs.readFileSync('list.json'))
  res.end()
})

jsonServer.listen(8010,()=>{
  console.log('http://localhost:8010')
})