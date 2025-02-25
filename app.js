const http = require('node:http')
const fs = require('node:fs')

//html에 대한 서버
const server = http.createServer((req, res)=>{
  //요청확인
  console.log(`${req.method} ${req.url}`)
  if(req.method==="GET"){
    if(req.url==='/'){
      res.writeHead(200,{'content-type':'text/html;charset=utf-8'})
      res.set
      res.write(fs.readFileSync('index.html'))
      res.end()
    }
  }
})

server.listen(8000,()=>{
  console.log('http://localhost:8000')
})

//json파일에 대한 서버
const jsonServer =http.createServer((req,res)=>{
  res.statusCode=200
  res.setHeader('content-type','text/html;charset=utf-8')
  res.setHeader('Access-Control-Allow-Origin','http://localhost:8000')
  res.setHeader('Access-Control-Allow-Headers','Content-Type')
  res.write(fs.readFileSync('list.json'))
  res.end()
})

jsonServer.listen(8010,()=>{
  console.log('http://localhost:8010')
})