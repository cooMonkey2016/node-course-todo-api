const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

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

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done())
});

describe('POST /todos',() => {
    it('should create a new todo',(done) => {
        //var _id = new ObjectID();
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
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(3);
                    expect(todos[2].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            })
    });

    it('should not todo with invalid body data',(done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err,res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((todos)=> {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('GET /todos',() => {
    it('shoud get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('shoud create a new todo',(done) => {
        request(app)
            .get('/todos/' + todos[0]._id.toHexString())
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found',(done) => {
        var hexID = new ObjectID();
        request(app)
            .get('/todos/' + hexID)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non-object ids',(done) => {
        request(app)
            .get('/todos/123abcd')
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id',() => {
    it('should remove a todo',(done) => {
        var hexID = todos[1]._id.toHexString();
        request(app)
            .delete('/todos/' + hexID)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexID);
            })
            .end((err,res) => {
                if (err) {
                    return done(err);
                }
                Todo.findById(hexID).then((todo) => {
                    expect(todo).toBeNull();
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should return 404 if todo not found',(done) => {
        var hexID = new ObjectID();
        request(app)
            .delete('/todos/' + hexID)
            .expect(404)
            .end(done); 
    });

    it('should return 404 if object id is invalid',(done) => {
        request(app)
            .delete('/todos/123abcd')
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id',() => {
    it('should update the todo',(done) => {
        var hexID = todos[1]._id.toHexString();
        var text = 'this should be the new text';
        request(app)
            .patch('/todos/' + hexID)
            .send({
                completed:true,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(typeof res.body.todo.completedAt).toBe('number');
            })
            .end(done);
    });
    it('should clear completedAt when todo is not completed',(done) => {
        var hexID = todos[0]._id.toHexString();
        var text = 'this should be the new text!!!!';
        request(app)
            .patch('/todos/' + hexID)
            .send({
                completed:false,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toBeNull();
            })
            .end(done);
    });
});
    




