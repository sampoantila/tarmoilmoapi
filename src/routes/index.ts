import express from 'express';

const router = express.Router();

/* GET root */
router.get('/', (req, res) => {
    res.send('<!DOCTYPE html><html lang="en"><head><meta name="description" content="Tarmo ilmo API" />'
    + '<title>Tarmo ilmo API</title></head><body>Tarmo ilmo - REST API usage only.</body></html>');
});

router.get('/favicon.ico', (req, res) => {
    res.status(200).send('');
});

router.get('/robots.txt', (req, res) => {
    res.status(200).send('');
});

export default router;
