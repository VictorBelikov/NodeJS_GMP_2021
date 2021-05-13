import colors from 'colors';

export default (req, res, next) => {
  const { url, method } = req;
  // const { statusCode } = res;
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
  const body = Object.keys(req.body).length > 0 ? `body: ${JSON.stringify(req.body)}` : '';

  console.log(`${colors.blue(formattedDate)} ${colors.brightCyan(method).bold}:${colors.gray(url).underline}; `, body);
  next();
};
