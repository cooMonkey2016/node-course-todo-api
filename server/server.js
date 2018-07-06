var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}));


/* app.get('/',(req,res) => {
    res.send('<h1>test one</h1>');
}); */

app.post('/todos',(req,res) => {
    //console.log(req.body);
    var todo = new Todo( {
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    },(e) => {
        res.status(400).send(e);
    });
    //res.end();
});

app.listen(3000,() => {
    console.log('Started on port 3000');
});




/* var newTodo = new Todo( {
    text: 'Cook dinner'
});

newTodo.save().then((doc) => {
    console.log('Save todo : ',doc);
},(e) => {
    console.log('Unable to save todo')
});
 */
/* var otherTodo = new Todo( {
    text: 'Feed the cat',
    completed:true,
    completedAt:123
});
 */
/* var otherTodo = new Todo( {
    text: ' something to do  '
});


otherTodo.save().then((docs) => {
    console.log(JSON.stringify(docs,undefined,2));
},(e) => {
    console.log('Unable to save otherTodo : ',e);
});



var user = new User({
    email: 'coolagain2006@163.com'
});

user.save().then((docs) => {
    console.log('User saved: ',docs);
},(e) => {
    console.log('Unable to save User');
}); */