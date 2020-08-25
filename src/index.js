import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap';

class HeaderArea extends React.Component {
  render() {
    const headerTitle = getTitleName();
    return (
      <div>
        {headerTitle}
        <button class="CommonButton">追加</button>
        <button class="CommonButton">Cond値</button>
        <button class="CommonButton">パラメータ保存</button>
      </div>
    );
  }
}

function getTitleName() {
  const title = '艦これ資材管理';
  // const jsonData = jsonfIle.readFileSync(jsonPath, null);
  // if(jsonData != null) {
  //   title = jsonData.title
  // }
  return title;
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div>
        <header class="HeaderArea"><HeaderArea /></header>
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
        </div>
        <div><StatusList /></div>
        <footer class="FooterArea"><FooterArea /></footer>
      </div>
    );
  }
}

class StatusList extends React.Component {

  showDetail(i) {
    console.log(i);
  }

  render() {
    return (
      <div class="listArea">
        <div class="table-row">
          <div class="table-cell"></div>
          <div class="table-cell">item1</div>
          <div class="table-cell">item2</div>
          <div class="table-cell">item3</div>
          <div class="table-cell">詳細</div>
        </div>
        <div class="table-row">
          <div class="table-cell">1</div>
          <div class="table-cell">data1-1</div>
          <div class="table-cell">data1-2</div>
          <div class="table-cell">data1-3</div>
          <div class="table-cell"><button onClick={() => this.showDetail(1)}>詳細</button></div>
        </div>
        <div class="table-row">
          <div class="table-cell">2</div>
          <div class="table-cell">data2-1</div>
          <div class="table-cell">data2-2</div>
          <div class="table-cell">data2-3</div>
          <div class="table-cell"><button onClick={() => this.showDetail(2)}>詳細</button></div>
        </div>
      </div>
    )
  }
}

class FooterArea extends React.Component {
  // 何もしない
  render() {return (<div>フッター部</div>);}
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
