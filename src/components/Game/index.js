import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Board from "./Board";
import Input from '../Input';
import {
    StyledContainer,
    StyledSpyTurn,
    StyledButtonWrapper,
    StyledNumberButton,
    StyledId,
    StyledBlueScoreWrapper,
    StyledRedScoreWrapper,
    StyledBlueScore,
    StyledBlueTotalScore,
    StyledRedScore,
    StyledRedTotalScore,
    StyledLabel,
    StyledTip,
    StyledTextTip,
    StyledValidationButton,
    StyledTurnTitle,
} from './styled';

const Game = function (props) {

    const [board, setBoard] = useState([]);
    const [socket, setSocket] = useState(props.location.state.socket || {});
    const [currentPlayer, setCurrentPlayer] = useState({});
    const [turn, setTurn] = useState('');
    const [wordUsed, setWordUsed] = useState();
    const [numberWord, setNumberWord] = useState('');
    const [toNextTurn, setToNextTurn] = useState('');
    const [blueScore, setBlueScore] = useState(0);
    const [redScore, setRedScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [winner, setWinner] = useState('');
    const [roundTitle, setRoundTitle] = useState(false);

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

    const _title = (turn, role, isFinished) => {
        if (turn !== role && !isFinished) {
            switch (turn) {
                case 'BS':
                    setRoundTitle("L'espion bleu réfléchit");
                    break;
                case 'RS':
                    setRoundTitle("L'espion rouge réfléchit");
                    break;
                case 'BA':
                    setRoundTitle("L'agent bleu réfléchit");
                    break;
                case 'RA':
                    setRoundTitle("L'agent rouge réfléchit");
                    break;
            }
        } else {
            setRoundTitle(false);
        }
    };

    const nrbButton = [];
    for (let i = 1; i <= cardRemain; i++) {
        nrbButton.push(<StyledNumberButton key={i} text={i} onClick={() => nextTurn(i)} />);
    }

    useEffect( () => {
        async function getGame() {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/games/${id}`);
            res.data.players.forEach(player => {
                if(player.socketId === socket.id) {
                    setCurrentPlayer(player);
                    _title(res.data.turn, player.role, res.data.finished);
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

    const handleChangeTipWord = (e) => {
        if (e.target.value.length <= 25) {
            console.log(e.target.value.length <= 25)
        }
    };

    return (
        <>
            <StyledBlueScoreWrapper>
                <StyledBlueScore>{blueScore}</StyledBlueScore>
                <StyledBlueTotalScore>7</StyledBlueTotalScore>
            </StyledBlueScoreWrapper>
            <StyledId>
                <p>{id}</p>
            </StyledId>
            <StyledRedScoreWrapper>
                <StyledRedScore>{redScore}</StyledRedScore>
                <StyledRedTotalScore>7</StyledRedTotalScore>
            </StyledRedScoreWrapper>

            <StyledContainer>
                { finished && <StyledTurnTitle>Winner : {winner} Team</StyledTurnTitle>}
                { roundTitle && <StyledTurnTitle>{roundTitle}</StyledTurnTitle> }
                {((currentPlayer.role === 'BS' && turn === 'BS') || (currentPlayer.role === 'RS' && turn === 'RS')) && (
                    <StyledSpyTurn>
                        <StyledLabel htmlFor="">Tips word :</StyledLabel>
                        <Input >{wordUsed}</Input>
                        <StyledButtonWrapper>
                        {nrbButton}
                        </StyledButtonWrapper>
                    </StyledSpyTurn>
                )}

                {/* Agent turn */}
                {((turn === 'BA' && currentPlayer.role === 'BA') || (turn === 'RA' && currentPlayer.role === 'RA')) &&(
                    <StyledTip>
                        <div>
                            <StyledValidationButton onClick={nextTurn} text='Valider' />
                            <StyledTextTip>"{wordUsed}"</StyledTextTip>
                            <StyledTextTip>{numberWord} cartes</StyledTextTip>
                        </div>
                    </StyledTip>
                )}
            </StyledContainer>
            {/* Next team */}

                <Board data={board} player={currentPlayer} socket={socket} turn={turn}/>
        </>
    )

};

export default Game
