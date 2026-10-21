import { handleAsNodeRequest } from 'cloudflare:node';
import { bootstrap } from './dist/worker-bootstrap.js';

let ready;

export default {
  async fetch(request, env, ctx) {
    ready ??= bootstrap(); 
    await ready;
    return handleAsNodeRequest(3000, request);
  },
};