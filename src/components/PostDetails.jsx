import React, { useState, useEffect, useContext } from "react";
import firebase from "../firebase";
import moment from "moment";
import AuthContext from "./AuthContext";
import { Link } from "react-router-dom";

function PostDetails(props) {
  const [post, setPost] = useState([]);
  const postId = props.match.params.postId;
  const postRef = firebase.collection("posts").doc(postId);
  const [comment, setComment] = useState("");
  const { authUser} = useContext(AuthContext);

  useEffect(() => {
    let isSubscribed = true;
      postRef.get().then(doc =>{   // unmounted
        if(isSubscribed){
        setPost({...doc.data(), id: doc.id});
      }
  })
    return () =>(isSubscribed=false); // ComponentwillUnmount()
  }, [post, postRef]);

  const getPost = () => {
    postRef.get().then(doc => {
      if (doc.exists) {
        setPost({ ...doc.data(), id: doc.id });
      }
    });
  };

  const voteUp = postId => {
    const myPost = firebase.collection("posts").doc(postId);
    myPost.get().then(doc => {
      if (doc.exists) {
        const previousCount = doc.data().vote_count;
        myPost.update({ vote_count: previousCount + 1 });
      }
    });
  };

  const voteDown = postId => {
    const myPost = firebase.collection("posts").doc(postId);
    myPost.get().then(doc => {
      if (doc.exists) {
        const previousCount = doc.data().vote_count;
        myPost.update({ vote_count: previousCount - 1 });
      }
    });
  };

  const addComment = () => {
    postRef.get().then(doc =>{
      if(doc.exists){
      const previousComment = doc.data().comments || [];
      const commentText ={
        postedBy :{id: "336", name: "samadi"},
        created : Date.now(),
        text : comment
      }
      const commentsUpdated = [...previousComment, commentText];
      postRef.update({comments : commentsUpdated});
      setPost(prevState =>({
        ...prevState, comments : commentsUpdated
      }))
      setComment("");
    }
  })
}



  const renderPost = () => {
    return (
      post && (
        <div className="post-show">
          <div className="post-image-full">
            <img src={post.image} alt="" />
          </div>
          <div className="post-content">
            <h3 className="post-title font-medium">{post.title}</h3>
            <h5 className="post-details">
              <span className="posted-by font-semibold">{post.author}</span>
              <span className="date font-bold">
                {moment(post.created_at).local("fr").fromNow()}
              </span>
            </h5>
            <p className="post-body">{post.body}</p>
            <div className="votes">
              <div className="up" onClick={() => voteUp(post.id)}>
                &#8593;
              </div>
              <div className="down" onClick={() => voteDown(post.id)}>
                &#8595;
              </div>
              <div className="count">{post.vote_count}</div>
            </div>     
              {
                authUser ?(
                <>
                <textarea
                  className="textarea"
                  placeholder="Commentaires"
                  value={comment}
                  onChange={event => setComment(event.target.value)}
                  cols="30"
                  rows="10"
                />
              <div>
                <button className="btn btn-primary" onClick={() => addComment()}>
                  Ajouter
                </button>
              </div>
                </>
                ):(
                <>
                <Link to="/Login" className="comment-title" >
                  Vous devez vous connecter pour pouvoir commenter
                </Link>
              </>
                )}
            <div className="comments font-bold ">
              <h3>Commentaires {post.comments && post.comments.length}</h3>
            </div>
            {post.comments &&
              post.comments.map((comment, index) => (
                <div key={index}>
                  <p className="comment-author">
                    {post.author } |{" "}
                    {moment(comment.created)
                      .local("fr")
                      .format("MMMM Do YYYY, h:mm a")} | {" "}
                      
                  </p>
                  <p className="comments">{comment.text}</p>
                </div>
              ))}
          </div>
        </div>
      )
    );
  };

  return renderPost();
}

export default PostDetails;
