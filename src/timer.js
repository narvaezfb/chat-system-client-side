import React, { useEffect, useState } from "react";
const Timer = () => {
	const [seconds, setSeconds] = useState(0);
	const [minutes, setMinutes] = useState(0);

	const secondsIncrementer = () => {
		setSeconds((prev) => prev + 1);
	};

	const minutesIncrementer = () => {
		setMinutes((prev) => prev + 1);
	};

	useEffect(() => {
		let firstInterval = setInterval(secondsIncrementer, 1000);
		let secondInterval = setInterval(minutesIncrementer, 60000);

		return () => {
			clearInterval(firstInterval);
			clearInterval(secondInterval);
		};
	}, []);
	return (
		<div>
			{minutes}
			{seconds < 60 ? <h1>{seconds}</h1> : setSeconds(0)}
		</div>
	);
};

export default Timer;
