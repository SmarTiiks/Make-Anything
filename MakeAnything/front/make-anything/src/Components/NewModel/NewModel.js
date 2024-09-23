import React, { Component } from 'react'
import './NewModel.css'
import axios from 'axios'
import { FrontBackURLContext } from '../FrontBackURLContext'
export class NewModel extends Component {

  constructor(props) {
    super(props)

    this.state = {
      nom: '',
      desc: '',
      pictures: null,
      files: null,
      conseils: '',
      tags: []
    }
  }

  handlePictureChange = event => {
    this.setState({ pictures: event.target.files });
  }

  handleFilesChange = event => {
    this.setState({ files: event.target.files });
  }

  handleTitleChange = (event) => {
    this.setState({ nom: event.target.value });
  }

  handleDescChange = (event) => {
    this.setState({ desc: event.target.value });
  }

  handleConseilChange = (event) => {
    this.setState({ conseils: event.target.value });
  }

  handleCheckboxChange = (event) => {
    let tagName = event.target.value;
    if (this.state.tags.includes(tagName)) {
      this.setState((prevState)=>({
        tags: prevState.tags.filter(tag => tag !== tagName)
      }));
    } else {
      this.setState(prevState=>({
        tags: [...prevState.tags, tagName]
      }));
    }
  }

  check = (event) => {
    console.log(this.state.tags);
  }

  handleSubmit = event => {
    event.preventDefault();
    const [frontURL, backURL] = this.context;

    const formData = new FormData();
    formData.append('nom', this.state.nom);
    formData.append('desc', this.state.desc);
    formData.append('conseils', this.state.conseils);
    formData.append('tags', this.state.tags);
    for (let i = 0; i < this.state.pictures.length; i++) {
      formData.append('pictures', this.state.pictures[i]);
    }
    for (let i = 0; i < this.state.files.length; i++) {
      formData.append('files', this.state.files[i]);
    }
    axios.post(backURL + '/api/newModel', formData, { withCredentials: true })
      .then(response => {
        window.location.href = '/moncompte';
      })
      .catch(error => {
        console.log(error.message);
      })
  }

  render() {
    return (
      <div className='form'>
        <h1 className='title'>Nouveau Modèle</h1>
        <form onSubmit={this.handleSubmit}>
          <div><label htmlFor='title' className='content'>Titre <span>*</span></label>
            <input type="text" required id='nom' name='nom' value={this.state.nom} onChange={this.handleTitleChange}></input></div>
          <div><label htmlFor='desc' className='content'>Description <span>*</span></label>
            <textarea required id='desc' name='desc' onChange={this.handleDescChange} value={this.state.desc}></textarea></div>
          <div><label htmlFor='desc' className='content'>Conseils</label>
            <textarea id='desc' name='desc' onChange={this.handleConseilChange} value={this.state.conseils}></textarea></div>
          <div><label className='content'>Tags</label><div className='taggroup'>
            <div className='tag'><label htmlFor='decoration'>Décoration</label><input onChange={this.handleCheckboxChange} type='checkbox' value="decoration" name='tags' id='decoration'></input></div>
            <div className='tag'><label htmlFor='gadget'>Gadget</label><input onChange={this.handleCheckboxChange} type='checkbox' value="gadget" name='tags' id='gadget'></input></div>
            <div className='tag'><label htmlFor='rangement'>Rangement</label><input onChange={this.handleCheckboxChange} type='checkbox' value="rangement" name='tags' id='rangement'></input></div>
            <div className='tag'><label htmlFor='figurine'>Figurine</label><input onChange={this.handleCheckboxChange} type='checkbox' value="figurine" name='tags' id='figurine'></input></div>
            <div className='tag'><label htmlFor='bricolage'>Bricolage</label><input onChange={this.handleCheckboxChange} type='checkbox' value="bricolage" name='tags' id='bricolage'></input></div>
          </div></div>
          <div><label htmlFor='picture' required className='content'>Images <span>*</span></label>
            <input type='file' id='pictures' multiple name='pictures' onChange={this.handlePictureChange} accept='.jpeg, .png, .webp, .gif'></input></div>
          <div><label htmlFor='files' required className='content'>Fichiers 3D <span>*</span></label>
            <input type='file' id='files' name='files' onChange={this.handleFilesChange} accept='.obj, .stl, .3mf, .zip, .rar'></input></div>

          <input type="submit" value="Publier le Modèle" className='submit button'></input>
        </form>
      </div>
    )
  }
}

NewModel.contextType = FrontBackURLContext;

export default NewModel