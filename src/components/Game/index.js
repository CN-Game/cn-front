import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Board from "../Board";

const Game = function (props) {

    const [board, setBoard] = useState(props.location.state.board);
    const [socket, setSocket] = useState(props.location.state.socket);

    const { id } = useParams();

    useEffect( () => {
        socket.emit('GAME_BEGIN');
    }, []);

    console.log(board);

    return (
        <>
            <h1>Game {id}</h1>
            <Board data={board}/>
        </>
    )

};

export default Game
