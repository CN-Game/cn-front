import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import io from "socket.io-client"
import Button from '../Button';
import Input from '../Input';
import TeamCard from "./TeamCard";
import { setSocket } from '../../redux/actions/socketActions';
import {
    WaitingRoomContainer,
    PseudoContainer,
    StyledTitlePseudo,
    StyledPseudo,
    StyledPseudoWrapper,
    StyledId,
    StyledChoosePseudo,
    StyledCenterColumn,
    StyledButton,
} from './styled';

const WaitingRoom = ({ setSocket, socket }) => {

    const history = useHistory();
    const { id } = useParams();

    const [pseudo, setPseudo] = useState('');
    const [players, setPlayers] = useState([]);
    const [selectTeam, setSelectTeam] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        setSocket(io(process.env.REACT_APP_SOCKET_URL, {query: 'room=' + id}));
    }, [id]);

    const handleChange = (e) => {
        if (e.target.value.length <= 15) {
            setPseudo(e.target.value)
        }
    };

    const enterPress = (e) => {
        const key = e.keyCode || e.which;
        if (key === 13) (
            handlePseudo()
        )
    };

    const handlePseudo =  async () => {
        if (pseudo.length === 0) {
            setError({data: "Veuillez saisir un pseudo"});
            return false;
        }
        setSelectTeam(true);

        const update = async (socket) => {
            await axios.post(`${process.env.REACT_APP_API_URL}/games/${id}`, {
                pseudo: pseudo,
                socketId: socket.id,
            })
        };

        await update(socket);

        socket.emit('New user connected');

        // socket.on('user_leave', function (data) {
        //     console.log(data.user_name + 'left the game')
        // });

        socket.on('UPDATE_CLIENT', async (data) => {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/games/${id}`)

            setPlayers(res.data.players);
        });

        socket.on('GO_TO_GAME', function () {
            launchGame();
        });
    };

    const handleChoiceTeam = (data) => {
        setCurrentPlayer({socketId: socket.id, role: data.role, team: data.team});
        socket.emit('Choose team', data);
    };

    const launchGame = () => {
        history.push({
            pathname: `/game/${id}`,
        })
    };

    return (
      <>
            <WaitingRoomContainer>
                <TeamCard
                    team={"Blue"}
                    onClickSpy={() => handleChoiceTeam( { role: 'BS', team: 'blue' })}
                    onClickAgent={() => handleChoiceTeam({ role: 'BA', team: 'blue' })}
                    players={players.filter(player => player.team === "blue")}
                />
                <StyledCenterColumn>
                    <StyledId>
                        <p>{id}</p>
                    </StyledId>

                    {!selectTeam ? (
                        <StyledChoosePseudo>
                            <label htmlFor='pseudo'>Pseudo</label>
                            <Input
                                onChange={handleChange}
                                onKeyUp={enterPress}
                                value={pseudo}
                                name="pseudo"
                                type="text"
                                error={error}
                            />
                            <Button onClick={handlePseudo} text={'Use this pseudo'} />
                        </StyledChoosePseudo>
                    ) : (
                        <>
                            <PseudoContainer>
                                <StyledTitlePseudo>Choose your team</StyledTitlePseudo>
                                <StyledPseudoWrapper>
                                    {players.map(player => (
                                        !player.role && <StyledPseudo key={player._id}>{player.pseudo}</StyledPseudo>
                                    ))}
                                </StyledPseudoWrapper>
                            </PseudoContainer>
                            <StyledButton text={'Launch Game'} onClick={() => socket.emit('GAME_BEGIN')} />
                        </>
                    )}

                </StyledCenterColumn>
                <TeamCard
                    team={"Red"}
                    onClickSpy={() => handleChoiceTeam( { role: 'RS', team: 'red' })}
                    onClickAgent={() => handleChoiceTeam({ role: 'RA', team: 'red' })}
                    players={players.filter(player => player.team === "red")}
                />
            </WaitingRoomContainer>
      </>
    );
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setSocket: socket => setSocket(socket),
    }, dispatch);
};

const mapStateToProps = state => {
    return { socket:  state.socket}
};

export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom);
