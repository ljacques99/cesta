const mysql = require('mysql8')

var pool = mysql.createPool({
   //onnectionLimit: 10,
    host: 'localhost',
    user:"root",
    database:"northwind",
    password: "mdp-Laurent",
    port: "3306"
})

function q(sql, parameters) {
    return new Promise((resolve, reject) => {
        pool.query(sql, parameters, function(error, results, fields) {
            if (error) {
                reject(error)
                return
            }
            return resolve([results, fields])
        })
    })
}

module.exports = {
    q
}