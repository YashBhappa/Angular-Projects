import { CompanyName } from '../util/enums/company-name.enum';
import { FlightType } from '../util/enums/flight-type.enum';
import { TravelType } from '../util/enums/travel-type.enum';
import { CabinDetail } from './cabin-detail.model';
import { InflightInfo } from './inflight-info.model';

export class Flight {
    idFlight: number;
    companyName: CompanyName;
    flightType: FlightType;
    travelType: TravelType;
    departureDate: Date;
    departureTime: Date;
    arrivalDate: Date;
    arrivalTime: Date;
    backDate: Date;
    backTime: Date;
    departureLocation: string;
    arrivalLocation: string;
    flightDuration: Date;
    connectionDuration: Date;
    aircraftType: string;
    cabinDetails: Set<CabinDetail>;
    comforts: Set<String>;
    inflightInfos: Set<InflightInfo>;
}
