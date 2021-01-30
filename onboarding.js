const request = require('request')

function trigger () {
  request.post(`${process.env.PRISMIC_ENDPOINT}/app/settings/onboarding/run`, {
    form: {
      language: 'node',
      framework: 'express'
    }
  })
}

module.exports = {
  trigger
}
