export interface Car {
  id: number;
  name: string;
  color: string;
}

export interface GarageState {
  page: number;
  selectedCarId: number | null;
  color: string;
  name: string;
}
