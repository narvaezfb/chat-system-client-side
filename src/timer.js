import React, { useEffect, useState } from "react";
const Timer = () => {
	const [seconds, setSeconds] = useState(0);
	const [minutes, setMinutes] = useState(0);

	const incrementer = () => {
		setInterval(() => {
			setSeconds((previousSecond) => previousSecond + 1);
		}, 1000);
		setInterval(() => {
			setMinutes((previousMinute) => previousMinute + 1);
		}, 60000);
	};

	useEffect(() => {
		incrementer();
	}, []);
	return (
		<div>
			{minutes}:{seconds}
		</div>
	);
};

export default Timer;
