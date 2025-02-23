import qs from 'querystring'
import fs from 'fs'

const home = {
  url: function(obj){
    return qs.stringify(obj).split("&",2).join("&")
  },
  adminUrl : function(obj){
    return 'admin/'+this.url(obj)
  },
  liTag: function(urlFunc,obj){
    return `<li><a href=/${urlFunc(obj)}>${obj.name}</a></li>`;
  },
  ulTag: function(urlFunc,obj){
    let liTags = obj.reduce((acc, i) => acc + this.liTag(urlFunc,i), "");
  return `<ul>${liTags}</ul>`;
  },
  aAddTag : function(){
    return '<a href="/add">추가</a>'
  },
  indexHtml: function(urlFunc){
    let string = "";
    let aTag= ''
    
    if (!fs.existsSync("list.json")) {
      fs.writeFile("list.json", JSON.stringify([]));
    } else {
      let listJson = fs.readFileSync("list.json");
      let list = JSON.parse(listJson);
      string = ulTag(urlFunc,list);
    }
    
    if(urlFunc===adminUrl){
      aTag = aAddTag()
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