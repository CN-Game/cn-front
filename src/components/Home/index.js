import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Button from '../Button';
import Input from '../Input';
import {
  StyledTopCard,
  MainContainer,
  StyledTopText,
  StyledActionContainer,
  StyledJoinGame,
  StyledCreateButton,
  StyledTopLeftCard,
  StyledTopRightCard,
} from './styled';
import { color } from '../../utils/branding';

const Home = () => {

  const [idGame, setIdGame] = useState('');
  const history = useHistory();

  const handleChangeId = async (e) => {
    setIdGame(e.target.value)
  };

  const createGame = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/games`);

    history.push(`/waiting-room/${res.data.gameId}`)
  };

  const joinGame = () => {
    history.push(`/waiting-room/${idGame}`)
  };

  const enterPress = (e) => {
    const key = e.keyCode || e.which;
    if (key === 13) (
      joinGame()
    )
  };

    return (
      <MainContainer>
          <StyledTopLeftCard color={color.red} rotate={-21} word={'Voiture'} />
          <StyledTopCard>
            <StyledTopText>
              <h1>Code Names</h1>
              <p>
                New way to play <code>CODE NAMES</code> with your friends.
              </p>
            </StyledTopText>
          </StyledTopCard>
          <StyledTopRightCard color={color.blue}rotate={26} word={'Obstacle'} discovered={false} />

        <StyledActionContainer>
          <StyledJoinGame>
            <label htmlFor='id'>Game ID</label>
            <Input onChange={handleChangeId} onKeyUp={enterPress} value={idGame} name="id" type="text"/>
            <Button onClick={joinGame} text={'Join Game'} />
          </StyledJoinGame>
          <StyledCreateButton>
            <Button onClick={createGame} text={'Create Game'} />
          </StyledCreateButton>
        </StyledActionContainer>

      </MainContainer>
    )
};

export default Home;
