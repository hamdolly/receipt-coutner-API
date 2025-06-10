import mysql from 'mysql2'

const pool = mysql.createPool({
    // host: "localhost",
    // user: "root",
    // password: "",
    // database: "employees"

    host: 'sql12.freesqldatabase.com',
    port: 3306,
    user: 'sql12763292',
    password: 'tyvfHRcTGP',
    database: 'sql12763292'

}).promise()

export const checkCustomerNo = async (customer_No) => {
    let [result] = await pool.query(`SELECT COUNT(customer_No) AS count FROM receipt WHERE customer_No = ${customer_No}`)
    var check = 0
    result[0].count >= 1 ? check = 0 : check = 1
    return { check }
}

export const login = async (e_No, password) => {
    var data = []
    var [result] = await pool.query(`SELECT * FROM employees WHERE e_No = ?`, [e_No])
    result[0].position == "Supervisor" ?
        data.push(
            {
                "ID": result[0].e_No,
                "password": result[0].password
            }
        )
        :
        data.push(
            {
                "Message": "employee number or password is not currect!",
                "success": 0
            }
        )
    return {
        result: data[0].password == password ? data : "ID or password is wrong!"
    }
}

export const addNewReceipt = async (e_No, customer_No, ep, date, supervisor) => {
    let [result] = await pool.query(`INSERT INTO receipt (e_No, customer_No, earning_point, datE, supervisor) 
    VALUES (?, ?, ?, ?, ?)`, [e_No, customer_No, ep, date, supervisor])
    return [
        {
            "affectedRows": result.affectedRows,
            "success": 1
        }
    ]
}

export const getAllEmployeesReceiptsQuantity = async () => {
    var data = []
    var [employee] = await pool.query(`SELECT * FROM employees`)
    var result, resultY, resultN;
    for (var i = 0; i < employee.length; i++) {
        [result] = await pool.query(`SELECT COUNT(*) AS receipts FROM receipt WHERE e_No = ${employee[i].ID} AND BLOCK = 0`);
        [resultY] = await pool.query(`SELECT COUNT(*) AS receipts FROM receipt WHERE e_No = ${employee[i].ID} AND earning_point = 1 AND BLOCK = 0`);
        [resultN] = await pool.query(`SELECT COUNT(*) AS receipts FROM receipt WHERE e_No = ${employee[i].ID} AND earning_point = 0 AND BLOCK = 0`);

        data.push(
            {
                "ID": employee[i].ID,
                "employee": employee[i].AName,
                "pointsY": resultY[0].receipts,
                "pointsN": resultN[0].receipts,
                "quantity": result[0].receipts,
            }
        )
    }
    return data
}

export const getEmployeeReceiptsQuantity = async (ID) => {
    var data = []
    var data = []
    var [employee] = await pool.query(`SELECT * FROM employees WHERE ID = ${ID}`)
    var result, resultY, resultN;
    for (var i = 0; i < employee.length; i++) {
        [result] = await pool.query(`SELECT COUNT(*) AS receipts FROM receipt WHERE e_No = ${employee[i].ID} AND BLOCK = 0`);
        [resultY] = await pool.query(`SELECT COUNT(*) AS receipts FROM receipt WHERE e_No = ${employee[i].ID} AND earning_point = 1 AND BLOCK = 0`);
        [resultN] = await pool.query(`SELECT COUNT(*) AS receipts FROM receipt WHERE e_No = ${employee[i].ID} AND earning_point = 0 AND BLOCK = 0`);

        data.push(
            {
                "ID": employee[i].ID,
                "employee": employee[i].AName,
                "pointsY": resultY[0].receipts,
                "pointsN": resultN[0].receipts,
                "quantity": result[0].receipts,
            }
        )
    }
    return data
}

export const getEmployeeReceiptsQuantityByDate = async (ID, date) => {
    var data = []
    var [employee] = await pool.query(`SELECT * FROM employees WHERE ID = ${ID}`)
    var result, resultY, resultN;
    for (var i = 0; i < employee.length; i++) {
        [result] = await pool.query(`SELECT COUNT(*) AS receipts FROM receipt WHERE e_No = ${ID} AND datE = '${date}' AND BLOCK = 0`);
        [resultY] = await pool.query(`SELECT COUNT(*) AS receipts FROM receipt WHERE e_No = ${ID} AND datE = '${date}' AND earning_point = 1 AND BLOCK = 0`);
        [resultN] = await pool.query(`SELECT COUNT(*) AS receipts FROM receipt WHERE e_No = ${ID} AND datE = '${date}' AND earning_point = 0 AND BLOCK = 0`);

        data.push(
            {
                "ID": employee[i].ID,
                "employee": employee[i].AName,
                "pointsY": resultY[0].receipts,
                "pointsN": resultN[0].receipts,
                "quantity": result[0].receipts,
            }
        )
    }
    return data
}

export const getReceiptsQuantityByDate = async (date) => {
    var data = []
    var [employee] = await pool.query(`SELECT * FROM employees`)
    var result, resultY, resultN;
    for (var i = 0; i < employee.length; i++) {
        [result] = await pool.query(`SELECT COUNT(*) AS receipts FROM receipt WHERE e_No = ${employee[i].ID} AND datE = '${date}' AND BLOCK = 0`);
        [resultY] = await pool.query(`SELECT COUNT(*) AS receipts FROM receipt WHERE e_No = ${employee[i].ID} AND datE = '${date}' AND earning_point = 1 AND BLOCK = 0`);
        [resultN] = await pool.query(`SELECT COUNT(*) AS receipts FROM receipt WHERE e_No = ${employee[i].ID} AND datE = '${date}' AND earning_point = 0 AND BLOCK = 0`);

        data.push(
            {
                "ID": employee[i].ID,
                "employee": employee[i].AName,
                "pointsY": resultY[0].receipts,
                "pointsN": resultN[0].receipts,
                "quantity": result[0].receipts,
            }
        )
    }
    return data
}

export const test = () => console.log("info module is work.")