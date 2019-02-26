import { WebClient } from '@slack/client'
const web = new WebClient(process.env.SLACK_TOKEN)
export default web
