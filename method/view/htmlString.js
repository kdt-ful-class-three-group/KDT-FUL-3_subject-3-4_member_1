const htmlString = {
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
  }
}