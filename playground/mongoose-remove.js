
const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

Todo.remove({}).then((result) => {
    console.log(result);
});

//Todo.findOneAndRemove
//Todo.findByIDAndRemove
/* Todo.fineOneAndRemove({_id: '5b4316405a7eb686b064226c'}).then((todo) => {
    console.log(todo);
}); */
Todo.findByIdAndRemove('5b4316405a7eb686b064226c').then((todo) => {
    console.log(todo);
});


