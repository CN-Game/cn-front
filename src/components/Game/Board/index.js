import React, { useEffect, useState } from 'react';
import { StyledBoard } from './styled'
import Card from '../../Card'

const Board = ({data, player}) => {

    const [reveal, setReveal] = useState();
    const [clickable, setClickable] = useState();

    useEffect(function () {
        setReveal(player.role === 'BS' || player.role === 'RS')
        setClickable(player.role === 'BA' || player.role === 'RA')
    });

    return (
        <StyledBoard>
            {data.map( item => (
                <Card
                    key={item.word}
                    text={item.word}
                    reveal={reveal}
                    realColor={item.color}
                    discovered={item.discovered}
                    clickable={clickable}
                />
            ))}
        </StyledBoard>
    )
}

export default Board
