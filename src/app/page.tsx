"use client";
import SearchBar from "@/components/SearchBar";
import React from "react";
import CurrentWeather from "@/components/CurrentWeather";
import TodayWeather from "@/components/TodayWeather";
import {useAppContext} from "@/context/AppContext";

const HomePage = () => {
	const {weather} = useAppContext();

	const currentFullDay = () => {
		const currentDate = new Date();
		const daysOfWeek = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		];
		const currentDay = daysOfWeek[currentDate.getDay()];
		const monthsOfYear = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		const currentMonth = monthsOfYear[currentDate.getMonth()];
		const currentYear = currentDate.getFullYear();

		const TodayDate = currentDate.getDate();

		const currentDayAndDate = `${currentDay}, ${TodayDate} ${currentMonth} ${currentYear}`;

		return currentDayAndDate;
	};

	return (
		<main className="container mx-auto m-24 border min-w-sm">
			{/* Top section logo and search bar */}
			<section className="p-5">
				<div className="flex justify-around items-center flex-wrap gap-2">
					<h1 className="text-lg font-semibold">Weather.Io</h1>
					<SearchBar />
				</div>
				{/*Mid section with current weather update and today weather details */}
				<div className="p-5">
					<h2 className="text-xl font-bold text-gray-400">
						{weather?.name ? (
							<>
								{weather.name},{weather.sys.country}
							</>
						) : (
							<>
								<p>Delhi,India</p>
							</>
						)}
					</h2>
					<p className="text-sm text-gray-400">{currentFullDay()}</p>
					<div className="flex justify-center">
						<CurrentWeather />
					</div>
				</div>
				{/* <TodayWeather /> */}
			</section>
		</main>
	);
};

export default HomePage;
