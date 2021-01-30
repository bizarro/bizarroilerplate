require('dotenv').config()

const Prismic = require('prismic-javascript')
const PrismicDOM = require('prismic-dom')
const UAParser = require('ua-parser-js')

const find = require('lodash/find')

const Onboarding = require('./onboarding')

const app = require('./config')
const pageSize = 50

const get = (results, request) => {
  const ua = UAParser(request.headers['user-agent'])

  const meta = find(results, { type: 'metadata' })

  const isAJAX = request.headers['x-requested-with'] === 'XMLHttpRequest'
  const isDesktop = ua.device.type === undefined
  const isPhone = ua.device.type === 'mobile'
  const isTablet = ua.device.type === 'tablet'

  return {
    isAJAX,
    isDesktop,
    isPhone,
    isTablet,
    meta
  }
}

app.listen(app.get('port'), () => {
  Onboarding.trigger()
})

app.use((request, response, next) => {
  const accessToken = process.env.PRISMIC_ACCESS_TOKEN
  const endpoint = process.env.PRISMIC_ENDPOINT

  response.locals.PrismicDOM = PrismicDOM

  Prismic.api(endpoint, {
    accessToken,
    request
  }).then(api => {
    request.prismic = { api }

    next()
  }).catch(error => {
    next(error.message)
  })
})

app.get('/', (request, response) => {
  request.prismic.api.query('', { pageSize }).then(({ results }) => {
    const data = get(results, request)

    response.render('pages/home', { ...data })
  })
})

app.get('/about', (request, response) => {
  request.prismic.api.query('', { pageSize }).then(({ results }) => {
    const data = get(results, request)

    response.render('pages/about', { ...data })
  })
})

app.use((request, response) => {
  response.status(404)

  if (request.accepts('html')) {
    return response.redirect('/')
  }

  if (request.accepts('json')) {
    return response.send({ error: 'Not Found' })
  }

  response.type('txt').send('Not Found')
})
