module.exports = {
    getPosts(req, res, postStore) {
        res.status(200).send(postStore);
    },
    addPost(req, res, postStore) {
        let newPost = req.body;
        postStore.posts.push(newPost);
        let postId = postStore.posts.length - 1;
        res.status(201).send({
            id: postId
        });
    },
    updatePost(req, res, postStore) {
        let postId = req.params.id;
        try {
            if (postId > (postStore.posts.length - 1) || postId < 0) {
                throw "Id is out of range";
            }
        } catch (err) {
            return res.status(404).send({
                error: err
            });
        }
        postStore.posts[postId] = req.body;
        res.status(200).send({
            id: postId
        });
    },
    removePost(req, res, postStore) {
        let postId = req.params.id;
        try {
            if (postId > (postStore.posts.length - 1) || postId < 0) {
                throw "Id is out of range";
            }
        } catch (err) {
            return res.status(404).send({
                error: err
            });
        }
        postStore.posts.splice(postId, 1);
        res.status(200).send({
            id: postId
        });

    }
};
