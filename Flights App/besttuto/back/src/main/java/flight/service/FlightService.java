/**
 * 
 */
package flight.service;

import java.util.List;

import flight.dto.SyntheseCompanyDto;
import flight.models.Flight;
import flight.models.FlightCriteria;
import flight.models.SynthesisCriteria;

/**
 * @author BestTutorials
 *
 */
public interface FlightService {
	Flight addFlight(Flight flight);

	List<Flight> getAllFlights();

	List<Flight> searchFlight(FlightCriteria flightCriteria);

	Flight getFlight(Long idFlight);
	
	Long getNumberFlights(SynthesisCriteria synthesisCriteria);
	
	List<SyntheseCompanyDto> getNbsFlightsByCompany(SynthesisCriteria synthesisCriteria);
	
}
