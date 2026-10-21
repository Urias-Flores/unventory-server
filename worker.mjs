import { handleAsNodeRequest } from 'cloudflare:node';

let ready;

async function init() {
  const { bootstrap } = await import('./dist/worker-bootstrap.js');
  await bootstrap(); // NestFactory.create + app.listen(3000)
}

export default {
  async fetch(request, env, ctx) {
    try {
      ready ??= init();
      await ready;
    } catch (err) {
      ready = undefined; // si falló, reintenta en el siguiente request
      throw err;
    }
    return handleAsNodeRequest(3000, request);
  },
};