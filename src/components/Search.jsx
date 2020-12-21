import React, {useState} from 'react'
import firebase from '../firebase'
import {Link}  from 'react-router-dom'
import moment from "moment";

 function Search() {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");

    const handleSearchChange = event =>{
        setSearch(event.traget.value)
    }

    const handleFormSubmit = event =>{
        event.preventDefault();
    }

    return (
        <div>
            <div class="form-container">
            <h2 className="register-form-title">Recherche</h2>
            <form onSubmit={handleFormSubmit}>
            <input type="search"
            className="form-control"
            placeholder="Recherche ... "
            value={search}
            onChange={handleSearchChange}/>
            <button type="submit" class="btn btn-primary">Rechercher</button>
            </form>
            </div>
        </div>
    )
}

export default Search