const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {logging: false});


const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
    // validate: {}
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {isEmail: true}
  }
});

function sanitize(str){
  return str.replace(/\s+/g, '_').replace(/\W/g, '');
}

Page.belongsTo(User, { as:'author' });


Page.beforeValidate((pageInstance) => {
  pageInstance.slug = sanitize(pageInstance.title);
})


module.exports = { Page, User, db };


