//json가져오기위한 모듈
import read from '../read.js'
//json파일 유무 확인을 위한 모듈
import exist from '../controller/existJson.js'
//tag모듈
import tag from './tag.js'
//test하기 위해 url 모듈 가져옴
import url from '../controller/url.js'

const html = {
  /**
   * '/' 경로에 따른 홈페이지
   * @param {Boolean} isAdmin - admin이면 true, 아니면 false 
   * @returns {String} 홈페이지 문자열
   */
  home : function(isAdmin){

    //isAdmin에 따라 aTag유무 결정
    let addATag = isAdmin?tag.hrefATag('/add','추가'):''
    let urlFunc = isAdmin?url.adminUrl:url.makeUrl

    //json파일 존재하는지 확인 후 없으면 생성
    exist.check()
    
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
              ${tag.ulTag(urlFunc,read.readList())}
            </section>
          </div>
        </body>
      </html>`
  },
  form: function(){
    
  }
}

export default html