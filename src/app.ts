import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import { signUp } from './controllers/authController.js';

/* Configuration */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const PORT = process.env.PORT || 3001;
morgan('common');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

/* file storage */
const fileStorage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'public/assets');
  },
  filename(req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: fileStorage });

// Routes with file upload
app.post('/auth/register', upload.single('picture'), signUp);

app.get('/', (req: Request, res: Response) => {
  res.send('Witaj');
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
