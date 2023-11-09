/**
 * 
 */
package flight.models;

import javax.persistence.Embeddable;

/**
 * @author BestTutorials
 *
 */
@Embeddable
public class InflightInfo {
	private String title;
	private String description;
	
	/**
	 * @param title
	 * @param description
	 */
	public InflightInfo(String title, String description) {
		super();
		this.title = title;
		this.description = description;
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
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * @param description the description to set
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * 
	 */
	public InflightInfo() {
		// TODO Auto-generated constructor stub
	}

}
