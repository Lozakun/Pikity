const mongoose = require('mongoose');
const User = require('../models/users.js');

exports.getLogin= ((req, res, next)=>{
    // const isLoggedIn = req.get('Cookie').split('=')[1].trim();
    console.log(req.session.isLoggedIn);
    res.render('../views/auth/login', 
    {
        path: 'login', 
        pageTitle: 'Login',
        isAuthenticated: false 
    });
});

exports.postLogin= ((req, res, next)=>{
    req.session.isLoggedIn = true;
    res.redirect('/ligas');
});