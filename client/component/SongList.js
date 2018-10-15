import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchSongs';

class SongList extends Component{

    onSongDelete(id){
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
    renderSongs(){
        const { songs } = this.props.data;
        if(songs){
            return this.props.data.songs.map(({id, title}, key) => {
                return (
                    <li key={key} className={'collection-item'}>
                        <Link to={`songs/${id}`}>
                            {title}
                        </Link>
                        <i className={'material-icons'} onClick={() => this.onSongDelete(id)}>delete</i>
                    </li>
                )
            })
        }
    }
    render(){
        if(this.props.data.loading) { return <div>Loading....</div>}
        return (
            <div>
             <ul className={'collection'}>
                {this.renderSongs()}
             </ul>
                <Link to={'songs/new'} className={'btn-floating btn-large green right'}>
                    <i className={'material-icons'}>add</i>Create Song
                </Link>
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
    graphql(query)(SongList)
);
