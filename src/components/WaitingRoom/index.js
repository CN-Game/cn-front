import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from "react-router-dom";
import io from "socket.io-client"
import Button from '../Button';
import Input from '../Input';
import TeamCard from "./TeamCard";
import {
    WaitingRoomContainer,
    PseudoContainer,
    StyledTitlePseudo,
    StyledPseudo,
    StyledPseudoWrapper,
} from './styled';

const WaitingRoom = () => {

    const [pseudo, setPseudo] = useState('');
    const [players, setPlayers] = useState([]);
    const [selectTeam, setSelectTeam] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState({});
    const [socket, setSocket] = useState({});
    const history = useHistory();

    const { id } = useParams();

    useEffect(() => {
        setSocket(io('http://localhost:3001', {query: 'room=' + id}));

    }, []);

    const handleChange = (e) => {
        setPseudo(e.target.value)
    };

    const handlePseudo =  async () => {
        setSelectTeam(true);

        const update = async (socket) => {
            await axios.post(`${process.env.REACT_APP_API_URL}/games/${id}`, {
                pseudo: pseudo,
                socketId: socket.id,
            })
        };

        await update(socket);

        socket.emit('New user connected');

        socket.on('user_leave', function (data) {
            console.log(data.user_name + 'left the game')
        });

        socket.on('UPDATE_CLIENT', async (data) => {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/games/${id}`)

            setPlayers(res.data.players);
        });

        socket.on('GO_TO_GAME', function () {
            launchGame();
            setPlayers([{pseudo: 'bidule'}])
        });
    };

    const handleChoiceTeam = (data) => {
        setCurrentPlayer({socketId : socket.id, role : data.role, team: data.team});
        socket.emit('Choose team', data);
    };

    const launchGame = () => {
        history.push({
            pathname: `/game/${id}`,
            state: {
                socket: socket,
            }
        })
    };

    return (
      <>
          <h1>Waiting Room - {id}</h1>
          {!selectTeam ? (
            <section>
                <label htmlFor='pseudo'>Your pseudo</label>
                <Input onChange={handleChange} value={pseudo} name="pseudo" type="text" />
                <Button onClick={handlePseudo} text={'GO'} />
            </section>
          ) : (
          <>
            <WaitingRoomContainer>
                <TeamCard
                    team={"Blue"}
                    onClickSpy={() => handleChoiceTeam( { role: 'BS', team: 'blue' })}
                    onClickAgent={() => handleChoiceTeam({role: 'BA', team: 'blue'})}
                    players={players.filter(player => player.team === "blue")}
                />
                <PseudoContainer>
                    <StyledTitlePseudo>Choose your team</StyledTitlePseudo>
                    <StyledPseudoWrapper>
                        {players.map(player => (
                            !player.role && <StyledPseudo>{player.pseudo}</StyledPseudo>
                        ))}
                    </StyledPseudoWrapper>
                </PseudoContainer>
                <TeamCard
                    team={"Red"}
                    onClickSpy={() => handleChoiceTeam( { role: 'RS', team: 'red' })}
                    onClickAgent={() => handleChoiceTeam({role: 'RA', team: 'red'})}
                    players={players.filter(player => player.team === "red")}
                />
            </WaitingRoomContainer>
            <Button text={'Launch Game'} onClick={() => socket.emit('GAME_BEGIN')} />
          </>
          )}
      </>
    );
};

export default WaitingRoom;
