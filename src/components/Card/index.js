import React from 'react';
import {
    StyledCardItem
} from './styled'

const Card = (props) => {

    return (
        <StyledCardItem>{props.content.word}</StyledCardItem>
    )
}

export default Card
