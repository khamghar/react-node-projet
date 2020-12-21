import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import { Link } from "react-router-dom";
import moment from "moment";

function Posts() {
  const [posts, setPosts] = useState([]);
  const[show, setShow] = useState(3);

  useEffect(() => {
    const unsubscribe = getPosts();
    return () =>{
        unsubscribe();
    }
  }, []);

  const getPosts = () => {
    return firebase
      .collection("posts")
      .orderBy("created_at", "desc")
      .onSnapshot(snapshot => {
        //console.log(snapshot);
        const posts = snapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() };
        });
        //console.log(posts);
         setPosts(posts);
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

  const renderPosts = () => {
    return (
      posts &&
      posts.slice(0, show).map((post, index) => (
        <div key={index}>
          <div className="post">
            <div className="post-image">
              <img src={post.image} alt="" />
            </div>
            <div className="post-content">
              <Link to ={`/post/${post.id}`}>
                <h3 className="post-title font-medium">{post.title}</h3>
              </Link>
              <h5 className="post-details">
                <span className="posted-by font-semibold">
                  {post.author}
                </span>
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
            </div>
          </div>
            <hr className="line"/>
        </div>
      ))
    );
  };

  const renderTop = ()=>{
    const topPosts = posts.sort(
      (postone, postTwo) => postTwo.vote_count - postone.vote_count
    );
    return topPosts.map((post, index) =>{
      return <Link key={index} to={`/post/${post.id}`}>
      <h3 className="post-sidebar-title trendlink">
      {index +1}  
      {" "}
      {post.title}
      </h3>  
      </Link>
    })
  }

  return(
  <div className="main">
    <div className="main-content">
      <div className="posts">{renderPosts()}</div>
    </div>


    <div className="sidebar">
        <h3 className="sidebar-title">Tendences</h3>
        <div className="sidebar-content"> 
            {renderTop()}
        </div>
      </div>
  </div>
  ) 
}

export default Posts;
