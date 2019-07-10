/* eslint-disable */

/*
  NOTE:
  The output uses react-intl's pluralisation syntax:
  "{number, plural, one {komentarz} few {komentarze} many {komentarzy}}"
  It should, therefore, support languages with more than one plural form and should not require
  additional helpers besides react-intl's formatMessage() or <FormattedMessage />.
*/

const fs = require("fs")
const fetch = require('node-fetch')
const queryString = require('query-string')

const parseTranslation = text => text
  .replace(/(%s|%d)/g, "{value}")
  .replace(/[%]\d(\$s|\$d)/g, match => match.replace("%", "{value").replace(/(\$s|\$d)/, "}"))
  .replace(/\\n/g, "\n")

const makeVariants = content =>
  Object.keys(content).map(
    key => `${key} {${parseTranslation(content[key])}}`
  )

const parseTerm = ({ term, translation: { content } = {} }) => {
  if (!content) {
    return null
  }

  if (typeof content === "string") {
    return parseTranslation(content)
  }

  if (Object.keys(content).map(key => content[key]).filter(value => !value).length) {
    return null
  }

  return `{number, plural, ${makeVariants(content).join(" ")}}`
}

const parseMultipleTerms = terms =>
  terms.reduce((acc, term) => Object.assign(acc, { [term.term]: parseTerm(term) }), {})

const saveToFile = ({ data, fileName, callback }) => fs.writeFile(`./src/common/services/translationsService/translations/${fileName}.ts`, data, callback)

async function fetchLanguages({ bodyBase }) {
  console.log('fetching languages...')
  let languages = []

  try {
    const response = await fetch('https://api.poeditor.com/v2/languages/list', {
      method: 'POST',
      body: queryString.stringify(bodyBase),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
    const json = await response.json()

    if (json && json.response) {
      console.log(json.response)
    }

    if (json.result) {
      languages = json.result.languages
    } else {
      process.exit(1)
    }

    console.log('languages fetched')
  } catch (error) {
    console.error(error)
    process.exit(1)
  }

  return languages
}

function generateTypescriptData(terms) {
  const termsInJsonFormat = JSON.stringify(parseMultipleTerms(terms), null, "  ")
  const termsToModify = termsInJsonFormat.split('\n')
  const firstLineToChangeIndex = 0
  const lastLineToChangeIndex = termsToModify.length - 1
  const firstLineContentForTypescriptFile = `// tslint:disable:max-line-length\nimport { ILocaleTranslations } from "../../definitions/translationsService"\nexport default {`
  const lastLineContentForTypescriptFile = `} as ILocaleTranslations`

  termsToModify[firstLineToChangeIndex] = firstLineContentForTypescriptFile
  termsToModify[lastLineToChangeIndex] = lastLineContentForTypescriptFile

  const termsWithTypescriptCode = termsToModify.join('\n')
  return termsWithTypescriptCode
}

async function fetchAndSaveTerms({ bodyBase, languages }) {
  if (languages.length) {
    languages.forEach(async ({ code }) => {
      console.log(`fetching terms for ${code}...`)

      try {
        const response = await fetch('https://api.poeditor.com/v2/terms/list', {
          method: 'POST',
          body: queryString.stringify({ ...bodyBase, language: code }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        const json = await response.json()

        if (json && json.response) {
          console.log(json.response)
        }

        if (json.result) {
          console.log(`fetched terms for ${code}`)

          const typeScriptData = generateTypescriptData(json.result.terms)

          saveToFile({
            data: typeScriptData,
            fileName: code,
            callback: () => console.log(`${code}.json saved`)
          })
        } else {
          process.exit(1)
        }
      } catch (error) {
        console.error(error)
        process.exit(1)
      }
    })
  } else {
    console.log('no languages available')
  }
}


module.exports = {
  fetchLanguages,
  fetchAndSaveTerms,
}

