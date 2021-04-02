const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const axios = require('axios')

// get all posts for homepage

router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
      attributes: [
        'id',
        'depart_station',
        'arrive_station',
        'content',
        'created_at'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));

    var apiBartStationUrl = "http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y";
    axios(apiBartStationUrl)
      .then(bart => {
        var bartname = bart.data.root.stations.station
        res.render('homepage', {
          bartname,
          posts,
          loggedIn: req.session.loggedIn
        });
       });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
  
  // get single post

router.get('/post/:id', (req, res) => {
Post.findOne({
  where: {
    id: req.params.id
  },
  attributes: [
    'id',
    'depart_station',
    'arrive_station',
    'content',
    'created_at'
  ],
  include: [
    {
      model: Comment,
      attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
      include: {
        model: User,
        attributes: ['username']
      }
    },
    {
      model: User,
      attributes: ['username']
    }
  ]
})
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    const post = dbPostData.get({ plain: true });

    res.render('single-post', {
      post,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
  
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  
  res.render('signup');
});

router.post('/filter'), (req, res) => {
  if (req.session.loggedIn) {
    Post.findAll({where: req.body.depart_station})
    
    .then(posts => {
      res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn
    })
  })
  }
}

module.exports = router;