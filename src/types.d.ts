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

export type PaginatedCars = { cars: Car[]; total: number };

export type StartEngineResp = { velocity: number; distance: number };
export type DriveResp = { success: boolean };

export type CarRowHandle = {
  start: () => Promise<void> | void;
  stop: () => Promise<void> | void;
};

export type WinnerInfo = { id: number; name: string; wins?: number; time: number };

export type RaceState = {
  winner: WinnerInfo | null;
  page: number;
};

export type WinnerSortField = 'wins' | 'time';

export type SortOrder = 'ASC' | 'DESC';
