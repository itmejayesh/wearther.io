import axios, {AxiosResponse} from "axios";

const API_URL = "https://api.openweathermap.org/data/2.5/";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY1;

export const getWeatherDataByCity = async (city: string) => {
	try {
		const response: AxiosResponse = await axios.get(
			`${API_URL}weather?q=${city}&appid=${API_KEY}&units=metric`
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching weather data by city:", error);
		return null;
	}
};

export const getWeatherDataByCurrentLocation = async (
	lat: number,
	lon: number
) => {
	try {
		const response: AxiosResponse = await axios.get(
			`${API_URL}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching weather data by current location:", error);
		return null;
	}
};
