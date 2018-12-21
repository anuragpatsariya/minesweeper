import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';
import Board from "./components/Board";
import BoardHead from "./components/BoardHead";

class App extends Component {

  constructor() {
    super();
    this.intervals = []; 
  }

  state = {
    status: "waiting", //waiting, running, ended
    rows: 10,
    columns: 10,
    flags:10,
    mines:10,
    time: 0,
    numOfOpenCells:0
  };

  tick = () => {
    if(this.state.numOfOpenCells>0 && this.state.status==="running"){
      let time = this.state.time+1;
      this.setState({time})
    }
  }

  setInterval = (fn, t) => {
    this.intervals.push(setInterval(fn,t));
  }

  handleCellClick = () => {
    if(this.state.numOfOpenCells === 0 && this.state.status!=="running") {
      this.setState({
        status:"running"
      }, ()=>{
        this.setInterval(this.tick, 1000);
      })
    }
    this.setState(prevState => {
      return {openCells: prevState.openCells+1};
    })
  }

  render() {
    return (
      <div className="minesweeper">
      <div className= "gamename"><h2>Minesweeper</h2></div>
        <BoardHead time={this.state.time} flagCounts={this.state.flags}/>
        <Board 
        rows={this.state.rows} 
        columns={this.state.columns} 
        mines={this.state.mines} 
        openCells={this.state.numOfOpenCells}
        openCellClick={this.handleCellClick}
      />
      </div>
    );
  }
}

export default App;
