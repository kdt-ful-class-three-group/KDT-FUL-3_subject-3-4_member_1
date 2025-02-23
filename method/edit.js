import fs from 'fs'
import qs from 'querystring'

//페이지 안에서 이동해도 req.url은 href안에 적힌 내용만 해당
//list.json에서 수정하고자하는 데이터에 접근할 수 있어야함
//admin이 포함 되었을 때면 수정 버튼 나타남

const edit = {
  //url에서 가져온 정보를 input value 안에 넣음
  //post edit으로 가져온 정보를 수정
  //addHtml과 형식은 동일 + 값이 미리 적혀있는 것
  editHtml: function(url){
    let listJson = fs.readFileSync('list.json');
    let list = JSON.parse(listJson)
    
    let urlObj = qs.parse(url.slice(6))
    
    let find = list.filter(i=> (i.id === urlObj.id)&&(i.date===urlObj.date))[0]

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
}

export default edit