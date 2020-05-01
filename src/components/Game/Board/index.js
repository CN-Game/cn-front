import React from 'react';
import { StyledBoard } from './styled'
import Card from '../../Card'

class Board extends React.Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.reveal = this.props.player.role === 'BS' || this.props.player.role === 'RS';
        this.clickable = this.props.player.role === 'BA' || this.props.player.role === 'RA';
    }

    render() {
        return (
            <StyledBoard>
                {this.props.data.map( item => (
                    <Card
                        key={item['_id']}
                        item={item}
                        reveal={this.reveal}
                        realColor={item.color}
                        discovered={item.discovered}
                        word={item.word}
                        clickable={this.clickable}
                        socket={this.props.socket}
                        turn={this.props.turn}
                        player={this.props.player}
                    />
                ))}
            </StyledBoard>
        )
    }
}

export default Board
