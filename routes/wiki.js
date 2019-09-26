const express = require('express');
const router = express.Router();

console.log('here');

router.get('/', async (req, res, next)=>{
    res.send('get home page');
})

router.post('/', async (req, res, next)=>{
    res.send('posted to the main page');
})

router.get('/add', async (req, res, next)=>{
    res.send('added to the main page');
})


module.exports = router;