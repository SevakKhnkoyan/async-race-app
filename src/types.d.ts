export interface Car { id, name, color }

export interface CarsState {
  cars: Car[];
  totalCount: number;
  page: number;
  selectedCarId: number | null;
  status: 'idle' | 'loading' | 'error';
}