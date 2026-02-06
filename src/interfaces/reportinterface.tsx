export interface ReportData {
  missionDate: string; //
  missionType: string; //
  departureTime: string; //
  arrivalTime: string; //
  startLocation: string; //
  endLocation: string; //
  distance: number; //
  fuelConsumed?: number; //
  hoursDriven: number; //
  observations?: string; //
  incidents?: IncidentDto[]; //
  vehicleCondition?: string; //
}

export interface IncidentDto {
  description: string;
  time: string;
  type: string; //'accident' | 'panne' | 'retard' | 'autre'
}