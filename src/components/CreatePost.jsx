import React, { useState, useEffect, useContext } from "react";
import firebase from "../firebase";
import {firebaseStorage} from '../firebase'
import AuthContext from './AuthContext'

export default function CreatePost(props) {
  const [post, setPost] = useState({
    title: "",
    body: "",
    image: "",
  });

  const [image, setImage] = useState(null)
  const {authUser} = useContext(AuthContext)
 

  useEffect(()=>{
    if(!authUser)
    props.history.push("/login");
  },[])


  const handleFormSubmit = event => {
    event.preventDefault();
    console.log(image)
    handleImageUpload();
  };

  const handleImageUpload =()=>{
    const uploadImage = firebaseStorage.ref(`images/${image.name}`).put(image);
    uploadImage.on("state_changed", snapshot =>{
    console.log("uploading ...")
    },error =>{
        console.log(error.message)
    }, ()=>{
        firebaseStorage.ref('images').child(image.name)
        .getDownloadURL()
        .then(url => {
            const {title, body}= post;
            const newPost={
                title, 
                body,
                image : url,
                author : authUser.displayName,
                vote_count:0,
                comments: [],
                created_at : Date.now()
            }
            firebase.collection("posts").add(newPost);
            props.history.push("/");
        })
    })
  }

  const handleInputChange = event => {
    setPost({
      ...post,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileInput = event =>{
      if(event.target.files[0])
      {
          const image = event.target.files[0];
          setImage(image);

      }
  }

  return (
    <div className="form-container">
      <h2 className="register-form-title">Ajouter un Poste</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="title"
          required
          className="form-control input"
          onChange={handleInputChange}
          value={post.title}
          placeholder="Titre"
          autoComplete="off"
        />
        <textarea
          className="textarea"
          name="body"
          placeholder="Description ..."
          value={post.body}
          onChange={handleInputChange}
          cols="30"
          rows="10"
        />
        <input
          type="file"
          name="image"
          required
          className="form-control input"
          onChange={handleFileInput}
        />
        <div>
          <button className="btn btn-primary" type="submit">
            Valider
          </button>
        </div>
      </form>
    </div>
  );
}
