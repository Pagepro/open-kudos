1. Setup and start MongoDB server
    1. Copy `connection string` as `DB_CONNECTION_STRING`
2. Go to https://poeditor.com/account/api and signup/singin to your account

    ![PO Editor](installation/poeditor.png "PO Editor")

    1. Add new project
        1. Write a `Name` of your choice. e.g. `KudosVishalPOE`
    2. Go to [`Account Settings`->`API Access`](https://poeditor.com/account/api)
    3. Copy `API Token` as `POE_API_TOKEN`
    4. Copy `KudosVishalPOE` project id as `POE_PROJECT_ID`
3. Go to https://www.dropbox.com/developers/apps/create and signup/singin to your account
    1. Choose plan. e.g. `2 GB Dropbox Basic plan`
    2. Exit the webpage and go to https://www.dropbox.com/developers/apps/create
        1. Choose an API = `Scoped Access`
        2. Choose the type of access you need = `Full Dropbox`
        3. Write an `App Name` of your choice. e.g. `KudosVishalDropbox`
        4. Agree to T&C and click `Create App`
        5. Go to `settings` of this app. Go to `OAuth 2` section
        6. Click on `Generate` button next to Generated access token
        7. Choose `No Expiration` from the dropdown next to Access token expiration
        8. Copy the token as `DROPBOX_TOKEN`
4. Create Your Own OpenKudos App in Slack App Directory

    ![Slack API Applications](installation/slackapiapplications.png "Slack API Applications")

    1. Go to https://api.slack.com/apps and signin to your desired workspace
    2. Click on `Your Apps`
    3. Create New App

        ![Create Slack App](installation/createslackapp.png "Create Slack App")

        1. Write an `App Name` of your choice. e.g. `KudosVishal`
        2. Choose among available workspaces under `Development Slack Workspace`
    4. Go to `Basic Information`->`App Credentials` of the app you just created

        ![App Credentials](installation/appcredentials.png "App Credentials")

        1. Copy the following:
            1. `Client ID` as `CLIENT_ID`
            2. `Client Secret` as `CLIENT_SECRET`
            3. `Signing Secret` as `SIGNING_SECRET`
    5. [Optional] Go to `Basic Information`->`Display Information` of the app you just created

        ![App Icon](installation/appicon.png "App Icon")

        1. Click on `+Add App Icon` button to add icon of your choice (atleast 512x512)
5. Setup Node Server
    1. Fork this [repo](https://github.com/the-vishal-kumar/open-kudos)
    2. Deploy this to a server. Copy the `server url` as `BaseUrl`. e.g. Suppose BaseUrl is [https://www.funGyaan.com](https://www.funGyaan.com)
    3. Copy `BaseUrl`+`/auth` as `SLACK_AUTH_REDIRECT_URI`. e.g. https://www.funGyaan.com/auth
    4. Copy `BaseUrl`+`/api/installation` as `SLACK_INSTALL_REDIRECT_URI`. e.g. https://www.funGyaan.com/api/installation
    5. We'll add environment variables in `Step 6`
6. Setup environment variables on Node Server (with values from previous steps). Following values are sample values:
    ```
    SLACK_AUTH_REDIRECT_URI=https://www.funGyaan.com/auth
    SLACK_INSTALL_REDIRECT_URI=https://www.funGyaan.com/api/installation
    POE_API_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    POE_PROJECT_ID=xxxxx
    DB_CONNECTION_STRING=mongodb://username:password@host:port/database
    CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    CLIENT_ID=xxxxxxxxxxxx.xxxxxxxxxxxxx
    SIGNING_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    SIGNING_SECRET_VERSION=v0
    DROPBOX_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    ```
7. Start Node Server
8. Setup the created OpenKudos App in Slack App Directory. Go to https://api.slack.com/apps -> `KudosVishal` App
    1. Go to `OAuth & Permissions`->`Redirect URLs`

        ![Redirect URLs](installation/addredirecturls.png "Redirect URLs")

        1. Add urls of SLACK_AUTH_REDIRECT_URI and SLACK_INSTALL_REDIRECT_URI
        2. Save
    2. Go to `OAuth & Permissions`->`Scopes`->`Bot Token Scopes`

        ![Bot Token Scopes](installation/bottokenscopes.png "Bot Token Scopes")

        1. Click on `Add an OAuth Scope`
        2. Add following scopes:
            ```
            channels:read
            chat:write
            groups:read
            users:read
            ```
    4. Go to `App Home`->`Your App’s Presence in Slack`

        ![Edit App Display Name and Show the Bot as Online](installation/editbotdisplaynameandmarkonline.png "Edit App Display Name and Show the Bot as Online")

        1. Click on `App Display Name` Edit
        2. Copy the value of `Default Username` and paste it to `Display Name`. Both should be same and in lowercase. Save
        3. Enable `Always Show My Bot as Online`
    5. Go to `Interactivity & Shortcuts`

        ![Interactivity](installation/interactivityrequesturl.png "Interactivity")

        1. Enable `Interactivity`
        2. Write Request URL as `BaseUrl`+`/api/slack/actions`. e.g. https://www.funGyaan.com/api/slack/actions
        3. Save Changes
    6. Go to `Slash Commands`
        1. Click on `Create New Command`

            ![Create New Command](installation/createslashcommand.png "Create New Command")

            1. Write Command as `/kudos`
            2. Write Request URL as `BaseUrl`+`/api/slack/command`. e.g. https://www.funGyaan.com/api/slack/command
            3. Write Short Description as `Talk with Kudos Bot`
            4. Write Usage Hint as `help`
            5. Enable `Escape channels, users, and links sent to your app`
            6. Save
                ```
                Command             /kudos
                Request URL         https://www.funGyaan.com/api/slack/command
                Short Description   Talk with Kudos Bot
                Usage Hint          help
                ```
    7. Go to `Event Subscriptions`

        ![Event Subscriptions](installation/eventsubscriptions.png "Event Subscriptions")

        1. Enable `Enable Events`
            1. Write Request URL as `BaseUrl`+`/api/slack/events`. e.g. https://www.funGyaan.com/api/slack/events
                1. It'll say `verified` if the Request URL is correct
        2. In `Subscribe to bot events`, click on `Add Bot User Event`
            1. Add `member_joined_channel` Event Name
        3. Save Changes
9. Go to `BaseUrl`. e.g. https://www.funGyaan.com
    1. Click on `Add to Slack`
    2. Signin to your desired workspace
    3. On successful installation, it'll say `Thanks for installing Open Kudos`
10. Go to slack workspace
    1. Create or Open a channel
    2. Add App -> Find the slack app you just created and click on `Add` button
    3. Write `/kudos give @Vishal 10 kudos for implementing Open-Kudos Project` to give 10 kudos points to Vishal
        ```
        @username1 gave @Vishal 10 for implementing Open-Kudos Project
        ```
    4. Write `/kudos balance`
        ```
        Here is your current balance

        Giveable Balance
        89 Kudos
        These are Kudos you can give to your teammates and are reset at the beginning of the month.

        Spendable Balance
        10 Kudos 
        You receive these Kudos from your teammates and can spend them to buy gifts. They never expire.

        ```
11. For Dashboard, go to `BaseUrl`+`/dashboard`. e.g. https://www.funGyaan.com/dashboard
    1. Signin to your workspace
    2. Re-install App because permissions have changed