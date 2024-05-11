import { Coords } from './../models/Coords';
/// <reference lib="webworker" />





addEventListener('message', ({data}) => {
  console.log(data)
  const response = data
  postMessage(response);
});

