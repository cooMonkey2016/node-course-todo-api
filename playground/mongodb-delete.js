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

  /*   db.collection('Todos').deleteMany({text:'Eat lunch'}).then((result) => {
        console.log(result);
    }); */

   /*  db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((results) => {
        console.log(results);
    }); */

   /*  db.collection('Todos').findOneAndDelete({completed: false}).then((results) => {
        console.log(results);
    }); */

    db.collection('Users').deleteMany({name: 'Andrew'});
    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('5b3d88ad23c21ccfb8995b12')
    }).then((results) => {
        console.log(JSON.stringify(results,undefined,2));
    });

    

   

    client.close();
});