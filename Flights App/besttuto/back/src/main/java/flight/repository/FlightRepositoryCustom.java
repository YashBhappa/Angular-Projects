/**
 * 
 */
package flight.repository;

import java.util.List;

import flight.dto.SyntheseCompanyDto;
import flight.models.Flight;
import flight.models.FlightCriteria;
import flight.models.SynthesisCriteria;

/**
 * @author BestTutorials
 *
 */
public interface FlightRepositoryCustom {
	List<Flight> searchFlight(FlightCriteria flightCriteria);

	Long getNumberFlights(SynthesisCriteria synthesisCriteria);

	List<SyntheseCompanyDto> getNbsFlightsByCompany(SynthesisCriteria synthesisCriteria);

}
