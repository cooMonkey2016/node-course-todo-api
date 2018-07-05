//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
/* var obj = new ObjectID();
console.log(obj); */
/* var user = {name: 'Andrew',age: 25};
var {name} = user;
console.log(name); */

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,client) => {
    if (err) {
        return console.log('Unable to connect to Mongodb Server');
    }
    console.log('Connected to Mongodb Server');
    const db = client.db('TodoApp');
    /* db.collection('Todos').find({
        _id: new ObjectID('5b3d870d837199bc58a57c3f')
    }).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs,undefined,2));
    },(err) => {
        console.log('Unable to fetch todos');
    }); */

    /* db.collection('Todos').find().count().then((count) => {
        console.log('Todos count: ' + count);
    },(err) => {
        console.log('Unable to fetch todos');
    }); */

    db.collection('Users').find({name:'Andrew'}).toArray().then((docs) => {
        console.log(JSON.stringify(docs,undefined,2));
    });
    

   

    client.close();
});