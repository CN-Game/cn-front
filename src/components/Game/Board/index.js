import React, { useEffect, useState } from 'react';
import { StyledBoard } from './styled'
import Card from '../../Card'

const Board = ({data, player}) => {

    const [reveal, setReveal] = useState();

    useEffect(function () {
        let toto = player.role === 'BS';
        console.log(toto)
        setReveal(toto)
    })

    return (
        <StyledBoard>
            {data.map( item => (
                <Card key={item.word} text={item.word} reveal={reveal} realColor={item.color}/>
            ))}
        </StyledBoard>
    )
}

export default Board
