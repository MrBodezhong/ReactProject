import React, { Component } from "react";
import "./index.css";

function Tips(props) {
  return props.now_[0] > -1 ? (
    <div
      onClick={props.check}
      className="tips-pice"
      style={{
        left: props.now_[0] * 40 + 60,
        top: props.now_[1] * 40 + 130,
        background: props.user > 0 ? "#fff" : "#000",
      }}
    >
      {" "}
    </div>
  ) : (
    ""
  );
}
class Linpice extends Component {
  render(props) {
    const table = this.props.game_arr.map((item, index) => {
      return (
        <div
          key={index}
          className="tips-pice"
          style={{
            left: item.now_[0] * 40 + 60,
            top: item.now_[1] * 40 + 130,
            background: item.user > 0 ? "#fff" : "#000",
          }}
        >
          {" "}
        </div>
      );
    });
    return <div> {table} </div>;
  }
}
class Tables extends Component {
  render(props) {
    let arr_ = new Array(18).fill(1);

    const table = arr_.map((item, index) => {
      return (
        <div className="flex-x" key={index}>
          {" "}
          {arr_.map((item1, number) => {
            return (
              <div className="piece-wuzi" key={number}>
                {" "}
              </div>
            );
          })}{" "}
        </div>
      );
    });
    return <div className="tables-wuzi"> {table} </div>;
  }
}

class Wuzi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      now_: [-1, -1],
      user: false, //0 黑子 1白子,
      game: {},
      game_arr: [],
      game_over: false,
    };
  }
  componentDidMount() {
    this.resetGame();
  }

  render() {
    let game_title = (
      <div className="game_titile">
        <div className="game_titile_1">
          {this.state.user ? "白方回合" : "黑方回合"}
        </div>
      </div>
    );
    let game_end = (
      <div className="game_titile">
        <div className="game_titile_1">
          {this.state.user ? "白方获胜" : "黑方获胜"}
        </div>
        <div
          onClick={() => {
            this.resetGame();
          }}
        >
          重新开始
        </div>
      </div>
    );
    return (
      <div className="game-wuzi" onMouseMove={this.mouseMove_.bind(this)}>
        {" "}
        <Tables />
        <Tips
          check={this.check.bind(this)}
          user={this.state.user}
          now_={this.state.now_}
        />{" "}
        <Linpice game_arr={this.state.game_arr} />{" "}
        {this.state.game_over ? game_end : game_title}
      </div>
    );
  }
  mouseMove_(e) {
    if (this.state.game_over) {
      return;
    }
    //取消tatget事件为NULL
    e.persist();
    let events = e || window.e;
    let now_x = events.clientX;
    let now_y = events.clientY;
    let y_ = (now_y - 140) % 40;
    let x_ = (now_x - 70) % 40;

    if (
      now_x >= 60 &&
      now_y >= 130 &&
      now_x <= 80 + 18 * 40 &&
      now_y <= 140 + 18 * 40
    ) {
      if (
        ((x_ > 0 && x_ <= 10) || (x_ <= 40 && x_ >= 30)) &&
        ((y_ > 0 && y_ <= 10) || (y_ <= 40 && y_ >= 30))
      ) {
        let col = 0;
        let lin = 0;
        if (x_ > 0 && x_ <= 10) {
          col = Math.floor((now_x - 70) / 40);
        } else if (x_ <= 40 && x_ >= 30) {
          col = Math.ceil((now_x - 70) / 40);
        }
        if (y_ > 0 && y_ <= 10) {
          lin = Math.floor((now_y - 140) / 40);
        } else if (y_ <= 40 && y_ >= 30) {
          lin = Math.ceil((now_y - 140) / 40);
        }
        this.setState({
          now_: [col, lin],
        });
      }
    } else {
      this.setState({
        now_: [-1, -1],
      });
    }
  }
  check() {
    if (this.state.game_over) {
      return;
    }
    let state = { ...this.state };
    if (state.game[state.now_[0]][state.now_[1]] < 0) {
      state.game[state.now_[0]][state.now_[1]] = state.user;
      state.game_arr.push({
        now_: state.now_,
        user: state.game[state.now_[0]][state.now_[1]],
      });
      let res_ = this.winner(state.now_, state.game, state.user);
      if (res_ !== -1) {
        state.game_over = true;
      } else {
        state.now_ = [-1, -1];
        state.user = !state.user;
      }
      this.setState(state);
    } else {
      return;
    }
  }
  resetGame() {
    let obj = {};
    for (let i = 0; i < 19; i++) {
      for (let j = 0; j < 19; j++) {
        obj[i] = obj[i] ? obj[i] : {};
        obj[i][j] = -1;
      }
    }
    this.setState({
      now_: [-1, -1],
      user: false, //false 黑子 true白子,
      game: obj,
      game_arr: [],
      game_over: false,
    });
  }
  winner(arr = [], obj = {}, user = false) {
    // x轴相同 y 轴相同  左斜相同 右斜相同
    let obj_ = [1, 1, 1, 1];
    let x, y, xMax, yMax;
    if (arr[0] - 4 < 0) {
      x = 0;
      xMax = 5;
    } else {
      x = arr[0] - 4;
      xMax = 1;
    }
    if (arr[1] - 4 < 0) {
      y = 0;
      yMax = 5;
    } else {
      y = arr[1] - 4;
      yMax = 1;
    }
    xMax = xMax + arr[0] + 4 > 19 ? 19 : xMax + arr[0] + 4;
    yMax = yMax + arr[1] + 4 > 19 ? 19 : yMax + arr[1] + 4;

    for (let i = x; i < xMax; i++) {
      for (let j = y; j < yMax; j++) {
        if (obj[i][j] !== undefined && obj[i][j] === user) {
          if (i === arr[0] && j!==arr[1]) {
            obj_[1]++;
          } else if (j === arr[1] && arr[0] !== i) {
            obj_[0]++;
          } else if (arr[0] - i > 0) {
            if (arr[1] - j > 0) {
              if (Math.abs(arr[0] - i) === Math.abs(arr[1] - j)) {
                obj_[3]++;
              }
            } else {
              if (Math.abs(arr[0] - i) === Math.abs(arr[1] - j)) {
                obj_[2]++;
              }
            }
          } else if (arr[0] - i < 0) {
            if (arr[1] - j > 0) {
              if (Math.abs(arr[0] - i) === Math.abs(arr[1] - j)) {
                obj_[2]++;
              }
            } else {
              if (Math.abs(arr[0] - i) === Math.abs(arr[1] - j)) {
                obj_[3]++;
              }
            }
          }
        }
      }
    }
    if (obj_.indexOf(5) > -1) {
      return user;
    } else {
      return -1;
    }
  }
}
export default Wuzi;
