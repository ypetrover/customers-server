const getAll = (req, res) => {
    let con = global.Application.get('CONNECTION');
    let sql = `SELECT concat(CustomerID,  ' - ' , CompanyName) as mylist FROM customers`;
    con.query(sql, (err, result) => {
        if (err) {
            res.send({ state: 'error', message: "failed to get data " + err })
        }
        else {
            console.log('Data Fetched.')
            console.log(result)
            res.send({ result })
        }
    })
}

const getSpecific = (req, res) => {
    let con = global.Application.get('CONNECTION');
    let id = req.params.id;
    let sql = `SELECT * FROM customers WHERE CustomerID = ${JSON.stringify(id)}`;
    con.query(sql, (err, result) => {
        if (err) {
            res.send({ state: 'error', message: "failed to get data" + err })
        }
        else {
            console.log('Data Fetched.')
            res.send({ result })
        }
    })
}

const getOrders = (req, res) => {
    debugger
    let con = global.Application.get('CONNECTION');
    let id = req.params.id;
    let sql = `SELECT * FROM orders WHERE CustomerID = ${JSON.stringify(id)}`;
    con.query(sql, (err, result) => {
        if (err) {
            res.send({ state: 'error', message: "failed to get data" + err })
        }
        else {
            console.log('Data Fetched.')
            res.send({ result })
        }
    })
}

const getDetails = (req, res) => {
    let con = global.Application.get('CONNECTION');
    let id = req.params.id;
    let sql = "SELECT products.ProductName , `order details`.`UnitPrice`, `order details`.`Quantity`, sum(`order details`.`Quantity` * `order details`.UnitPrice) as Sum FROM `order details` LEFT JOIN products ON `order details`.`ProductID`=products.ProductID WHERE OrderID = " + id + " GROUP BY products.ProductName";
    con.query(sql, (err, result) => {
        if (err) {
            res.send({ state: 'error', message: "failed to get data" + err })
        }
        else {
            console.log(`Data Fetched.`)
            console.log({ result })
            res.send({ result })
        }
    })
}

module.exports = { getAll, getSpecific, getOrders, getDetails }