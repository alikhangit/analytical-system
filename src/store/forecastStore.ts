import { autorun, makeAutoObservable } from "mobx";

class Forecast {
  state = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increaseState() {
    this.state += 1;
  }
}

export const forecastStore = new Forecast();

autorun(() => {
  //   console.log(forecastStore.state);
});
