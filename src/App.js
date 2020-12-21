import React, {useState, useEffect} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import CreatePost from './components/CreatePost'
import Posts from './components/Posts'
import Login from './components/Login'
import Header from './components/Header'
import PostDetails from './components/PostDetails'
import Register from './components/Register'
import {firebaseAuth} from './firebase'
import AuthContext from './components/AuthContext/index'
import Search from './components/Search'

function App() {
  const [authUser, setAuthUser] = useState(null);
  useEffect(()=>{
  const unsubscribe = firebaseAuth.onAuthStateChanged(user => {
      if(user){
        setAuthUser(user);
        console.log(user);
      }else{
        setAuthUser(null);
      }
    })
    return () =>{
      unsubscribe();
    }
  }, [])
  return (
    <BrowserRouter>
        <div className="">
          <AuthContext.Provider value={{authUser,firebaseAuth}}>
              <Header />
              <Switch>
                <Route path="/" exact component={Posts} />
                <Route path="/create" exact component={CreatePost} />
                <Route path="/post/:postId" exact component={PostDetails} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/search" exact component={Search} />
              </Switch>
          </AuthContext.Provider>

        </div>
    </BrowserRouter>
  );
}

export default App;
