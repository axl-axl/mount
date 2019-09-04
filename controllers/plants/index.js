'use strict';

module.exports = async function(fastify) {
  fastify.post('/getPlants', async function(req, reply) {
    reply.send('plants list')
  })
}