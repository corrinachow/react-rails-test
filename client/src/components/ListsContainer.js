import React, { Component } from 'react';
import axios from 'axios';
import List from './List'
import NewListForm from './NewListForm'


class ListsContainer extends Component {

  constructor(props){
    super(props)
    this.state = {
      lists:[]
    }
    this.addNewList = this.addNewList.bind(this)
  }

  componentDidMount(){
    axios.get('/api/v1/lists.json')
    .then(response => {
      console.log(response);
      this.setState({
        lists: response.data
      });
    })
    .catch(error => console.log(error))
  }

  addNewList(title, excerpt) {
      axios.post( '/api/v1/lists', { list: {title, excerpt} })
      .then(response => {
          console.log(response)
          const lists = [ ...this.state.lists, response.data ]
          this.setState({lists})
      })
      .catch(error => {
          console.log(error)
      })
  }

  removeList(id){
    axios.delete('/api/v1/lists' + id)
    .then(response => {
      const lists = this.state.lists.filter(
        list => list.id !== id
      )
      this.setState({lists})
    })
    .catch(error => console.log(error))
  }

  uploadWidget() {
    window.cloudinary.openUploadWidget({ cloud_name: 'dea31fa8u', upload_preset: 'rmli3253'},
      function(error, result) {
        console.log(result);
      });
    }

  render() {
      return (
          <div className="Lists-container">
              {this.state.lists.map(list => {
                return(<List list={list} key={list.id} onRemoveList = {this.removeList} />)
              })}
          <NewListForm onNewList={this.addNewList} />
          <button onClick={this.uploadWidget.bind(this)} className="upload-button">
          Add Image
          </button>
          </div>
      )
  }
}

export default ListsContainer;