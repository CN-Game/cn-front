import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import io from "socket.io-client"
import { Link } from 'react-router-dom';
import {
    WaitingRoomContainer,
    BlueTeamContainer,
    RedTeamContainer,
    PseudoContainer
} from './styled';

const WaitingRoom = () => {

    const [pseudo, setPseudo] = useState('');
    const [players, setPlayers] = useState([]);
    const [selectTeam, setSelectTeam] = useState(true);
    // const [currentPlayer, setCurrentPlayer] = useState('');
    const [socket, setSocket] = useState({})
    const [board, setBoard] = useState({})

    const { id } = useParams();

    useEffect(() => {
        setSocket(io('http://localhost:3001', {query: 'room=' + id}));

        async function getGame() {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/games/${id}`);
            setBoard(res.data.board);
        }

        getGame()
    }, [id]);

    const handleChange = (e) => {
        setPseudo(e.target.value)
    };

    const handlePseudo =  async () => {
        setSelectTeam(false);

        const update = async (socket) => {
            await axios.post(`${process.env.REACT_APP_API_URL}/games/${id}`, {
                pseudo: pseudo,
                socketId: socket.id,
            })

            // setCurrentPlayer(socket.id)
        };

        await update(socket);

        socket.emit('New user connected');

        socket.on('user_leave', function (data) {
            console.log(data.user_name + 'left the game')
        })

        socket.on('UPDATE_CLIENT', async (data) => {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/games/${id}`)

            setPlayers(res.data.players)
        });
    };

    const handleChoiceTeam = (data) => {
        socket.emit('Choose team', data)

        socket.on('YO', function () {
            console.log('YO')
        })
    }


    return (
        <>
            <h1>Waiting Room - {id}</h1>
            {selectTeam ? (
                <section>
                    <label htmlFor='pseudo'>Your pseudo</label>
                    <input onChange={handleChange} value={pseudo} name="pseudo" type="text"/>
                    <button onClick={handlePseudo}>GO</button>
                </section>
            ) : (
              <WaitingRoomContainer>
                <BlueTeamContainer>
                    <h3>Blue</h3>
                    <div>
                        <h4>Blue spy</h4>
                        <button onClick={() => handleChoiceTeam({role: 'spy', team: 'blue'})}>Go spy</button>
                        {players.map( player => (
                          player.team === "blue" &&
                          player.role === "spy" && <p>{player.pseudo}</p>
                        ))}
                    </div>
                    <div>
                        <h4>Blue agents</h4>
                        <button onClick={() => handleChoiceTeam({role: 'agent', team: 'blue'})}>Go Agent</button>
                        {players.map( player => (
                          player.team === "blue" &&
                          player.role === "agent" && <p>{player.pseudo}</p>
                        ))}
                    </div>
                </BlueTeamContainer>
                <PseudoContainer>
                    <h3>Choose your team</h3>
                    {players.map( player => (
                      !player.role && <p>{player.pseudo}</p>
                    ))}
                </PseudoContainer>
                <RedTeamContainer>
                    <h3>Red</h3>
                    <div>
                        <h4>Red spy</h4>
                        <button onClick={() => handleChoiceTeam({role: 'spy', team: 'red'})}>Go spy</button>
                        {players.map( player => (
                          player.team === "red" &&
                          player.role === "spy" && <p>{player.pseudo}</p>
                        ))}
                    </div>
                    <div>
                        <h4>Red agents</h4>
                        <button onClick={() => handleChoiceTeam({role: 'agent', team: 'red'})}>Go Agent</button>
                        {players.map( player => (
                          player.team === "red" &&
                          player.role === "agent" && <p>{player.pseudo}</p>
                        ))}
                    </div>
                </RedTeamContainer>
                  <Link to={{
                      pathname: `/game/${id}`,
                      state: {
                          players: players,
                          socket: socket,
                          board: board
                      }
                  }}>Launch Game</Link>
              </WaitingRoomContainer>
            )}
        </>
    )
}

export default WaitingRoom;
