import { PredictiHttpResult } from "./api.types";

class Api {
  apiURL;

  constructor(apiURL: string) {
    this.apiURL = apiURL;
  }

  async predict(params: Record<string, number>, endpoint: string): Promise<PredictiHttpResult | undefined> {
    try {
      const paramsPattern = Object.keys(params).map((param) => {
        return [param, params[param] ? params[param].toString() : (Math.floor(Math.random() * 6) + 5).toString()];
      });

      const queryParams = new URLSearchParams(paramsPattern);

      const response = await fetch(`${this.apiURL}/${endpoint}/?${queryParams.toString()}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}

const apiBaseURL = " https://alexbobr.ru";
export const api = new Api(apiBaseURL);
