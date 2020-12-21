import React, {useState} from 'react'
import {firebaseAuth} from '../firebase';

function Login(props) {
    const [submitted, setSubmitted] = useState(false);
    const [user, setUser] = useState({
        email: '',
        password:''
    })

    const handleInputChange = event =>{
        setUser({
            ...user,[event.target.name] : event.target.value
        })
    }

    const handleFormSubmit = event =>{
        event.preventDefault();
        setSubmitted(true);
        login(user);
        setUser({
            email: '',
            password: ''
        })
    }

    const login =({email, password})=>{
        const loggedUser = firebaseAuth.signInWithEmailAndPassword(email,password)
        .then(userLogged => {

            return userLogged;
        })
        console.log(loggedUser)
        props.history.push('/');
    }

    return (
        <div className="form-container">
            <h2 className="register-form-title">Connexion</h2>
                <form onSubmit={handleFormSubmit}>

                    <input type="email" name="email"
                    required className="form-control"
                    onChange={handleInputChange}
                    value={user.email}
                    placeholder="email"
                    autoComplete="off"
                    />

                    <input type="password" name="password"
                    required className="form-control"
                    onChange={handleInputChange}
                    value={user.password}
                    placeholder="Mot de passe"
                    autoComplete="off"
                    />
                    <div>
                        <button className="btn btn-primary"
                        type="submit">Valider</button>
                    </div>
                </form>
            

        </div>
    )
}

export default Login