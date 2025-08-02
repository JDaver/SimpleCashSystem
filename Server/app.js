const express = require('express');
const path = require('path');
const app = express();

const reactPath = path.join(__dirname, '..', 'Views', 'dist');
app.use(express.static(reactPath));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(reactPath, 'index.html'));
});

app.listen(4444, () => {
  console.log('Listening on http://localhost:4444/Home');
});
