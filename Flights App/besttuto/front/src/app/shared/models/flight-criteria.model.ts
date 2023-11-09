import { CompanyName } from '../util/enums/company-name.enum';
import { FlightType } from '../util/enums/flight-type.enum';
import { TravelType } from '../util/enums/travel-type.enum';

export class FlightCriteria {
    company: CompanyName;
    flightType: FlightType;
    travelType: TravelType;
    departureLocation: string;
    arrivalLocation: string;
    departureDateMin: Date;
    arrivalDateMin: Date;
    backDateMin: Date;
    departureTimeMin: Date;
    arrivalTimeMin: Date;
    backTimeMin: Date;
    flightDurationMin: Date;
    connectionDurationMin: Date;
    departureDateMax: Date;
    arrivalDateMax: Date;
    backDateMax: Date;
    departureTimeMax: Date;
    arrivalTimeMax: Date;
    backTimeMax: Date;
    flightDurationMax: Date;
    connectionDurationMax: Date;
    aircraftType: string;
    fareMin: number;
    fareMax: number;
}
