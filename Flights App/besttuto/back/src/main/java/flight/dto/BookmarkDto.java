/**
 * 
 */
package flight.dto;

import flight.models.FlightCriteria;

/**
 * @author BestTutorials
 *
 */
public class BookmarkDto {

	private String title;
	private int nbFlights;
	private FlightCriteria flightCriteria;

	
	/**
	 * @return the nbFlights
	 */
	public int getNbFlights() {
		return nbFlights;
	}


	/**
	 * @param nbFlights the nbFlights to set
	 */
	public void setNbFlights(int nbFlights) {
		this.nbFlights = nbFlights;
	}


	/**
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}


	/**
	 * @param title the title to set
	 */
	public void setTitle(String title) {
		this.title = title;
	}


	/**
	 * @return the flightCriteria
	 */
	public FlightCriteria getFlightCriteria() {
		return flightCriteria;
	}


	/**
	 * @param flightCriteria the flightCriteria to set
	 */
	public void setFlightCriteria(FlightCriteria flightCriteria) {
		this.flightCriteria = flightCriteria;
	}


	/**
	 * 
	 */
	public BookmarkDto() {
		// TODO Auto-generated constructor stub
	}

}
