var express = require('express');
var router = express.router();
var registroModel = require('../../models/login_sucessModel');
var cloudinary = require('cloudinary').v2;

router.get('/', async function (req, res, next) {

    var registro = await registroModel.getRegistro();

    res.render('admin/login_sucess', {
        layout: 'admin/layout',
        usuario: req.body.user,
        registro
    })
    console.log(registro);
    res.json(registro);
});
module.exports = router;