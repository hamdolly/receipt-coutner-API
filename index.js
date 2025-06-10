import express from 'express';
import * as info from "./info.js"
import cors from 'cors'

const app = express();
app.use(express.json());

let corsOptions = {
    origin : ['https://receipt-counter.w3spaces.com'],
 }

app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.send("It is work!")
})

app.post('/login/:e_No/:password', async (req, res) => {
    try {
        // var data = req.body
        var { e_No, password } = req.params
        res.status(200).send((await info.login(e_No, password)).result)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.post("/receipt", async (req, res) => {
    try {
        var data = req.body
        if ((await info.checkCustomerNo(data[0].customer_No)).check == 1) {
            var receipt = await info.addNewReceipt(data[0].e_No, data[0].customer_No, data[0].ep, data[0].date, data[0].supervisor)

            res.status(200).send(receipt)
        } else {
            res.status(400).send([
                {
                    "affectedRows": 0,
                    "Message": "!رقم هذا العميل مضاف بالفعل",
                    "success": "0"
                }
            ])
        }
        // res.send(data)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.get('/employee/newcustomers/quantity', async (req, res) => {
    try {
        res.status(200).send(await info.getAllEmployeesReceiptsQuantity())
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.get('/employee/newcustomers/quantity/ID/:ID', async (req, res) => {
    try {
        let { ID } = req.params
        res.status(200).send(await info.getEmployeeReceiptsQuantity(ID))
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.get('/employee/newcustomers/quantity/date/:date', async (req, res) => {
    try {
        let { date } = req.params
        res.status(200).send(await info.getReceiptsQuantityByDate(date))
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.get('/employee/newcustomers/quantity/:ID/:date', async (req, res) => {
    try {
        let { ID, date } = req.params
        res.status(200).send(await info.getEmployeeReceiptsQuantityByDate(ID, date))
    } catch (error) {
        res.status(500).send(error.message)
    }
})

var port = 3100
app.listen(port || process.env.PORT, () => console.log(`Started a port: ${port}`))
