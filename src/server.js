import express from 'express';
import logger from 'morgan';
import path from 'path';
import multer from 'multer';

const app = express();
const upload = multer();
const port = process.env.PORT || 8000;

app.use(logger('dev'));

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

app.get('/api', (req, res) => {
  return res.status(200).json({
    status: 'success',
    message: 'Welcome file metadata microservice API',
  })
});

app.post('/api/meta', upload.single('avatar'), (req, res) => {
  if (!req.file) {
    return res.status(200).json({
      status: 'Error',
      message: 'Error handling request',
    });
  }

  return res.status(200).json({ size: req.file.size });
});


app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
