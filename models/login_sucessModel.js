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
module.exports = {getRegistro, insertRegistro}