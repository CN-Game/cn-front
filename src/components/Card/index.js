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
    discovered,
    clickable,
}) => {

  const [clicked, setClicked] = useState(false);

  const onClick = () => {
    setClicked(!clicked);
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
        {text}
    </StyledCardItem>
  )
}

export default Card
