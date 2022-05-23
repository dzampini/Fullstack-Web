var express = require('express');
var router = express.Router();
var registroModel = require('../../models/login_sucessModel');
var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);

/* GET home page. */
router.get('/', async function (req, res, next) {

    var registro = await registroModel.getRegistro();
    
 
    res.render('admin/login_sucess', {
        layout: 'admin/layout',
        usuario: req.body.user,
        registro
    })
    console.log(registro);
});

router.get('/agregar', (req, res, next) => {
    

    res.render('admin/agregar', {
        layout: 'admin/layout',

    })
});


router.post('/agregar', async (req, res, next) => {
    try {
        var img_id = '';
          if (req.files && Object.keys(req.files).length > 0) {
          imagen = req.files.imagen;
          img_id = (await uploader(imagen.tempFilepath)).public_id;
        }

        console.log(req.body.files);

            if (req.body.nombre != "" && req.body.apellido != "" && req.body.mail != "") {
                await registroModel.insertRegistro({...req.body,img_id});
            
            res.redirect('/admin/login_sucess')

        } else {
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true,
                message: 'todos los campos son requeridos'
            })
        }

    } catch (error) {

        console.log(error)
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true,
            message: "No se cargo el registro"

        })
    }
})

router.get('/eliminar/:id', async (req, res, next) => {

    var id = req.params.id;
    console.log(id);
    await registroModel.deleteRegistro(id);
    res.redirect('/admin/login_sucess');

});

router.get('/modificar/:id', async (req, res, next) => {

    var id = req.params.id;
    console.log(id);
    var obj = await registroModel.getRegistroid(id);
    res.render('admin/modificar', {
        layout: 'admin/layout',
        obj

    });

});

router.post('/modificar', async (req, res, next) => {

    try {

        var obj = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            mail: req.body.mail,
            img_id
        }

        console.log(obj)
        await registroModel.modRegistro(obj, req.body.id);
        res.redirect('/admin/login_sucess');
    }

    catch (error) {

        console.log(error)
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error: true,
            message: "No se modifico el registro"

        })

    }
})

module.exports = router;

