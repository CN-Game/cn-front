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
    const [turn, setTurn] = useState('BS');
    const [wordUsed, setWordUsed] = useState();
    const [numberWord, setNumberWord] = useState('');
    const [cardsSelected, setCardsSelected] = useState([]);

    const { id } = useParams();

    let cardRemain = 7; // TODO: get data from server

    const nextTurn = (number, turn) => {
        switch (currentPlayer.role) {
            case 'BS':
            case 'RS':
                socket.emit('NEXT_TURN', {wordUsed, number, turn});
                break;
        }
    };

    const nrbButton = [];
    // const optionsRender = [];
    // // let nbrSelect = [];

    for (let i = 1; i <= cardRemain; i++) {
        nrbButton.push(<Button key={i} text={i} onClick={() => nextTurn(i, 'BA')} />);
    }

    useEffect( () => {
        async function getGame() {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/games/${id}`);
            setBoard(res.data.board);

            res.data.players.forEach(player => {
                if(player.socketId === socket.id) {
                    setCurrentPlayer(player)
                }
            })
        }

        getGame();
    }, []);

    const handleChange = (e) => {
        setWordUsed(e.target.value);
    };

    socket.on('NEXT_TURN', (data) => {
        setTurn(data.turn);
        setWordUsed(data.wordUsed);
        setNumberWord(data.number);

        if (data.turn === 'BA' || data.turn === 'RA') {
            setCardsSelected([]);
        }
    });

    const selectCards = (card) => {
        console.log(cardsSelected);
        if ((turn === 'BA' && currentPlayer.role === 'BA') || (turn === 'BA' && currentPlayer.role === 'BA')) {
            if (cardsSelected.some(item => item._id === card._id)) {
                setCardsSelected(cardsSelected.filter(item => item._id !== card._id))
            } else {
                setCardsSelected([...cardsSelected, card]);
            }
        }
    };


    return (
        <>
            <h1>Game {id}</h1>

             {/*Spy turn*/}
            {currentPlayer.role === 'BS' && turn === 'BS' && (
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

                  {cardsSelected.map( (card) => (
                      <p>{card.word}</p>
                  ))}

                  <Button onClick={nextTurn} text='Valider' />
              </div>
            )}

            {/* Next team */}

            <Board data={board} player={currentPlayer} selectCards={selectCards}/>
        </>
    )

};

export default Game
