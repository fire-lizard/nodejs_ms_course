const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const errorHander = require('errorhandler');
const routes = require('./routes');

const app = express();
const posts = routes.posts_;
const comments = routes.comments_;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(errorHander());

let store = {};
store.posts = [];

app.get('/posts', (req, res) => {
    posts.getPosts(req, res, store);
});

app.post('/posts', (req, res) => {
    posts.addPost(req, res, store);
});

app.put('/posts/:id', (req, res) => {
    posts.updatePost(req, res, store);
});

app.delete('/posts/:id', (req, res) => {
    posts.removePost(req, res, store);
});

app.get('/posts/:id/comments', (req, res) => {
    comments.getComments(req, res, store);
});

app.post('/posts/:id/comments', (req, res) => {
    comments.addComment(req, res, store);
});

app.put ('/posts/:postID/comments/:commentID', (req,res) => {
    comments.updateComment(req, res, store);
});

app.delete ('/posts/:postID/comments/:commentID', (req,res) => {
    comments.updateComment(req, res, store);
});

app.listen(3000);
