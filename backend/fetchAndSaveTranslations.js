const utils = require('./translator.js')

const api_token = process.env.POE_API_TOKEN
const id = process.env.POE_PROJECT_ID
const bodyBase = { api_token, id }

async function fetchAndSaveTranslations() {
  const languages = await utils.fetchLanguages({ bodyBase })
  utils.fetchAndSaveTerms({ bodyBase, languages })
}

fetchAndSaveTranslations()
