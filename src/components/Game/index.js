import React, { useEffect, useState } from 'react';
import Board from "../Board";
import axios from 'axios';
import { useParams } from "react-router-dom";

const Game = () => {
    const [board, setBoard] = useState([]);

    const { id } = useParams();

    useEffect((id) => {
        const getBoard = async () => {
            const res = await axios.get(`http://localhost:3001/api/games/${id}`);

            setBoard(res.data.board);
        };

        getBoard();

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
