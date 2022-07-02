import { Transform } from 'stream';

const transform = new Transform({
  transform(data, encoding, cb) {
    try {
      this.push(
        data
          .toString()
          .split('')
          .reverse()
          .join('')
          .concat('\n'),
      );
      cb();
    } catch (e) {
      cb(e);
    }
  },
});

transform.setEncoding('utf-8');

const read = process.stdin;
const write = process.stdout;

read.pipe(transform).pipe(write);
