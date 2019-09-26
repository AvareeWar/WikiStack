const express = require('express');
const router = express.Router();
const { addPage, editPage, main, userList, userPages, wikiPage } = require('../views/index')
const { Page, User } = require("../models");


// console.log('here');

router.get('/', async (req, res, next)=>{
    const allPages = await Page.findAll();
    res.send(main(allPages));
})

// router.post('/', async (req, res, next)=>{
//     res.json(req.body);
// })

router.get('/add', async (req, res, next)=>{
    await res.send(addPage());
})

router.get('/:page', async (req,res,next) =>{
    try{
        const foundPage = await Page.findOne({where: {slug : req.params.page}})
        console.log('test', foundPage);
        const foundUser = await User.findOne({where: {id: foundPage.dataValues.authorId}})
    res.send(wikiPage(foundPage, foundUser));
    }
    catch(err){next(err)}
})

router.post('/', async (req, res, next) => {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`
//   console.log('reqBody', req.body.content);
  try {

//   const page = new Page({
//     title: req.body.title,
//     content: req.body.content,
//     slug: req.body.title
//   });
  const [user, wasCreated] = await User.findOrCreate({
      where: {
       name: req.body.name,
       email: req.body.email
      }
    })
    console.log('User here', user);
    
    // make sure we only redirect *after* our save is complete!
    // note: `.save` returns a promise.
    const page = await Page.create({
        title: req.body.title,
        content: req.body.content
    });
    await page.setAuthor(user);
    // await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) { next(error) }
});



module.exports = router;