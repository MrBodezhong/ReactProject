import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Xiangqi from './xiangQi/index.js';
import Plant from './plant/index.js';
import Wuzi from './wuZi/index.js';
import Chisha from './chiSha/index.js';
class Games extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			gameList: ['象棋', '飞行棋', '五子棋', '中午吃啥'],
			nowGame: 0
		};
	}
	chooseGame(e) {
		this.setState({
			nowGame: e
		})
	}
	render() {
		let game;
		if(this.state.nowGame === 0) {
			game = <Xiangqi/>
		} else if(this.state.nowGame === 1) {
			game = <Plant/>
		} else if(this.state.nowGame === 2) {
			game = <Wuzi/>
		} else if(this.state.nowGame === 3) {
			game = <Chisha/>
		}
		const title = this.state.gameList.map((res, index) => {
			return(<div className={this.state.nowGame===index?'games-items red':'games-items'} key={index} onClick={()=>{this.chooseGame(index)}} >{res}</div>)
		})

		return <div>
		<div className="flex-x gamesList">{title}</div>
		
		<div>{game}</div>		
		</div>
	}
}

ReactDOM.render(<Games />, document.getElementById("root"));