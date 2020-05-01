import React, {useEffect, useState} from 'react';
import {
    StyledCardItem
} from './styled'

const Card = ({
    color = '#EFEFD0',
    text,
    rotate,
    className= '',
    reveal = false,
    realColor,
    clickable,
    selectCard,
    item,
    discovered,
    word,
    socket,
    turn,
    player
}) => {

  const [clicked, setClicked] = useState(false);
  const [cardsSelected, setCardsSelected] = useState([]);

  const onClick = () => {
      if ((turn === 'BA' && player.role === 'BA') || (turn === 'RA' && player.role === 'RA')) {
          socket.emit('SELECT_CARD', {item, turn, player});
      }
  };

  if (socket) {
      socket.on('CARDS_SELECT_UPDATE', async (data) => {
          await setCardsSelected(data);
      });
  }

  useEffect( () => {
      setClicked(
          cardsSelected.some(function (card) {
            return card._id === item._id;
          })
      )
    }
  , [cardsSelected, item]);

  return (
    <StyledCardItem
      className={className}
      color={color}
      rotate={rotate}
      clicked={clicked}
      discovered={discovered}
      reveal={reveal}
      realColor={realColor}
      onClick={onClick}
      clickable={clickable}
    >
        {word}
    </StyledCardItem>
  )
}

export default Card
