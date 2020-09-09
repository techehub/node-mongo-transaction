var mongoclient = require('mongodb').MongoClient
var ClientSession = require('mongodb').ClientSession
var express = require('express')

var app = express();
app.get('/test', async(req, res) => {

    client = await mongoclient.connect("mongodb://localhost:27017", { useNewUrlParser: true, useUnifiedTopology: true })
    console.log(client)
    let db = client.db('crm')
    let collection1 = db.collection('testdata1')
    try {
        session = await client.startSession()
        await session.startTransaction()
        let r1 = await collection1.insertOne({ 'name': 'qqqqqqqqq', 'age': 22 })
        let r3 = await collection1.insertOne({ 'name': 'rrrrrrrrr', 'age': 22 })
        await session.commitTransaction()
        await session.endSession()
        res.send("testing")
    } catch (e) {
        console.log(' error occured====>', e)
        await session.abortTransaction();
        await session.endSession()

    } finally {

        if (client)
            client.close()
        console.log('client close done')
    }
})

app.listen(3000)