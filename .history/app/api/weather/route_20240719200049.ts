import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { city = 'Egypt' } = req.query;
    const API_KEY = process.env.WEATHER_API_KEY;

    try {
        const response = await axios.get(
        `api.openweathermap.org/data/2.5/forecast?id&appid={API key}`
        );
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching weather data' });
    }
}