
const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5b3f167efc8b843c08285469';
var user_id = '5b3de5ce9e46c39920fc17f9';

User.findById(user_id).then((user) => {
    if (!user) {
        return console.log('Unable to find user');
    }
    console.log(JSON.stringify(user,undefined,2));
},(e) => console.log(e));

/* if (!ObjectId.isValid(id)) {
    console.log('ID not valid');
};

Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos', todos);
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo', todo);
});

Todo.findById(id).then((todo) => {
    if(!todo) {
        return console.log('Id not Fount');
    }
    console.log('Todo By Id', todo);
}).catch((e) => console.log(e)); */