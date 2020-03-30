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
}) => {

  if (reveal) {
    color = realColor;
  }

  const [clicked, setClicked] = useState(false);
  const [discovered, setDiscovered] = useState(false);

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
      onClick={onClick}
    >
        {text}
    </StyledCardItem>
  )
}

export default Card
