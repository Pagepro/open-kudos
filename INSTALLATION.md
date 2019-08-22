# Installation Guide
1. Create a slack bot
    1. Go to https://api.slack.com/apps and create your own app

        ![Step0001](instruction/0001.png?raw=true "Step 1")

    2. Come up with an awesome name for your new bot and choice the workspace where the bot will be available for teammates

        ![Step0002](instruction/0002.png?raw=true "Step 2")

    3. Add a bot user

        ![Step0003](instruction/0003.png?raw=true "Step 3")

        ![Step0004](instruction/0004.png?raw=true "Step 4")

        ![Step0005](instruction/0005.png?raw=true "Step 5")

2. Setup your MongoDB server where data from slack bot will be saved (you can save connection string because you will need it in a few steps)

3. Setup your server where you will host the Nodejs app that will handle the bot’s events

4. Create third-party platforms to handle resources
    1. POEditor project:

        Our bot can response in different languages depends on the settings in the dashboard. Therefore you need to create a POEEditor project e.g. Awesomebot where you will put translations for the bot responses. You can use our default translations

    2. Dropbox:
    
        Our bot store images of gifts that can be exchanged for kudos, Heroku be itself can't store files so the bot needs a different platform to handle that. We have chosen the Dropbox platform

5. Prepare ENV variables
    1. Open your favourite IDE and type there ENV variables that you will use later:
        * POE_API_TOKEN 
        * POE_PROJECT_ID
        * DB_CONNECTION_STRING
        * CLIENT_SECRET
        * CLIENT_ID
        * SLACK_AUTH_REDIRECT_URI
        * SLACK_INSTALL_REDIRECT_URI
        * SIGNING_SECRET
        * SIGNING_SECRET_VERSION
        * DROPBOX_TOKEN

    2. Prepare POE_API_TOKEN and POE_PROJECT_ID
        1. Go to  https://poeditor.com/account/api 
        2. Choice API Access tab
        3. Copy API token to POE_API_TOKEN
        4. Copy your project id to POE_PROJECT_ID

        ![Step0006](instruction/0006.png?raw=true "Step 6")

    2. Prepare DB_CONNECTION_STRING
        1. Go to your MongoDB server
        2. Copy the connection string to your MongoDB server DB_CONNECTION_STRING

    3. Prepare CLIENT_SECRET and CLIENT_ID
        1. Go to  https://api.slack.com/ 
        2. Choice you Awesomebot 
        3. Copy Client ID to CLIENT_ID
        4. Copy your project id to POE_PROJECT_ID

        ![Step0007](instruction/0007.png?raw=true "Step 7")        

    4. Prepare SLACK_AUTH_REDIRECT_URI and SLACK_INSTALL_REDIRECT_URI
        1. SLACK_AUTH_REDIRECT_URI = https://awesomebot.url.com/auth
        2. SLACK_INSTALL_REDIRECT_URI = https://awesomebot.url.com/api/installation
        3. Change awesomebot.url.com to your URL address

    5. Prepare SIGNING_SECRET and SIGNING_SECRET_VERSION
        1. SIGNING_SECRET_VERSION = v0
        2. Go to  https://api.slack.com/
        3. SIGNING_SECRET = Signing Secret

        ![Step0008](instruction/0008.png?raw=true "Step 8")

    6. Prepare DROPBOX_TOKEN
        1. Go to https://www.dropbox.com/developers/apps/create
        2. Authorize, if you weren’t
        3. Choose Dropbox API on the first step
        4. Choose Full Dropbox access on the second
        5. Give your app a name. That name will become a folder in your Dropbox account
        6. Push ‘Create app’ button
        7. Go to ‘OAuth 2’ block and hit ‘Generate’ button near ‘Generated access token’ text
        8. After the token is generated you’ll see a string of letters and numbers

6. Clone open-kudos and deploy to your server
    1. If you want to host your bot on Heroku you can find instruction here: https://devcenter.heroku.com/articles/getting-started-with-nodejs
    2. After deploying the app to your server, remember to set up environment variables
    
7. Set up endpoints and other settings in slack bot
    1. Configure permissions to allow your app to interact with the Slack API

    ![Step0009](instruction/0009.png?raw=true "Step 9")

    ![Step0010](instruction/0010.png?raw=true "Step 10")

    2. Set up redirect URLs to allow installation your bot for other workspaces and authenticate users via slack oAuth

    ![Step0011](instruction/0011.png?raw=true "Step 11")

    3. Configure interactive components to be able to add buttons to your app messages, and create an interactive experience for users

    ![Step0012](instruction/0012.png?raw=true "Step 12")

    ![Step0013](instruction/0013.png?raw=true "Step 13")

    ![Step0014](instruction/0014.png?raw=true "Step 14")

    4. Configure the slash command to be able to use the bot

    ![Step0015](instruction/0015.png?raw=true "Step 15")

    ![Step0016](instruction/0016.png?raw=true "Step 16")

    5. Configure events endpoint

    ![Step0017](instruction/0017.png?raw=true "Step 17")

    ![Step0018](instruction/0018.png?raw=true "Step 18")
