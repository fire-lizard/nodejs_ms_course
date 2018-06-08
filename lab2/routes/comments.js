module.exports = {
    getComments(req, res, postStore) {
        let postId = req.params.id;
        try {
            if (postId > (postStore.posts.length - 1) || postId < 0) {
                throw "Id is out of range.";
            }
        } catch (err) {
            return res.status(404).send({
                error: err
            });
        }
        if ("comments" in postStore.posts[postId]) {
            res.status(200).send(JSON.parse('{ "comments":' + JSON.stringify(postStore.posts[postId].comments) + "}"));
        } else {
            res.status(404).send({
                error: "No comments exist for id ${postId}."
            });
        }
    },
    addComment(req, res, postStore) {
        let postId = req.params.id;
        try {
            if (postId > (postStore.posts.length - 1) || postId < 0) {
                throw "Id is out of range.";
            }
        } catch (err) {
            return res.status(404).send({
                error: err
            });
        }
        if ("comments" in postStore.posts[postId]) {
            postStore.posts[postId].comments.push(req.body);
        }
        else {
            postStore.posts[postId].comments = [req.body];
        }
        commentId = postStore.posts[postId].comments.length - 1;
        res.status(201).send({
            id: commentId
        });
    },
    updateComment(req, res, postStore) {
      let postId = req.params.postID;
      let commentId = req.params.commentID;
      try {
          if (postId > (postStore.posts.length - 1) || postId < 0) {
              throw "Id is out of range.";
          }
      } catch (err) {
          return res.status(404).send({
              error: err
          });
      }
      try {
          if ( !("comments" in postStore.posts[postId]) || (commentId >  postStore.posts[postId].comments.length - 1) || commentId < 0) {
              throw "Comment id is out of range";
          }
      } catch (err) {
          return res.status(404).send({
              error: err
          });
        }
      postStore.posts[postId].comments[commentId]= req.body;
      res.status(200).send ({ id: parseInt(commentId)});
    },
    removeComment(req, res) {
      let postId = req.params.postID;
      let commentId = req.params.commentID;
      try {
          if (postId > (postStore.posts.length - 1) || postId < 0) {
              throw "Id is out of range.";
          }
      } catch (err) {
          return res.status(404).send({
              error: err
          });
      }
      try {
          if ( !("comments" in postStore.posts[postId]) || (commentId >  postStore.posts[postId].comments.length - 1) || commentId < 0) {
              throw "Comment id is out of range";
          }
      } catch (err) {
          return res.status(404).send({
              error: err
          });
        }
        postStore.posts[postId].splice(commentId, 1);
        res.status(200).send({
            id: commentId
        });
    }
};
