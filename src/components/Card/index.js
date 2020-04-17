import React, {useState} from 'react';
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
    word
}) => {

  const [clicked, setClicked] = useState(false);
  // const { word, discovered, _id} = item;

  const onClick = () => {
    setClicked(!clicked);
    // selectCard({_id, word});
  };

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
