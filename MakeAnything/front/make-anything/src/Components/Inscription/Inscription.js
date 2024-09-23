import React, { Component } from 'react'
import './Inscription.css'
import axios from 'axios'
import { FrontBackURLContext } from '../FrontBackURLContext'
export class Inscription extends Component {
  
  constructor(props) {
    super(props)
  
    this.state = {
        username: '',
        email: '',
        picture : null,
        password: '',
        confirmpassword: '',
        regex: false
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
    const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

    this.setState({regex: regExp.test(this.state.password)});

  }

  handleconfirmpasswordChange = (event) => {
    this.setState({confirmpassword: event.target.value});
  }


  handleSubmit = event =>{
    event.preventDefault();

    const [frontURL, backURL] = this.context;

    if(this.state.password !== this.state.confirmpassword || this.state.password.length < 8){
      alert("Les mots de passe ne correspondent pas ou sont trop courts");
        return;
    }
    if(!this.state.regex){
      alert('Le mot de passe doit contenir au moins 12 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial parmis les suivants: "@$!%*?&"');
      return;
    }
    const formData = new FormData();
    formData.append('picture', this.state.picture);
    formData.append('username', this.state.username);
    formData.append('email', this.state.email);
    formData.append('password', this.state.password);
    axios.post(backURL + '/inscription', formData)
    .then(response => {
        console.log(response);
        // this.props.history.push('/connexion');
        window.location.href = '/connexion';
        // redirect('/connexion');
      })
      .catch(error => {
        console.log(error.message);
      })
}

  render() {

    const [frontURL, backURL] = this.context;

    return (
    <div className='form'>
        <h1 className='title'>Inscription</h1>
        <form action={backURL + '/inscription'} method='post' onSubmit={this.handleSubmit}>
            <div><label htmlFor='username' className='content'>Nom d'utilisateur <span>*</span></label>
            <input type="text" required id='username' name='username' value={this.state.username} onChange={this.handleusernameChange}></input></div>
            <div><label htmlFor='email' className='content'>Adresse mail <span>*</span></label>
            <input type="email"required id='email' name='email' value={this.state.email} onChange={this.handleemailChange}></input></div>
            <div><label htmlFor='picture' className='content'>Photo de profil</label>
            <input type='file'id='picture' accept='.jpeg, .png' name='picture' onChange={this.handleFileChange}></input></div>
            <div><label htmlFor='password' className='content'>Mot de passe <span>*</span></label>
            <input type="password" required id='password' name='password' value={this.state.password} onChange={this.handlepasswordChange}></input></div>
            <div><label htmlFor='confirmpassword' className='content'>Confirmer le mot de passe <span>*</span></label>
            <input type="password" required id='confirmpassword' name='confirmpassword' value={this.state.confirmpassword} onChange={this.handleconfirmpasswordChange}></input></div>
            <input type="submit" value="S'inscrire" className='submit button'></input>
        </form>
    </div>
    )
  }
}

Inscription.contextType = FrontBackURLContext;

export default Inscription