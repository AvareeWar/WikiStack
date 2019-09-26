const express = require('express');
const pg = require('pg');
const morgan = require('morgan');
const app = express();
const wiki = require('./routes/wiki');
const user = require('./routes/user');
const main = require('./views/main');
const {User, Page , db} = require('./models/index');

app.use(morgan('dev',{logging:false}));
app.use(express.urlencoded({extended:false}));
app.use(express.static(__dirname + '/static'));
app.use(express.json())
app.use('/wiki', wiki); // allows us to use the middleware routed to use through wiki - has built in next()
//app.use('/user', user);

app.get('/', async (req, res)=>{
    res.redirect('/wiki');
})

db.authenticate().
then(() => {
  console.log('connected to the database');
})

const init = async()=> {
    // await db.sync({force: true});
    await db.sync();

    // this drops all tables then recreates them based on our JS definitions
    //models.db.sync({force: true})

    const PORT = 3000;
    app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
    });

}


init();
