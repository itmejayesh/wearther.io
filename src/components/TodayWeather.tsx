import React from "react";
import {MdSunny} from "react-icons/md";

const TodayWeather = () => {
	return (
		<div className="p-5 w-fit">
			<h2 className="text-lg font-medium text-gray-400">Todays weather</h2>
			<div className=" flex gap-4 mt-2">
				<div className="border p-5 rounded-xl text-lg font-medium text-gray-500 flex flex-col justify-center items-center gap-4">
					<h1>3am</h1>
					<MdSunny size={50} />
					<p>14</p>
				</div>
			</div>
		</div>
	);
};

export default TodayWeather;
