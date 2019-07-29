const loadingPageTemplate = `<!DOCTYPE html>
  <html lang="en">

  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Open Kudos: Open Source Slack employee recognitions bot</title>
      <style>
          .mainContainer {
              font-family: 'Segoe UI', Roboto, sans-serif;
              width: 100%;
              text-align: center;
              padding-top: 10%;
          }

          .greetingContainer {
              font-size: 2em;
          }
          .greetingContainer > h1 > span
          {
              font-weight: 100;
          }

          .buttonContainer {
              width: 200px;
              margin: 20px auto;
              background-color: #eaeaea;
              border-radius: 10px;
              height: 40px;
              padding: 30px;
              border: 1px solid #cccccc;
              display: table;
          }

          .footerContainer {
              font-size: 1em;
              color: #b1b1b1;
          }
      </style>
  </head>

  <body>
      <div class="mainContainer">
          <div class="greetingContainer">
              <h1>
                  <span>Open Kudos Dashboard<br /> Please sign in</span>
              </h1>
          </div>
          <div class="buttonContainer">
                 <a href="{0}">
                   <img src="https://api.slack.com/img/sign_in_with_slack.png" />
                 </a>
          </div>
          <div class="footerContainer">
              <p>and have fun!</p>
          </div>
      </div>
  </body>

  </html>`

export default loadingPageTemplate
