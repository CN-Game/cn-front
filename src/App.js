import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const App = () => {

  const [idGame, setIdGame] = useState('')
  const history = useHistory()

  const handleChangeId = async (e) => {
    setIdGame(e.target.value)
  }

  const createGame = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/games`)

    history.push(`/waiting-room/${res.data.gameId}`)
  }

    return (
      <div>
        <div className="hero">
          <h1 className="title">Code Names</h1>
          <p className="description">
            New way to play <code>CODE NAMES</code> with your friends.
          </p>

          <div className="row">
            <button onClick={createGame}>Create Game</button>
          </div>
          <div className="row">
            <label htmlFor='id'>ID Game</label>
            <input onChange={handleChangeId} value={idGame} name="id" type="text"/>
            <Link to={`/waiting-room/${idGame}`}>Join game</Link>
          </div>
        </div>

        <style jsx>{`
                  .hero {
                    width: 100%;
                    color: #333;
                  }
                  .title {
                    margin: 0;
                    width: 100%;
                    padding-top: 80px;
                    line-height: 1.15;
                    font-size: 48px;
                  }
                  .title,
                  .description {
                    text-align: center;
                  }
                  .row {
                    max-width: 880px;
                    margin: 80px auto 40px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                  }
                  .card {
                    padding: 18px 18px 24px;
                    width: 220px;
                    text-align: left;
                    text-decoration: none;
                    color: #434343;
                    border: 1px solid #9b9b9b;
                  }
                  .card:hover {
                    border-color: #067df7;
                  }
                  .card h3 {
                    margin: 0;
                    color: #067df7;
                    font-size: 18px;
                  }
                  .card p {
                    margin: 0;
                    padding: 12px 0 0;
                    font-size: 13px;
                    color: #333;
                  }
                `}</style>
      </div>
    )
}

export default App;
