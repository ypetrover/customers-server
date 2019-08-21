const mysql = require('mysql')
let con;

function Open(app) {
    new Promise((resolve, reject) => {
        con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'northwind',
        });
        con.connect((err) => {
            if (err) {
                con.end()
                reject(err)
            }
            else {
                console.log("Database Connected.")
                //זה מגדיר אם הפרומיז הוא לפתוח או לסגור את השרת app. set (state , action)
                app.set('CONNECTION', con)
                resolve(true);
            }
        })
    }
    )
}

function Close() {
    con.end()
}

module.exports = { Open, Close };