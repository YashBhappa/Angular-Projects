/**
 * 
 */
package flight.dto;

/**
 * @author BestTutorials
 *
 */
public class LogResponseDto {
	String jwt;

	/**
	 * @return the jwt
	 */
	public String getJwt() {
		return jwt;
	}

	/**
	 * @param jwt
	 *            the jwt to set
	 */
	public void setJwt(String jwt) {
		this.jwt = jwt;
	}

	/**
	 * 
	 */
	public LogResponseDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param jwt
	 */
	public LogResponseDto(String jwt) {
		super();
		this.jwt = jwt;
	}

}
