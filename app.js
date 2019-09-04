'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const qs = require('qs')
const { dbConfigs, fastifyConfings } = require('./config/configs')

module.exports = function (fastify, opts, next) {
  // Place here your custom code!
  fastify.register(require('fastify-mysql'), {
    promise: true,
    ...dbConfigs
  })
  fastify.register(require('fastify-multipart'));
  fastify.addContentTypeParser('application/x-www-form-urlencoded', function (req, done) {
    var body = '';
    req.on('data', function (data) {
      // console.log('数据参数', data.toString('utf8'))
      body += data
    })
    req.on('end', function () {
      try {
        const parsed = qs.parse(body)
        done(null, parsed)
      } catch (e) {
        done(e)
      }
    })
    req.on('error', done)
  })
  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in services
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'controllers'),
    options: Object.assign({
      ...fastifyConfings
    }, opts)
  })
  // Make sure to call next when done
  next()
}
