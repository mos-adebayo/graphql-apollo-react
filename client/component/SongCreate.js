import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class SongCreate extends Component{
    constructor(props){
        super(props);

        this.state = {
            title: ''
        }
    }
    handleChange (event)  {
        this.setState({title: event.target.value});
    };
    onSubmit(e){
        e.preventDefault();
        const { title } = this.state;
        // Send variables to mutate
        this.props.mutate({
            variables: {
                title
            }
        });
    }
    render(){
       return (
           <div>
               <h3>Create a New Song</h3>
               <form onSubmit={e => this.onSubmit(e) }>
                   <label>Song Title</label>
                   <input type="text" value={this.state.title} onChange={event => this.handleChange(event)}/>
               </form>
           </div>
       )
    }
}

const mutation = gql`
mutation AddSong($title: String){
  addSong(title: $title){
    id
    title
  }
}
`;

export default graphql(mutation)(SongCreate);
