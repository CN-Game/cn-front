import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
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

const Home = ({ socket }) => {

  const [idGame, setIdGame] = useState('');
  const [error, setError] = useState(null);
  const history = useHistory();
  const regex = /^[0-9]+$/;

  useEffect( () => {
    if (Object.keys(socket).length) {
      socket.disconnect()
    }
  }, [socket]);

  const handleChangeId = async (e) => {
    if((regex.test(e.target.value) && e.target.value.length <= 6) || e.target.value.length === 0){
      setIdGame(e.target.value)
    }
  };

  const createGame = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/games`);

    history.push(`/waiting-room/${res.data.gameId}`)
  };

  const joinGame = async () => {
    if (idGame.length === 6) {
      await axios.get(`${process.env.REACT_APP_API_URL}/games/${idGame}`).then(response => {
        console.log(response);
      }).catch(error => {
        setError(error.response);
        console.log(error.response);
      });
    } else {
      setError({data: "Un ID est composé de 6 chiffres"})
    }
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
                Une nouvelle façon de jouer à <code>CODE NAMES</code> avec vos amis.
              </p>
            </StyledTopText>
          </StyledTopCard>
          <StyledTopRightCard color={color.blue}rotate={26} word={'Obstacle'} discovered={false} />

        <StyledActionContainer>
          <StyledJoinGame>
            <label htmlFor='id'>Game ID</label>
            <Input onChange={handleChangeId} onKeyUp={enterPress} value={idGame} name="id" type="text" error={error}/>
            <Button onClick={joinGame} text={'Rejoindre'} />
          </StyledJoinGame>
          <StyledCreateButton>
            <Button onClick={createGame} text={'Créer partie'} />
          </StyledCreateButton>
        </StyledActionContainer>

      </MainContainer>
    )
};

const mapStateToProps = state => {
  return { socket: state.socket };
};

export default connect(mapStateToProps, null)(Home);
