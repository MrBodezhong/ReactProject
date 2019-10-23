import React from 'react';
import './index.css';

function PieceView(props) {
	return(
		//classNmae={this.state.check[0]==number&&this.state.check[1]==index?'className':''}
		<div className={props.data.conData?props.data.conData.type*1===0?props.choose?'piece black className':'piece black':props.data.conData.type*1===1?props.choose?'piece red className':'piece red':'piece':'piece'} style={{left:props.data.col*80+50,top:props.data.lin*80+50}} onClick={props.onClick}>
					{props.data.conData?props.data.conData.con:''}
					</div>
	)
}

class Xiangqi extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			player: true, //true 红色方 fasle 黑色方
			check: [], //当前选中的棋子
			gameOver: false
		};
	}
	componentDidMount() {
		this.setState({
			list: this.resetTable().arr_1,
		})
	}
	resetTable() {

		let arr_l = [
			[0, 3, 6, 9],
			[0, 2, 7, 9],
			[0, 3, 6, 9],
			[0, 9],
			[0, 3, 6, 9],
			[0, 9],
			[0, 3, 6, 9],
			[0, 2, 7, 9],
			[0, 3, 6, 9]
		];
		let obj_l = {
			0: {
				0: {
					type: 0,
					con: '车',
					id: 1
				},
				3: {
					type: 0,
					con: '兵',
					id: 2
				},
				6: {
					type: 1,
					con: '卒',
					id: 3
				},
				9: {
					type: 1,
					con: '车',
					id: 4
				},
			},
			1: {
				0: {
					type: 0,
					con: '马',
					id: 5
				},
				2: {
					type: 0,
					con: '炮',
					id: 6
				},
				7: {
					type: 1,
					con: '炮',
					id: 7
				},
				9: {
					type: 1,
					con: '马',
					id: 8
				},
			},
			2: {
				0: {
					type: 0,
					con: '象',
					id: 9
				},
				3: {
					type: 0,
					con: '兵',
					id: 10
				},
				6: {
					type: 1,
					con: '卒',
					id: 11
				},
				9: {
					type: 1,
					con: '相',
					id: 12
				},
			},
			3: {
				0: {
					type: 0,
					con: '士',
					id: 13
				},
				9: {
					type: 1,
					con: '仕',
					id: 14
				}
			},
			4: {
				0: {
					type: 0,
					con: '将',
					id: 15
				},
				3: {
					type: 0,
					con: '兵',
					id: 16
				},
				6: {
					type: 1,
					con: '卒',
					id: 17
				},
				9: {
					type: 1,
					con: '帅',
					id: 18
				},
			},
			5: {
				0: {
					type: 0,
					con: '士',
					id: 19
				},
				9: {
					type: 1,
					con: '仕',
					id: 20
				}
			},
			6: {
				0: {
					type: 0,
					con: '象',
					id: 21
				},
				3: {
					type: 0,
					con: '兵',
					id: 22
				},
				6: {
					type: 1,
					con: '卒',
					id: 23
				},
				9: {
					type: 1,
					con: '相',
					id: 24
				},
			},
			7: {
				0: {
					type: 0,
					con: '马',
					id: 25
				},
				2: {
					type: 0,
					con: '炮',
					id: 26
				},
				7: {
					type: 1,
					con: '炮',
					id: 27
				},
				9: {
					type: 1,
					con: '马',
					id: 28
				},
			},
			8: {
				0: {
					type: 0,
					con: '车',
					id: 29
				},
				3: {
					type: 0,
					con: '兵',
					id: 30
				},
				6: {
					type: 1,
					con: '卒',
					id: 31
				},
				9: {
					type: 1,
					con: '车',
					id: 32
				},
			}
		}
		let arr_1 = [
			[],
			[],
			[],
			[],
			[],
			[],
			[],
			[],
			[]
		]
		for(let i = 0; i < 9; i++) {
			for(let j = 0; j < 10; j++) {
				let obj = {
					lin: j, //横
					col: i //竖
				};
				let conData = obj_l[i][j]
				if(arr_l[i].indexOf(j) > -1) {
					obj = {
						conData,
						...obj
					}
				}
				arr_1[i].push(obj)
			}
		}
		return {
			arr_1: arr_1
		}
	}

	checkStep(now = {}, next = {}, success) {
		let list = [...this.state.list];
		let obj_ = { ...now
		};
		if(now.conData.con === '卒' || now.conData.con === '兵') {
			if((Math.abs(next.col - now.col) === 0 && now.conData.con === '卒' ? now.lin - next.lin === 1 : next.lin - now.lin === 1) || (Math.abs(next.col - now.col) === 1 && next.lin - now.lin === 0 && now.conData.con === '卒' ? now.lin < 5 : now.lin > 5)) {
				success();
				delete obj_.conData;
				list[next.col][next.lin]['conData'] = now.conData;
				list[now.col][now.lin] = obj_;
				this.setState({
					list,
					check: [],
					player: !this.state.player
				})
			}
		} else if(now.conData.con === '马') {
			if((Math.abs(next.col - now.col) === 2 && Math.abs(next.lin - now.lin) === 1) || (Math.abs(next.col - now.col) === 1 && Math.abs(next.lin - now.lin) === 2)) {
				if(next.col - now.col === 2) {
					if(list[now.col + 1][now.lin].conData) {
						return
					}

				} else if(next.col - now.col === -2) {
					if(list[now.col - 1][now.lin].conData) {
						return
					}
				} else if(next.lin - now.lin === -2) {
					if(list[now.col][now.lin - 1].conData) {
						return
					}
				} else if(next.lin - now.lin === 2) {
					if(list[now.col][now.lin + 1].conData) {
						return
					}
				}
				success();
				delete obj_.conData;
				list[next.col][next.lin]['conData'] = now.conData;
				list[now.col][now.lin] = obj_;
				this.setState({
					list,
					check: [],
					player: !this.state.player
				})
			}
		} else if(now.conData.con === '象' || now.conData.con === '相') {

			if((now.conData.con === '象' ? next.lin < 5 : next.lin > 4) && ((Math.abs(next.col - now.col) === 2 && Math.abs(next.lin - now.lin) === 2) || (Math.abs(next.col - now.col) === 2 && Math.abs(next.lin - now.lin) === 2))) {
				if(next.col > now.col && next.lin > now.lin) {
					//右下角
					if(list[now.col + 1][now.lin + 1].conData) {
						return
					}
				} else if(next.col > now.col && next.lin < now.lin) {
					//右上角
					if(list[now.col + 1][now.lin - 1].conData) {
						return
					}
				} else if(next.col < now.col && next.lin < now.lin) {
					//左上角
					if(list[now.col - 1][now.lin - 1].conData) {
						return
					}
				} else if(next.col < now.col && next.lin > now.lin) {
					//左下角
					if(list[now.col - 1][now.lin + 1].conData) {
						return
					}
				}
				success();
				delete obj_.conData;
				list[next.col][next.lin]['conData'] = now.conData;
				list[now.col][now.lin] = obj_;
				this.setState({
					list,
					check: [],
					player: !this.state.player
				})

			}

		} else if(now.conData.con === '士' || now.conData.con === '仕') {
			if((Math.abs(next.col - now.col) === 1 && Math.abs(next.lin - now.lin) === 1) && (next.col > 2 && next.col < 6) && (now.conData.con === '士' ? next.lin < 3 : next.lin > 6)) {
				success();
				delete obj_.conData;
				list[next.col][next.lin]['conData'] = now.conData;
				list[now.col][now.lin] = obj_;
				this.setState({
					list,
					check: [],
					player: !this.state.player
				})
			}
		} else if(now.conData.con === '将' || now.conData.con === '帅') {
			if(((Math.abs(next.col - now.col) === 0 && Math.abs(next.lin - now.lin) === 1) || (Math.abs(next.col - now.col) === 1 && next.lin - now.lin === 0)) && (next.col > 2 && next.col < 6 && (now.conData.con === '将' ? next.lin < 3 : next.lin > 6))) {
				success();
				delete obj_.conData;
				list[next.col][next.lin]['conData'] = now.conData;
				list[now.col][now.lin] = obj_;
				this.setState({
					list,
					check: [],
					player: !this.state.player
				})

			} else if(Math.abs(next.lin - now.lin) >= 4 && now.col === next.col) {
				//飞帅
				for(var i = 0; i < list[next.col].length; i++) {
					if(list[next.col][i].conData && (list[next.col][i].conData.con !== '将' && list[next.col][i].conData.con !== '帅')) {
						break
					}
				}
				if(i >= list[next.col].length) {
					success();
					delete obj_.conData;
					list[next.col][next.lin]['conData'] = now.conData;
					list[now.col][now.lin] = obj_;
					this.setState({
						list,
						check: [],
						player: !this.state.player
					})
				}
			}

		} else if(now.conData.con === '车') {
			let x_max = 8;
			let x_min = 0;
			let y_max = 9;
			let y_min = 0;

			if(next.col === now.col) {
				//纵向
				if(next.lin > now.lin) {
					//向下
					for(let i = now.lin + 1; i < next.lin; i++) {
						if(list[now.col][i].conData) {
							y_max = i;
							break
						}

					}
				} else if(next.lin < now.lin) {
					//向上
					for(let i = now.lin - 1; i > next.lin; i--) {
						if(list[now.col][i].conData) {
							y_min = i;
							break
						}
					}
				}
				if(next.lin >= y_min && next.lin <= y_max) {
					success();
					delete obj_.conData;
					list[next.col][next.lin]['conData'] = now.conData;
					list[now.col][now.lin] = obj_;
					this.setState({
						list,
						check: [],
						player: !this.state.player
					})
				}

			} else if(next.lin === now.lin) {
				//横向
				if(next.col > now.col) {
					//向右
					for(let i = now.col + 1; i < next.col; i++) {
						if(list[i][now.lin].conData) {
							x_max = i;
							break
						}

					}
				} else if(next.col < now.col) {
					//向左
					for(let i = now.col - 1; i > next.col; i--) {
						if(list[i][now.lin].conData) {
							x_min = i;
							break
						}
					}
				}
				if(next.col >= x_min && next.col <= x_max) {
					delete obj_.conData;
					success();
					list[next.col][next.lin]['conData'] = now.conData;
					list[now.col][now.lin] = obj_;
					this.setState({
						list,
						check: [],
						player: !this.state.player
					})
				}

			}
		} else if(now.conData.con === '炮') {
			if(next.col === now.col) {
				//纵向
				if(next.lin > now.lin) {
					//向下
					let p_ = 0;
					for(let i = now.lin + 1; i < next.lin; i++) {
						if(list[now.col][i].conData) {
							p_++;
						}
					}
					if(p_ > 1) {
						return
					} else if(next.conData && p_ === 0) {
						return
					}

				} else if(next.lin < now.lin) {
					//向上
					let p_ = 0;
					for(let i = now.lin - 1; i > next.lin; i--) {
						if(list[now.col][i].conData) {
							p_++;
						}
					}
					if(p_ > 1) {
						return
					} else if(next.conData && p_ === 0) {
						return
					}
				}
				delete obj_.conData;
				success();
				list[next.col][next.lin]['conData'] = now.conData;
				list[now.col][now.lin] = obj_;
				this.setState({
					list,
					check: [],
					player: !this.state.player
				})
			} else if(next.lin === now.lin) {
				//横向
				if(next.col > now.col) {
					//向右
					let p_ = 0;
					for(let i = now.col + 1; i < next.col - 1; i++) {
						if(list[i][now.lin].conData) {
							p_++
						}

					}
					if(p_ > 1) {
						return
					} else if(next.conData && p_ === 0) {
						return
					}
				} else if(next.col < now.col) {
					//向左
					let p_ = 0;
					for(let i = now.col - 1; i > next.col + 1; i--) {
						if(list[i][now.lin].conData) {

							p_++
						}

					}
					if(p_ > 1) {
						return
					} else if(next.conData && p_ === 0) {
						return
					}

				}
				delete obj_.conData;
				success();
				list[next.col][next.lin]['conData'] = now.conData;
				list[now.col][now.lin] = obj_;
				this.setState({
					list,
					check: [],
					player: !this.state.player
				})
			}

		}

	}

	changePiece(l, c) {
		if(this.state.gameOver) {
			return
		}
		//l  横  c 列
		let next = this.state.list[c][l]
		let now = {};
		if(this.state.check.length > 0) {
			now = this.state.list[this.state.check[1]][this.state.check[0]]
		}
		if(this.state.check.length === 0) {
			if(next.conData) {
				if((next.conData.type === 1 && this.state.player) || (next.conData.type === 0 && !this.state.player)) {
					this.setState({
						check: [l, c]
					})
				}
			} else {
				return
			}

		} else if(this.state.check.length > 0) {
			if(next.conData) {

				if((now.conData.type === 1 && this.state.player) || (now.conData.type === 0 && !this.state.player)) {

					if(next.conData.type === now.conData.type) {
						this.setState({
							check: [],
						})
					} else {
						this.checkStep(now, next, (res => {
							console.log(next.conData)
							if(next.conData.con === '将' || next.conData.con === '帅') {
								this.setState({
									player: next.conData.con === '将' ? 1 : 2,
									gameOver: true
								})
							}
						}))
					}
				}
			} else {
				this.checkStep(now, next, (res => {

				}))
			}

		}

	}
	resetGame() {
		this.setState({
			list: this.resetTable().arr_1,
			player: true, //true 红色方 fasle 黑色方
			check: [], //当前选中的棋子
			gameOver: false
		})
	}

	render() {
		let arr_1 = this.state.list;
		let arr = [];
		for(let i = 0; i < 110; i++) {
			arr.push(i)

		}
		const tables = arr.map((res, index) => {
			return(<p key={index} className={(index>=0&&index<=8)||(index>=100&&index<=108)||(index>=50&&index<=58)?(index%10===0&&index!==0)||((index-9)%10===0&&index!==9)?'tables no-top no-right ':'tables no-right':(index%10===0&&index!==0)||((index-9)%10===0&&index!==9)?'tables no-top':index===14||index===25||index===84||index===95?'f':index===15||index===24||index===85||index===94?'x':'tables'}></p>)
		})
		const piece = arr_1.map((item, index) => {
			return(
				<div key={index} >
                        {
                             item.map((item1,number)=>{
                                 return (
                                    <PieceView choose={this.state.check[0]===number&&this.state.check[1]===index?true:false}  key={number} data={item1} onClick={()=>{this.changePiece(number,index)}}/>
                                 );
                            })
                        }
                        </div>
			);
		})
		let player = this.state.gameOver ? 'GAME  OVER' : this.state.player ? '红方回合' : '黑方回合';
		let winner = this.state.gameOver ? this.state.player === 1 ? '红方胜利' : '黑方胜利' : '';
		let title = <div className="title">
		<div>{player}</div>
		<div>{winner}</div>
		{this.state.gameOver ?<div onClick={()=>{this.resetGame()}}>重新开始</div>:''}
		</div>
		return <div className="flex-x">
		<div className="table">
		{tables}
		{piece}
		</div>
<div>{title}</div>
		</div>
	}
}

export default Xiangqi