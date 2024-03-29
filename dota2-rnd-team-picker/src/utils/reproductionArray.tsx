import { Prize } from "../components/Roulette";

const reproductionArray = (array : Prize[] = [], length = 0) => [
    ...Array(length)
      .fill('_')
      .map(() => array[Math.floor(Math.random() * array.length)]),
  ];
  
  export default reproductionArray;