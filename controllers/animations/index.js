'use strict';

// module.exports = function (fastify, opts, next) {
//   fastify.get('/example', function (request, reply) {
//     reply.send('this is')
//   })

//   next()
// }

// If you prefer async/await, use the following
const { addAnimation, delAnimation, getAnimation, updateAnimation } = require('../../services/animationService');

module.exports = async function (fastify) {
  // fastify.get('/example', {
  //   onRequest: function (request, replay, done) {
  //     done()
  //   },
  //   schema: {
  //     query: {
  //       name: { type: 'string' },
  //       age: { type: 'number' }
  //     },
  //     response: {
  //       200: {
  //         type: 'object',
  //         properties: {
  //           status: { type: 'string' },
  //           data: { type: 'string' }
  //         } 
  //       }
  //     }
  //   }
  // },
  // async function (request, reply) {
  //   reply.send(request.params);
  // });

  fastify.post('/addAnimation', {
    schema: {
      body: {
        type: 'object',
      }
    }
  }, async function (request, reply) {
    request.multipart(() => undefined, onFinish);
    async function onFinish(error) {
      if (error) {
        // 
      }
      const result = addAnimation(fastify, request.body);
      result.then(res => reply.send(res), error => reply.send(error))
    }
  });

  fastify.post('/delAnimation', async function(request, reply) {
    const { id } = request.body;
    const result = delAnimation(fastify, id)
    result.then(res => reply.send(res), error => reply.send(error))
  });

  fastify.post('/getAnimation', async function(request, reply) {
    const result = getAnimation(fastify, request.body)
    result.then(res => reply.send(res[0]), error => reply.send(error))
  });

  fastify.post('/updateAnimation', async function(request, reply) {
    const { id, ...datas } = request.body;
    console.log(id, datas);
    const result = updateAnimation(fastify, id, datas);
    result.then(res => reply.send(res[0]), error => reply.send(error))
  })
}