import React from 'react';
import { StyledBoard } from './styled'
import Card from '../Card'

const Board = (props) => {

    return (
        <StyledBoard>
            {props.data.map( item => (
                <Card key={item.word} content={item}></Card>
            ))}
        </StyledBoard>
    )
}

export default Board
