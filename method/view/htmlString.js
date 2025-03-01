const htmlString = {
  /**
   * homePage에 대한 html문자열
   * @param {String} addATag isAdmin에 따라 결정될 aTag유무
   * @param {Function} callback isAdmin에 따라 결정될 url
   * @returns {string} home.html에 해당하는 문자열
   */
  homeHtml : function(addATag,callback){
    return `
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>HOME</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100vh;
            }
            a {
              text-decoration: none;
              color: black;
            }
            ul {
              list-style: none;
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
            section > a {
              background-color: #ccc;
              padding: 5px 10px;
            }
            section > a:hover {
              background-color: black;
              color:white;
            }
            ul > li {
              margin-bottom: 10px;
            }
            ul > li > a:hover {
              color: #ccc;
            }
          </style>
        </head>
        <body>
          <div id="root">
            <h1>오늘 간식</h1>
            <section>
              ${addATag}
              ${callback}
            </section>
          </div>
        </body>
      </html>
    `
  },
  /**
   * form태그가 있는 페이지
   * 추가버튼 또는 수정버튼을 눌렀을 때 나오는 페이지
   * 경로는 '/edit/...' 또는 '/...'
   * @param {String} action form태그의 action경로, 'edit' 또는 'add'
   * @param  {...any} script script모듈의 함수, 필요에 따라 여러개 입력 가능 
   * @returns {String} form태그가 있는 페이지 문자열
   */
  formHtml : function(action,...script){
    return `
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
        <script>${script}</script>
      </body>
    </html>
    `
  }
}

export default htmlString