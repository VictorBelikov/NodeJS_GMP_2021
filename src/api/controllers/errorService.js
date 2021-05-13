import colors from 'colors';

const getStatusWithColor = (status) => {
  const num = status.toString()[0];

  switch (num) {
    case '1':
      return `${colors.brightCyan(status).bold}`;
    case '2':
      return `${colors.green(status).bold}`;
    case '3':
      return `${colors.magenta(status).bold}`;
    case '5':
      return `${colors.red(status).bold}`;
    default:
      return `${colors.yellow(status).bold}`;
  }
};

export default (status, message, req) => {
  const { originalUrl, method } = req;
  const errStatus = getStatusWithColor(status);

  const error = new Error(
    `status: ${errStatus}; message: ${message}\nparams: ${colors.brightCyan(method).bold}:${
      colors.gray(originalUrl).underline
    }\nstack trace:`,
  );
  error.statusCode = status;
  return error;
};
