/**
 * 
 */
package flight.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import flight.dto.SyntheseCompanyDto;
import flight.models.Flight;
import flight.models.FlightCriteria;
import flight.models.SynthesisCriteria;
import flight.repository.FlightRepository;
import flight.service.FlightService;

/**
 * @author BestTutorials
 *
 */
@Service
@Transactional
public class FlightServiceImpl implements FlightService {

	@Autowired
	private FlightRepository flightRepository;

	public Flight addFlight(Flight flight) {
		return flightRepository.save(flight);
	}

	public List<Flight> getAllFlights() {
		List<Flight> flights = flightRepository.findAll();

		if (flights.size() > 0) {
			return flights;
		} else {
			return new ArrayList<Flight>();
		}
	}

	@Override
	public List<Flight> searchFlight(FlightCriteria flightCriteria) {
		return flightRepository.searchFlight(flightCriteria);
	}

	@Override
	public Flight getFlight(Long idFlight) {   
		return flightRepository.findById(idFlight).orElse(null);
	}

	@Override
	public Long getNumberFlights(SynthesisCriteria synthesisCriteria) {
		return flightRepository.getNumberFlights(synthesisCriteria);
	}

	@Override
	public List<SyntheseCompanyDto> getNbsFlightsByCompany(SynthesisCriteria synthesisCriteria) {
		return flightRepository.getNbsFlightsByCompany(synthesisCriteria);
	}

}
