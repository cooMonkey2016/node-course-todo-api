require('./config/config.js');

const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}));


/* app.get('/',(req,res) => {
    res.send('<h1>test one</h1>');
}); */

app.post('/todos',authenticate,(req,res) => {
    //console.log(req.body);
    var todo = new Todo( {
        text: req.body.text,
        _creator: req.user._id
    });
    todo.save().then((doc) => {
        res.send(doc);
    },(e) => {
        res.status(400).send(e);
    });
    //res.end();
});

app.get('/todos',authenticate,(req,res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({todos});
    },(e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id',authenticate,(req,res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todos) => {
        if (!todos) {
            return res.status(404).send('todos is empty');
        }
        res.send({todos});
    },(e) => {
        res.status(400).send(e);
    });
    //res.send(req.params);
});

app.delete('/todos/:id',authenticate,(req,res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.patch('/todos/:id',authenticate,(req,res) => {
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({_id: id, _creator: req.user._id},{$set: body},{new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });

});
//POST /users

app.post('/users',(req,res) => {
    var body = _.pick(req.body,['email','password']);
    var user = new User(body);
    
    // User.findByToken
    // user.generateAuthToken

    user.save().then((user) => {
        // res.send(user);
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth',token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});


app.get('/users/me',authenticate,(req,res) => {
    res.send(req.user);
});

app.post('/users/login',(req,res) => {
    var body = _.pick(req.body,['email','password']);
    //res.send(body);
    User.findByCredentials(body.email,body.password).then((user) => {
        //res.send(user);
        user.generateAuthToken().then((token) => {
            res.header('x-auth',token).send(user);
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

app.delete('/users/me/token',authenticate,(req,res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    },() => {
        res.status(400).send();
    });
});


app.listen(port,() => {
    console.log('Started on port ',port);
});

module.exports = {app};




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