import React, {useState} from 'react'
import {firebaseAuth} from '../firebase';

function Register(props) {
    const [submitted, setSubmitted] = useState(false);
    const [user, setUser] = useState({
        name : '',
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
        register(user);
        setUser({
            name: '',
            email: '',
            password: ''
        })
    }

    const register =({name, email, password})=>{
        const newUser = firebaseAuth.createUserWithEmailAndPassword(email,password)
        .then(userCreated => {
            userCreated.user.updateProfile({
                displayName:name
            })
            return userCreated;
        })
        console.log(newUser)
        props.history.push('/');
    }

    return (
        <div className="form-container">
            <h2 className="register-form-title">Inscription</h2>
                <form onSubmit={handleFormSubmit}>
                    <input type="text" name="name"
                    required className="form-control"
                    onChange={handleInputChange}
                    value={user.name}
                    placeholder="Nom & Prénom"
                    autoComplete="off"
                    />

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

export default Register