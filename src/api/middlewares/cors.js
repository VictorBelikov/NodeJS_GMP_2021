import cors from 'cors';

import { allowAll, whitelist } from '../../config/cors.js';

const corsOptions = {
  origin(origin, callback) {
    if (allowAll) {
      callback(null, true);
    } else {
      callback(null, whitelist);
    }
  },
};

export default cors(corsOptions);
