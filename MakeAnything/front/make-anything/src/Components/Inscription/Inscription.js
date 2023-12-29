import React, { Component } from 'react'
import './Inscription.css'
import axios from 'axios'
export class Inscription extends Component {
  
  constructor(props) {
    super(props)
  
    this.state = {
        username: '',
        email: '',
        picture : null,
        password: '',
        confirmpassword: ''
    }
  }

  handleFileChange = event =>{
    this.setState({picture : event.target.files[0]});
}

  handleusernameChange = (event) => {
    this.setState({username: event.target.value});
  }

  handleemailChange = (event) => {
    this.setState({email: event.target.value});
  }

  handlepasswordChange = (event) => {
    this.setState({password: event.target.value});
  }

  handleconfirmpasswordChange = (event) => {
    this.setState({confirmpassword: event.target.value});
  }

  handleSubmit = event =>{
    event.preventDefault();
    if(this.state.password !== this.state.confirmpassword || this.state.password.length < 8){
      alert("Les mots de passe ne correspondent pas ou sont trop courts");
        return;
    }
    const formData = new FormData();
    formData.append('picture', this.state.picture);
    formData.append('username', this.state.username);
    formData.append('email', this.state.email);
    formData.append('password', this.state.password);
    axios.post('http://localhost:5000/inscription', formData)
    .then(response => {
        console.log(response);
        window.location.href = '/connexion';
        // redirect('/connexion');
      })
      .catch(error => {
        console.log(error.message);
      })
}

  render() {
    return (
    <div className='content'>
        <h1 className='title'>Inscription</h1>
        <form action='http://localhost:5000/inscription' method='post' onSubmit={this.handleSubmit}>
            <div><label htmlFor='username'>Nom d'utilisateur <span>*</span></label>
            <input type="text" required id='username' name='username' value={this.state.username} onChange={this.handleusernameChange}></input></div>
            <div><label htmlFor='email'>Adresse mail <span>*</span></label>
            <input type="email"required id='email' name='email' value={this.state.email} onChange={this.handleemailChange}></input></div>
            <div><label htmlFor='picture'>Photo de profil</label>
            <input type='file'id='picture' name='picture' onChange={this.handleFileChange}></input></div>
            <div><label htmlFor='password'>Mot de passe <span>*</span></label>
            <input type="password" required id='password' name='password' value={this.state.password} onChange={this.handlepasswordChange}></input></div>
            <div><label htmlFor='confirmpassword'>Confirmer le mot de passe <span>*</span></label>
            <input type="password" required id='confirmpassword' name='confirmpassword' value={this.state.confirmpassword} onChange={this.handleconfirmpasswordChange}></input></div>
            <input type="submit" value="S'inscrire" className='submit'></input>
        </form>
    </div>
    )
  }
}

export default Inscription