import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class SongList extends Component{

    renderSongs(){
        const { songs } = this.props.data;
        if(songs){
            return this.props.data.songs.map((song, key) => {
                return (
                    <li key={key}>
                        {song.title}
                    </li>
                )
            })
        }

    }
    render(){
        if(this.props.data.loading) { return <div>Loading....</div>}
        return (<div>
            {this.renderSongs()}
        </div>);
    }
}

const query = gql`
{
    songs {
        title
        id
        lyrics{
          content
        }
    }
}
`;

export default graphql(query)(SongList);
