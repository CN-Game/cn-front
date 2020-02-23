import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import io from "socket.io-client"

const WaitingRoom = () => {

    const [pseudo, setPseudo] = useState('')
    const [selectTeam, setSelectTeam] = useState(true)

    const { id } = useParams();

    useEffect( () => {

    })

    const handleChange = (e) => {
        setPseudo(e.target.value)
    }

    const handlePseudo = () => {
        setSelectTeam(false)

        const socket = io(`http://localhost:3001`, {query: 'room=' + id});

        socket.emit('welcome', `Hi my name is ${pseudo}`);
        socket.on('chat message', function (data) {
            console.log(data)
        });
    }


    return (
        <>
            <h1>Waiting Room</h1>
            {selectTeam ? (
                <section>
                    <label htmlFor='pseudo'>Your pseudo</label>
                    <input onChange={handleChange} value={pseudo} name="pseudo" type="text"/>
                    <button onClick={handlePseudo}>GO</button>
                </section>
            ) : (
              <>
                <section>Left</section>
                <section>{pseudo}</section>
                <section>Right</section>
              </>
            )}
        </>
    )
}

export default WaitingRoom;
