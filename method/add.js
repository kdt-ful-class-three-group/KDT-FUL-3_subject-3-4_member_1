const add = {
  //list.json과 url에 사용할 id에 랜덤 숫자 부여하는 함수수
  randomId: function() {
    return `
    let id = document.getElementsByTagName('input')[0]
    id.value = Math.floor(Math.random()*899999)+100000;
  `
  },
  //데이터 형식이 잘못되었을 때 경고창
  alert: function(){
    return `alert("'2025MMDD'의 형식을 지켜주세요")`
  },
  editLogic: function(url){
    let listJson = fs.readFileSync('list.json');
    let list = JSON.parse(listJson)
        
    let urlObj = qs.parse(url.slice(6))
        
    let find = list.filter(i=> (i.id === urlObj.id)&&(i.date===urlObj.date))[0]

    return find
  },
  editScript : function(url){
    let find = add.editLogic(url);

    let script = `
      let input = document.getElementsByTagName('input');
      let content = document.getElementsByTagName('textarea')[0]
      input[0].value = ${find.id}
      input[1].value = '${find.date}'
      input[2].value = '${find.name}'
      content.value = '${find.content}'`

    return script
  }
  //date, name, content 입력창, 제출 버튼이 있는 form태그
  //필수 작성 요소 : date, name
  //date : 2025MMDD
  addHtml: function(when,action){
    //add, edit을 결정할 action
    let action = 'plus'
    //id를 위한 숨겨진 입력창이 포함됨
    if(when === 'first'){
      when = add.randomId();
    }
    //데이터 형식이 잘못되었을 때는 alert메서드 포함
    if(when === 'alert'){
      when = add.alert()+add.randomId()
    }
    if(action === 'edit'){
      action = 'edit'
      when 
    }
    let htmlString = `
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
          <form action="/${action}" method="POST">
            <input type="hidden" name="id">
            <div>
              <label for="date">간식 먹은 날</label>
              <input type="number" name="date" placeholder="2025MMDD" required/>
              <label for="name">간식</label>
              <input type="text" name="name" placeholder="간식 이름" required/>
            </div>
            <div>
              <label for="content">내용</label>
              <textarea name="content"  placeholder="후기나 하고싶은 말"></textarea>
            </div>
            <button type="submit">작성완료</button>
          </form>
        </section>
      </div>
      <script>${when}</script>
    </body>
  </html>
`;
  return htmlString;
  }
}

export default add