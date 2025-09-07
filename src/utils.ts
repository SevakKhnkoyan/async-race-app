import { Car } from './types';

const carData: Record<string, string[]> = {
  Tesla: ['Model S', 'Model 3', 'Model X', 'Model Y', 'Cybertruck'],
  BMW: ['3 Series', '5 Series', 'X5', 'i8', 'M3'],
  Audi: ['A3', 'A4', 'A6', 'Q5', 'R8'],
  Lada: ['Niva', 'Granta', 'Vesta', 'Priora'],
  Ford: ['Focus', 'Mustang', 'Explorer', 'F-150', 'Fiesta'],
  Toyota: ['Corolla', 'Camry', 'Supra', 'Land Cruiser', 'Yaris'],
  Honda: ['Civic', 'Accord', 'CR-V', 'NSX'],
  Nissan: ['Altima', 'GT-R', 'Leaf', 'X-Trail'],
  Chevrolet: ['Impala', 'Camaro', 'Tahoe', 'Corvette'],
  Kia: ['Rio', 'Sportage', 'Sorento', 'Stinger'],
  Hyundai: ['Elantra', 'Tucson', 'Santa Fe', 'Sonata'],
  Mercedes: ['C-Class', 'E-Class', 'S-Class', 'GLA', 'AMG GT'],
  Porsche: ['911', 'Cayenne', 'Panamera', 'Taycan'],
  Volkswagen: ['Golf', 'Passat', 'Tiguan', 'ID.4'],
  Peugeot: ['208', '308', '508', '3008'],
  Renault: ['Clio', 'Megane', 'Captur', 'Koleos'],
  Subaru: ['Impreza', 'Forester', 'Outback', 'BRZ'],
  Volvo: ['XC40', 'XC60', 'XC90', 'S60'],
  Jaguar: ['XE', 'XF', 'F-Type', 'E-Pace'],
  Ferrari: ['488', 'Roma', 'Portofino', 'F8'],
  Lamborghini: ['Huracán', 'Aventador', 'Urus'],
  Maserati: ['Ghibli', 'Levante', 'Quattroporte'],
  Bugatti: ['Chiron', 'Veyron', 'Divo'],
  RollsRoyce: ['Phantom', 'Ghost', 'Wraith', 'Cullinan'],
  Bentley: ['Continental GT', 'Bentayga', 'Flying Spur'],
  Jeep: ['Wrangler', 'Cherokee', 'Renegade'],
  Dodge: ['Charger', 'Challenger', 'Durango'],
};

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
  for (let i = 0; i < 100; i++) {
    const newCar: Omit<Car, 'id'> = {
      name: getRandomName(),
      color: getRandomColor(),
    };
    cars.push(newCar);
  }
  return cars;
}