const http = require('node:http')
const fs = require('node:fs')

//html에 대한 서버
const server = http.createServer((req, res)=>{

})

server.listen(8000,()=>{
  console.log('http://localhost:8000')
})

//json파일에 대한 서버
const jsonServer =http.createServer((req,res)=>{

})

jsonServer.listen(8010,()=>{
  console.log('http://localhost:8010')
})