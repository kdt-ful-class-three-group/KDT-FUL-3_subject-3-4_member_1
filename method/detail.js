import fs from 'fs'
import qs from 'querystring'

const detail = {
  //admin으로 접속했을 때 보이는 a태그
  btnTag : function(url){
    return `<section>
      <ul>
        <li><a href="/edit/${url}">수정</a></li>
        <li><a href="/delete/${url}">삭제</a></li>
      </ul>
    </section>`
  },
  //홈페이지에서 목록을 클릭했을 때 보이는 화면
  //admin으로 접근하면 btnTag함수 사용
  detailHtml:function(url,admin){
    let listJson = fs.readFileSync('list.json');
    let list = JSON.parse(listJson)
  
    let urlObj  = {}
    let isBtn = ''
    
    //목록 url : /id=111111&date=20250101
    //admin에서 접근한 목록 url : /admin/id=111111&date=20250101
    if(admin===''){
      urlObj = qs.parse(url.slice(1))
    } else {
      urlObj = qs.parse(url.slice(7))
      isBtn = detail.btnTag(url.slice(7).split('&',2).join('&'))
    }
    
    //url의 data와 list.json의 데이터를 비교해서 url과 동일한 데이터 불러오기
    let find = list.filter(i=> (i.id === urlObj.id)&&(i.date===urlObj.date))[0]

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
}

export default detail