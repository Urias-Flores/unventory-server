import { httpServerHandler } from 'cloudflare:node';
import './dist/worker-bootstrap.js';

export default httpServerHandler({ port: 3000 });