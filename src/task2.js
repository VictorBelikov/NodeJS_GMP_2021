import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream';
import csv from 'csvtojson';

const PATH_TO_CSV_FILE = './csv/task2_data.csv';
const PATH_TO_TXT_FILE = './txt/task2_data.txt';

const readStream = fs.createReadStream(path.join(__dirname, PATH_TO_CSV_FILE));
const writeStream = fs.createWriteStream(path.join(__dirname, PATH_TO_TXT_FILE));

// Solution 1
// pipeline(
//   readStream,
//   csv(),
//   writeStream,
//
//   (err) => {
//     if (err) {
//       console.error('Pipeline failed: ', err);
//     } else {
//       console.log('Pipeline succeeded!');
//     }
//   },
// );

// Solution 2
csv({ checkType: true })
  .fromStream(readStream)
  .subscribe(
    (json) => {
      const map = new Map();
      for (const [key, value] of Object.entries(json)) {
        map.set(key.toLowerCase(), value);
      }
      writeStream.write(`${JSON.stringify(Object.fromEntries(map))}\n`);
    },
    (err) => console.error('Pipeline failed: ', err),
    () => console.log('Pipeline succeeded!'),
  );
