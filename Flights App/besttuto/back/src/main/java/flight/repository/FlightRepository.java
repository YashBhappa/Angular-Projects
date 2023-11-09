/**
 * 
 */
package flight.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import flight.models.Flight;

/**
 * @author BestTutorials
 *
 */
@Repository
public interface FlightRepository extends JpaRepository<Flight, Long>, FlightRepositoryCustom {

}
