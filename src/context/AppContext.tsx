"use client";
import {getWeatherDataByCity} from "@/clientApi";
import {AxiosResponse} from "axios";
import React, {ReactNode, useContext, useState} from "react";

interface WeatherData {
	name: string;

	main: {
		temp: number;
		temp_max: number;
		temp_min: number;
		pressure: number;
		humidity: number;
	};

	sys: {
		country: string;
		sunrise: number;
		sunset: number;
	};

	wind: {
		speed: number;
	};

	weather: {
		description: string;
		icon: string;
		id: number;
		main: string;
	}[];
}

interface AppContextType {
	weather: WeatherData;
	setWeather: React.Dispatch<React.SetStateAction<WeatherData>>;
	searchCity: string;
	setSearchCity: React.Dispatch<React.SetStateAction<string>>;
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultWeatherData: WeatherData = {
	name: "",
	main: {
		temp: 0,
		temp_max: 0,
		temp_min: 0,
		pressure: 0,
		humidity: 0,
	},
	sys: {
		country: "",
		sunrise: 0,
		sunset: 0,
	},
	wind: {
		speed: 0,
	},
	weather: [{description: "", icon: "", id: 0, main: ""}],
};

const AppContext = React.createContext<AppContextType | null>(null);

export const AppContextProvider = ({children}: {children: ReactNode}) => {
	const [weather, setWeather] = useState<WeatherData>(defaultWeatherData);
	const [searchCity, setSearchCity] = useState("");
	const [loading, setLoading] = useState(false);

	return (
		<AppContext.Provider
			value={{
				weather,
				setWeather,
				searchCity,
				setSearchCity,
				loading,
				setLoading,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error("useAppContext must be used within an AppContextProvider");
	}
	return context;
};
