import dotenv from 'dotenv';

import Server from './server';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

new Server().startUp();
