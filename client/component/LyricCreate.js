import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricCreate extends Component{
    constructor(props){
        super(props);

        this.state = {
            content: ''
        }
    }

    onSubmit(e){
        e.preventDefault();
        const { content } = this.state;
        // Send variables to mutate
        this.props.mutate({
            variables: {
                content,
                songId: this.props.songId
            }
        }).then(() => {
            this.setState({content: ''})
        });
    }
    render(){
        let { content } = this.state;
       return (
           <div>
               <form onSubmit={e => this.onSubmit(e) }>
                   <label>Add a Lyric</label>
                   <input type="text" value={content} onChange={event => this.setState({content: event.target.value})}/>
               </form>
           </div>
       )
    }
}

const mutation = gql`
    mutation AddLyric($songId: ID, $content: String){
      addLyricToSong(content: $content, songId: $songId){
        id
        lyrics {
            content
          }
        }
    }
`;

export default graphql(mutation)(LyricCreate);
