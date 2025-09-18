import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const app = require('./server.js');

export default app;
