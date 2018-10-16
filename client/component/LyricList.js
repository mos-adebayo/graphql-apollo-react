import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricList extends Component{
    onLike(id, likes){
        this.props.mutate({
            variables: { id },
            optimisticResponse: {
                __typename: 'Mutation',
                likeLyric: {
                    id: id,
                    __typename: 'LyricType',
                    likes: likes + 1
                }
            }
        });
    }
    renderLyrics(){
        return this.props.lyrics.map(({id, content, likes}, key) => {
            return (
                <li key={key} className={'collection-item vote-box'}>
                    {content}
                    <i className={'material-icons'} onClick={() => this.onLike(id, likes)}>thumb_up</i>
                    {likes}
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
mutation LikeLyric($id: ID){
  likeLyric(id: $id){
    id
    likes
  }
}
`;
export default graphql(mutation)(LyricList);
