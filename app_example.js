// export function add(a, b) {
//     return a + b;
// };
const express = require('express');
const fs = require('fs');

const app = express();

const id = 2;

app.delete('/deleteUser', (req, res) => {
  // First read existing users.
  fs.readFile(`${__dirname}/users.json`, 'utf8', (err, ordata) => {
    const data = JSON.parse(ordata);
    console.log('truoc', data);

    delete data[`user${id}`];

    console.log('sau', data);
    res.end(JSON.stringify(data));
  });
});

const server = app.listen(8081, () => {
  const host = server.address().address;
  const { port } = server.address();
  console.log('Example app listening at http://%s:%s', host, port);
});
