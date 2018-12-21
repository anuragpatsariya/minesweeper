import React from 'react';

const BoardHead = props =>{
	let minutes = Math.floor(props.time/60);
	let seconds = props.time - minutes*60 || 0; 

	let formattedSeconds = seconds<10?`0${seconds}`:seconds;
	let formattedMinutes = minutes<10?`0${seconds}`:minutes;

	let time = `${formattedMinutes}:${formattedSeconds}`;
	return (
		<div className =  "boardhead">
			<div className = "flag-count">{props.flagCounts}</div>
			<button className = "reset">Reset the Game</button>
			<div className="timer">{time}</div>
		</div>
	);
};

export default BoardHead;