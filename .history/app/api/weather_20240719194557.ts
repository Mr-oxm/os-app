import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { city = 'Egypt' } = req.query;
    const API_KEY = process.env.OPENWEATHER_API_KEY;

    try {
        const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching weather data' });
  }
}