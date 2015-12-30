// load the todo model
var Todo = require('./models/todos');
var express = require('express');
var router = express.Router();

//expose the routes to  our with module.exports


router.get('/api/todos', function(req, res) {
    Todo.find(function(err, todos) {
        if (err)
            res.send(err);
        res.json(todos);
    });
});
router.post('/api/todos', function(req, res) {
    Todo.create({
        text: req.body.text,
        done: false
    }, function(err, todo) {
        if (err)
            res.send(err);
        Todo.find(function(err, todos) {
            if (err)
                res.send(err);
            res.json(todos);
        });
    });
});
router.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
        _id: req.params.todo_id
    }, function(err, todo) {
        if (err)
            res.send(err);
        Todo.find(function(err, todos) {
            if (err)
                res.send(err);
            res.json(todos);
        });
    });
});

module.exports = router;
