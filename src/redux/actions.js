import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const covidUrl = "https://covid-19-statistics.p.rapidapi.com/reports";

const headers = {
  "x-rapidapi-key": "8e83daff9dmsh6dcb0945f67d5eep10afb4jsn8fdf795302d8",
  "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
};

export const getData = createAsyncThunk(
  "covid/getData",
  async ({ code, query }) => {
    console.log(query);

    const params = { iso: code, q: query };

    const res = await axios.get(covidUrl, { params, headers });

    console.log(res);

    const res2 = axios.get(
      code
        ? `https://restcountries.com/v3.1/alpha/${code}`
        : `https://restcountries.com/v3.1/name/${query}`
    );

    const responses = await Promise.all([res, res2]);

    const covid = {
      ...responses[0].data.data[0],
      ...responses[0].data.data[0].region,
    };

    delete covid.cities;
    delete covid.region;
    console.log(covid);

    return { covid, country: responses[1].data[0] };
  }
);
