import morgan from 'morgan';

import logger from '../../utils/logger.js';

morgan.token('body', (req) => (Object.keys(req.body).length > 0 ? `body=${JSON.stringify(req.body)}` : ''));

export default morgan(':method :url :body :status - :response-time ms', {
  stream: { write: (msg) => logger.http(msg) },
});

/*
// Custom logging decorator

export default (fn) => async (req, res, next) => {
  const { originalUrl, method } = req;
  const currDate = new Date();
  const year = currDate.getFullYear();
  const month = currDate.getMonth() + 1;
  const date = currDate.getDate();
  let hours = currDate.getHours().toString();
  let minutes = currDate.getMinutes().toString();
  let secs = currDate.getSeconds().toString();

  hours = hours.length > 1 ? hours : `0${hours}`;
  minutes = minutes.length > 1 ? minutes : `0${minutes}`;
  secs = secs.length > 1 ? secs : `0${secs}`;

  const formattedDate = `[${year}/${month}/${date} ${hours}:${minutes}:${secs}]`;
  const body = Object.keys(req.body).length > 0 ? `; body: ${JSON.stringify(req.body)}` : '';

  const startTime = process.hrtime();
  await fn(req, res, next);
  const diff = process.hrtime(startTime);
  const sec = ((diff[0] + diff[1] / 1e9) * 1e3).toFixed(3);
  const status = getStatusWithColor(res.statusCode);

  console.log(
    `${colors.blue(formattedDate)} ${colors.brightCyan(method).bold}:${
      colors.gray(originalUrl).underline
    }; ${status}; ${sec} ms${body}`,
  );
};
*/
