const homePage = {
  //객체 데이터의 date, name : url로 사용
  //name : 제목으로 사용
  //liTag 만드는 함수
  liTag: function (obj) {
    let url = qs.stringify(list[0]).split("&", 2).join("&");

    return `<li><a href=/${url}>${obj.name}</a></li>`;
  },
  //배열에 liTag()를 사용해서 길이만큼 li태그 생성
  //ul태그 안에 넣어서 <ul><li></li></ul> 만드는 함수
  ulTag: function (obj) {
    let liTags = obj.reduce((acc, i) => acc + homePage.liTag(i), "");
    return `<ul>${liTags}</ul>`;
  },
  //목록이 나올 부분에 ulTag()함수를 사용해서 html문자열 반환하는 함수
  indexHtml: function (obj) {
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
        ul > li {
          margin-bottom: 10px;
        }
      </style>
    </head>
    <body>
      <div id="root">
        <h1>오늘 간식</h1>
        <section>
          <a href="/add">추가</a>
          ${ulTag(obj)}
        </section>
      </div>
    </body>
  </html>
    `;
    return htmlString;
  },
};
