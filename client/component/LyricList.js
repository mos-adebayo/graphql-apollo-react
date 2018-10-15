import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchSongs';

class LyricList extends Component{

    onLike(id){
        // e.preventDefault();
        this.props.mutate({
            variables: {
                id
            }
        }).then((res)=>{
            this.props.data.refetch();
        }).catch((err)=>{
            // console.log('Error', err);
        })
    }
    renderLyrics(){
        return this.props.lyrics.map(({id, content}, key) => {
            return (
                <li key={key} className={'collection-item'}>
                    {content}
                    <i className={'material-icons'} onClick={() => this.onLike(id)}>thumb_up</i>
                </li>
            )
        })
    }
    render(){
        return (
            <div>
                <ul className={'collection'}>
                    {this.renderLyrics()}
                </ul>
            </div>
        );
    }
}

const mutation = gql`
mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
        id
    }
}`;
export default graphql(mutation)(
    graphql(query)(LyricList)
);
