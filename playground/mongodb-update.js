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

    /* db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5b3dca3d5a7eb686b06421f2')
    },{ 
        $set: {
        completed: true}
    },{returnOriginal: false
    }).then((results) => {
        console.log(results);
    }); */

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b3dcc1f5a7eb686b0642202')
    },{
        $set: {
            name: 'Li jin'
        },
        $inc: {
            age: 1
        }
    },{
        returnOriginal: false
    }).then((results) => {
        console.log(results);
    });


   
    

   

    client.close();
});