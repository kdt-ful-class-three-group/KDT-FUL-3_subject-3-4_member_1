import qs from 'querystring'
import fs from 'fs'

//홈페이지 구성요소
//추가하기 버튼, 글 목록

//list.json의 데이터 형식
//데이터 인식을 위해 id 추가
//예시 : {id: '111111', date : '20250220',name : '하리보', content: '작은 사이즈 봉투에 들어있음'}

const home = {
  // list.json에서 id와 date 정보를 url에 포함시키기 위한 함수
  url: function(obj){
    return qs.stringify(obj).split("&",2).join("&")
  },
  // '/admin'으로 접근했을 때를 위한 url 문자열 함수
  adminUrl : function(obj){
    return 'admin/'+home.url(obj)
  },
  //liTag를 만드는 함수
  //'admin' '/' 에 따른 a태그 링크 다름
  //목록 이름은 name
  liTag: function(urlFunc,obj){
    return `<li><a href=/${urlFunc(obj)}>${obj.name}</a></li>`;
  },
  //liTag를 사용해서 ul 태그를 만드는 함수
  ulTag: function(urlFunc,obj){
    let liTags = obj.reduce((acc, i) => acc + this.liTag(urlFunc,i), "");
  return `<ul>${liTags}</ul>`;
  },
  //'/admin'으로 접근했을 때만 보이는 a태그
  aAddTag : function(){
    return '<a href="/add">추가</a>'
  },
  // write()로 읽을 html문자열
  //urlFunc는 진입경로에 따른 함수 사용 결정
  indexHtml: function(urlFunc){
    let string = "";
    let aTag= ''
    
    //list.json이 존재하지 않을때의 조건 포함
    //list.json파일이 존재하지 않으면 빈배열을 넣어서 생성
    if (!fs.existsSync("list.json")) {
      fs.writeFileSync("list.json", JSON.stringify([]));
    } 
    //list.json파일이 있으면 데이터 가져오기
    else {
      let listJson = fs.readFileSync("list.json");
      let list = JSON.parse(listJson);
      string = this.ulTag(urlFunc,list);
    }
    
    //li태그가 포함된 ul태그와 경로에 따른 a태그 사용 유무 판단
    if(urlFunc===home.adminUrl){
      aTag = home.aAddTag()
    }
    
    let htmlString = `
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
          ${aTag}
          ${string}
        </section>
      </div>
    </body>
  </html>
`;
      return htmlString;
  }
}

export default home