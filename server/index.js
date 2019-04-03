var express = require('express');
var multer  = require('multer');
const { createApolloFetch } = require('apollo-fetch');
const tesseract   = require('node-tesseract-ocr');
const CREATE_WINE = require('./mutation.graphql/CREATE_WINE');
const bodyParser  = require('body-parser');
const translateInfo = require('./services/translateInfo');
const print = require('graphql').print;

const app = express();

const config = {
  lang: 'eng',
  oem: 1,
  psm: 3
};

const fetch = createApolloFetch({
  uri: 'http://localhost:4466',
});
 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage });

app.use(bodyParser.json());

app.listen(4000, () => {
  console.log('Listening on port 4000!')
});

app.post('/imageHooks', upload.single('image'), async (req, res) => { 
    try {
        let wineInfo = await tesseract.recognize(`uploads/${req.file.filename}`, config);
        wineInfo = wineInfo.match(/\S+/g);
        const obtainedData = translateInfo(wineInfo);
        
        let result = await fetch({
            query: print(CREATE_WINE),
            variables: { 
                ...obtainedData,
                image: `uploads/${req.file.filename}`,
            }
        });

        res.status(200).send('OK');
    } catch (e){
        console.log('Error during image recognition: ', e);
        res.status(500).send(e.toString());
    };
});

  