import { carData, NUMBER_OF_CARS_TO_GENERATE } from './constants';
import { Car } from './types';

function getRandomName(): string {
  const brands = Object.keys(carData);
  const randomBrand = brands[Math.floor(Math.random() * brands.length)];
  const models = carData[randomBrand];
  const randomModel = models[Math.floor(Math.random() * models.length)];
  return `${randomBrand} ${randomModel}`;
}

function getRandomColor(): string {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

export function generateRandomCars() {
  const cars: Omit<Car, 'id'>[] = [];
  for (let i = 0; i < NUMBER_OF_CARS_TO_GENERATE; i++) {
    const newCar: Omit<Car, 'id'> = {
      name: getRandomName(),
      color: getRandomColor(),
    };
    cars.push(newCar);
  }
  return cars;
}
