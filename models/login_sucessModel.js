const async = require('hbs/lib/async');
var pool = require('./bd');



async function getRegistro() {

        var query = 'SELECT * from registros';
        var rows = await pool.query(query);
        return rows;

}

async function insertRegistro(obj) {
        try {
                var query = "insert into registros set ?";
                var rows = await pool.query(query, [obj]);
                console.log(obj)
                return rows;
        } catch (errors) {
                console.log(error);
                throw error;

        }
}

async function deleteRegistro(id) {
        var query = 'delete from registros where id=?';
        var rows = await pool.query(query, [id]);
        return rows;
}

async function insertRegistro(obj) {
        try {
                var query = "insert into registros set ?";
                var rows = await pool.query(query, [obj]);
                console.log(obj)
                return rows;
        } catch (errors) {
                console.log(error);
                throw error;

        }
}

async function getRegistroid(id) {

        var query = "SELECT * from registros where id=?";
        var rows = await pool.query(query, [id]);
        return rows[0];

}
async function modRegistro(obj, id) {
        try {
                var query = "UPDATE registros SET ? WHERE id= ?";
                var rows = await pool.query(query, [obj, id]);
                return rows;
        } catch (error) {
                throw error;
        }
}
module.exports = { getRegistro, insertRegistro, deleteRegistro, getRegistroid, modRegistro }