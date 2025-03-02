import http from 'node:http'
import fs from 'fs'
import qs from 'querystring'

const server = http.createServer((req,res)=>{
  //method url 확인
  console.log(`${req.method} ${req.url}`)

  //GET
  if(req.method === 'GET'){
    //진입
    if(req.url==='/'){
      
    }
  }
})

server.listen(3080,()=>{
  console.log('http://localhost:3080')
})