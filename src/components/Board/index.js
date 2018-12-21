import React, { Component } from 'react';
import Row from "../Row";
//import logo from './logo.svg';
//import './App.css';

class Board extends Component {
	constructor(props){
		super(props);
		this.state = {
			rows: this.createBoard(props)
		}
	}
	createBoard = props => {
		let board = [];
		for(let i=0;i<props.rows;i++){
			board.push([]);
			for(let j=0;j<props.columns;j++){
				board[i].push({
					x: j,
					y: i,
					count: 0,
					isOpen: false,
					hasAMine: false,
					hasAFlag: false
				});
			}
			//adding mines

		}
		for(let i=0;i<props.mines;i++){
				let randomRow = Math.floor(Math.random()*props.rows);
				let randomColumn = Math.floor(Math.random()*props.columns);

				let cell = board[randomRow][randomColumn];
				if(cell.hasAMine){
					i--;
				}else {
					cell.hasAMine = true;
				}
				console.log(cell);
			}

			console.table(board);
			return board;
	};

	open = cell => {

		let asyncCountMines = new Promise(resolve =>{
			let mines = this.findMines(cell);
			resolve(mines);
		})

		asyncCountMines.then(numberOfMines => {
			console.log(numberOfMines);
			let rows = this.state.rows;
			let current = rows[cell.x][cell.y];
			if(current.hasAMine && this.props.openCells === 0) {
			console.log("Cell already has a mine. Restarting the game");
			let newRows = this.createBoard(this.props);
			this.setState({
				rows: newRows
			}, () => {
				this.open(cell)
			})
		}else{
			if(!cell.hasAFlag && !cell.isOpen){
				this.props.openCellClick();
				current.isOpen = true;
				current.count = numberOfMines;	
				this.setState({rows});

				if(!current.hasAMine && numberOfMines===0){
					this.findAroundCells(cell);
				}

				
				console.log(this.state.rows);
			}
		}

		})

	};

	findMines = cell => {
		let minesInProximity = 0;
		for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        if (cell.y + row >= 0 && cell.x + col >= 0) {
          if (
            cell.y + row < this.state.rows.length &&
            cell.x + col < this.state.rows[0].length
          ) {
            if (
              this.state.rows[cell.y + row][cell.x + col].hasMine &&
              !(row === 0 && col === 0)
            ) {
              minesInProximity++;
            }
          }
        }
      }
    }
		return minesInProximity;
	}

	findAroundCells = cell => {
		let rows = this.state.rows;
		for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        if (cell.y + row >= 0 && cell.x + col >= 0) {
          if (
            cell.y + row < this.state.rows.length &&
            cell.x + col < this.state.rows[0].length
          ) {
            if (
              !this.state.rows[cell.y + row][cell.x + col].hasMine &&
              !rows[cell.y + row][cell.x + col].isOpen
            ) {
              this.open(rows[cell.y + row][cell.x + col]);
            }
          }
        }
      }}
	}

  render() {
      let rows = this.state.rows.map((row, index) => {
      	return  (
			<Row
				cells = {row}
				key={index}
				open={this.open}
			/>
      		)
      })
      return <div className="board">{rows}</div>
  }
}

export default Board;
