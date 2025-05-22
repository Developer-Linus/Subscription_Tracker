import { Client as workflowClient } from '@upstash/workflow';

// , QSTASH_CURRENT_SIGNING_KEY, QSTASH_NEXT_SIGNING_KEY

import { QSTASH_URL, QSTASH_TOKEN  } from './env.js';
export const workflow = new workflowClient(
    {baseUrl: QSTASH_URL, 
    token: QSTASH_TOKEN});



