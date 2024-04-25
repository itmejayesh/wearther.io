"use client";
import React, {useEffect} from "react";
import {getWeatherDataByCurrentLocation} from "@/clientApi";
import {FaRegFaceSadTear} from "react-icons/fa6";
import {useAppContext} from "@/context/AppContext";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import Image from "next/image";
import {FaRegSadTear} from "react-icons/fa";

//icon base url
const iconUrl = "https://openweathermap.org/img/wn/";

const CurrentWeather = () => {
	const {weather, setWeather, loading, setLoading, searchCity} = useAppContext();
	const formateTime = (timesStamp: number) => {
		const timeStampInMilliseconds = timesStamp * 1000;
		const date = new Date(timeStampInMilliseconds);

		const hours = date.getHours();
		const minutes = date.getMinutes();

		const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
		const period = hours >= 12 ? "PM" : "AM";

		const formattedHours = hours % 12 || 12;

		const formattedTime = `${formattedHours}:${formattedMinutes}${period}`;

		return formattedTime;
	};

	//exract icon code from data url
	const iconChangerCode = weather?.weather[0]?.icon;

	useEffect(() => {
		const fetchWeatherByCurrentLocation = async () => {
			try {
				setLoading(true);
				navigator.geolocation.getCurrentPosition(
					async (position) => {
						const {latitude, longitude} = position.coords;
						console.log(latitude, longitude);
						const weatherData = await getWeatherDataByCurrentLocation(
							latitude,
							longitude
						);
						console.log(weatherData);
						setWeather(weatherData);
						setLoading(false);
					},
					(error) => {
						console.error("Error fetching current location:", error);
					}
				);
			} catch (error) {
				console.error("Error fetching weather data:", error);
			}
		};
		fetchWeatherByCurrentLocation();
	}, [setWeather, setLoading]);

	return (
		<div className="flex flex-col md:flex-row justify-centers items-center gap-x-8 p-5">
			{searchCity && loading && !weather ? (
				<AiOutlineLoading3Quarters className="text-3xl text-gray-600 animate-spin" />
			) : (
				<>
					{/* check if user typ correct name */}
					{weather ? (
						<>
							{/* check if icon is not null */}
							{iconChangerCode ? (
								<Image
									width={100}
									height={100}
									alt=""
									src={`${iconUrl}${iconChangerCode}.png`}
								/>
							) : (
								<FaRegSadTear className="text-4xl text-gray-500" />
							)}
							<div className="text-center pb-2 space-y-2">
								<h2 className="text-4xl md:text-6xl font-semibold text-gray-500">
									{`${Math.floor(weather?.main?.temp || 0)}°C`}
								</h2>
								<p className="text-gray-400 font-medium text-sm">
									{weather?.weather[0]?.description || "Unknown"}
								</p>
							</div>
							<div className="border hidden md:block h-[15vh]" />
							<div className="border md:hidden sm:block w-[30vh]" />
							{/* current weather details like wind speed, rain, sunrise, sunset etc */}
							<div className="grid grid-cols-3 gap-x-8 gap-y-4 pt-2">
								<p className="text-xl text-gray-600 text-center">
									{`${Math.floor(weather?.main?.temp_max || 0)}°`} <br />
									<span className="text-sm text-gray-500 -mt-0.5 block">High</span>
								</p>
								<p className="text-xl text-gray-600 text-center">
									{`${Math.round((weather?.wind?.speed || 0) * 1.609344)}km/h`} <br />
									<span className="text-sm text-gray-500 -mt-0.5 block">Wind</span>
								</p>
								<p className="text-xl text-gray-600 text-center">
									{formateTime(weather?.sys?.sunrise || 0)} <br />
									<span className="text-sm text-gray-500 -mt-0.5 block">Sunrise</span>
								</p>
								<p className="text-xl text-gray-600 text-center">
									{`${Math.floor(weather?.main?.temp_min || 0)}°`} <br />
									<span className="text-sm text-gray-500 -mt-0.5 block">Low</span>
								</p>
								<p className="text-xl text-gray-600 text-center">
									{weather?.main?.humidity}% <br />
									<span className="text-sm text-gray-500 -mt-0.5 block">Humidity</span>
								</p>
								<p className="text-xl text-gray-600 text-center">
									{formateTime(weather?.sys?.sunset || 0)} <br />
									<span className="text-sm text-gray-500 -mt-0.5 block">Sunset</span>
								</p>
							</div>
						</>
					) : (
						<div className="text-red-500">City not found, please try again.</div>
					)}
				</>
			)}
		</div>
	);
};

export default CurrentWeather;
