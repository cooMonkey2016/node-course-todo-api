const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server/server');
const {Todo} = require('./../server/models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
    completed: false,
    completedAt: null
},{
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
}];
beforeEach(function(done) {
    Todo.remove({}).then(() =>{
        var newTodo = Todo.insertMany(todos);
        console.log('newTodo  : ',newTodo);
        return newTodo;
    }).then((result) => {
        console.log('Done !!! : ',result);
        done();
    },(err) => {
        console.log('newTodo err: ',err);
        return err;
    }).catch((e) =>{
        console.log('Catch err one!!!');
        done(e);
    });

    /* Todo.remove({}).then(() => {
        console.log('insert ok!');
        return Todo.insertMany(todos);
    }).then(() => {
        console.log('done!!!');
        done();
    }); */
    /* var newMove = Todo.remove({});
    console.log(newMove);
    newMove.then(() => {
        console.log('insert ok!');
        var newTodo = Todo.insertMany(todos);
        console.log(newTodo);
        done();
    }); */
});



describe('example', function() {
    it('should create a new todo',(done) => {
        /* console.log('expect test!!');
        done(); */
        var text = 'Test todo text';
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err,res) => {
                if (err) {
                    // return done(err);
                    console.log('ERR!!!' + err);
                    return done(err);
                }
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    console.log('expect test!!');
                    done();
                }).catch((e) => done(e));
            });
    });
});


  