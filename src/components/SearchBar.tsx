"use client";
import {getWeatherDataByCity} from "@/clientApi";
import {useAppContext} from "@/context/AppContext";
import {useDebounce} from "@/hook/useDebounce";
import React, {useEffect} from "react";
import {FiLoader} from "react-icons/fi";
import {MdMyLocation} from "react-icons/md";

const SearchBar = () => {
	const {searchCity, setSearchCity, loading, setWeather, setLoading} =
		useAppContext();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoading(true);
		const inputValue = e.target.value;
		console.log(inputValue);
		setSearchCity(inputValue);
	};

	const handleSearchCity = useDebounce(async () => {
		if (!searchCity) return;
		try {
			setLoading(true);
			const city = await getWeatherDataByCity(searchCity);
			setWeather(city);
			setSearchCity("");
			setLoading(false);
		} catch (error) {
			console.error("Error while searching city", error);
		}
	}, 1000);

	useEffect(() => {
		handleSearchCity();
	}, [handleSearchCity]);

	return (
		<div className="relative">
			<label htmlFor="searchbar">
				<input
					value={searchCity}
					type="text"
					id="searchbar"
					placeholder="Enter your city"
					className="border rounded-full p-2 pl-5 placeholder:pl-2 pr-10
                 placeholder:text-gray-400/50 outline-none focus-visible:ring-blue-600
                  focus:ring-2"
					onChange={handleChange}
				/>{" "}
				{loading ? (
					<FiLoader className="absolute top-0 animate-spin right-4 mt-3 text-gray-700 text-xl" />
				) : (
					<MdMyLocation className="absolute top-0 right-4 mt-3 text-gray-700 text-xl" />
				)}
			</label>
		</div>
	);
};

export default SearchBar;
