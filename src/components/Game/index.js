import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Board from "./Board";
import Input from '../Input';
import Button from '../Button';
import { StyledSpyTurn, StyledButtonWrapper } from './styled';

const Game = function (props) {

    const [board, setBoard] = useState([]);
    const [socket, setSocket] = useState(props.location.state.socket || {});
    const [currentPlayer, setCurrentPlayer] = useState({});
    const [turn, setTurn] = useState('');
    const [wordUsed, setWordUsed] = useState();
    const [numberWord, setNumberWord] = useState('');
    const [cardsSelected, setCardsSelected] = useState([]);
    const [toNextTurn, setToNextTurn] = useState('');
    const [blueScore, setBlueScore] = useState(0);
    const [redScore, setRedScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [winner, setWinner] = useState('');

    const { id } = useParams();

    let cardRemain = 7; // TODO: get data from server

    const nextTurn = (number = 0) => {
        switch (currentPlayer.role) {
            case 'BS':
            case 'RS':
                socket.emit('NEXT_TURN', {wordUsed, number, toNextTurn});
                break;
            case 'BA':
            case 'RA':
                socket.emit('NEXT_TURN', {toNextTurn});
                break;
        }
    };

    const nrbButton = [];

    for (let i = 1; i <= cardRemain; i++) {
        nrbButton.push(<Button key={i} text={i} onClick={() => nextTurn(i)} />);
    }

    useEffect( () => {
        async function getGame() {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/games/${id}`);
            res.data.players.forEach(player => {
                if(player.socketId === socket.id) {
                    setCurrentPlayer(player)
                    switch (player.role) {
                        case 'BS':
                            setToNextTurn('BA');
                            break;
                        case 'RS':
                            setToNextTurn('RA');
                            break;
                        case 'BA':
                            setToNextTurn('RS');
                            break;
                        case 'RA':
                            setToNextTurn('BS');
                            break;
                    }
                }
            });
            setFinished(res.data.finished);
            setWinner(res.data.winner);
            setBlueScore(res.data.blueScore);
            setRedScore(res.data.redScore);
            setTurn(res.data.turn);
            setBoard(res.data.board);
        }

        getGame();

        socket.on('NEXT_TURN', (data) => {
            setTurn(data.toNextTurn);
            setWordUsed(data.wordUsed);
            setNumberWord(data.number);
        });

    }, [turn]);

    const handleChange = (e) => {
        setWordUsed(e.target.value);
    };

    return (
        <>
            <h1>Game {id}</h1>
            <ul>
                <li>Blue points: {blueScore}</li>
                <li>Red points: {redScore}</li>
            </ul>
            { finished && <div>Winner : {winner} Team</div>}

            {((currentPlayer.role === 'BS' && turn === 'BS') || (currentPlayer.role === 'RS' && turn === 'RS')) && (
                <StyledSpyTurn>
                <Input onChange={handleChange}>{wordUsed}</Input>
                <StyledButtonWrapper>
                {nrbButton}
                </StyledButtonWrapper>
                </StyledSpyTurn>
                )}

            {/* Agent turn */}
            {((turn === 'BA' && currentPlayer.role === 'BA') || (turn === 'RA' && currentPlayer.role === 'RA')) &&(
                <div>
                <p>{wordUsed}</p>
                <p>{numberWord}</p>

                {cardsSelected.map((card) => (
                    <p>{card.word}</p>
                ))}

                <Button onClick={nextTurn} text='Valider' />
                </div>
                )}

            {/* Next team */}

                <Board data={board} player={currentPlayer} socket={socket} turn={turn}/>
        </>
    )

};

export default Game
