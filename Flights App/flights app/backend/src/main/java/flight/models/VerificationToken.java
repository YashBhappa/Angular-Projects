/**
 * 
 */
package flight.models;

import java.util.Calendar;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

/**
 * @author kamal
 *
 */
@Entity
public class VerificationToken {
	  private static final int EXPIRATION = 60 * 24;
	  
	    @Id
	    @GeneratedValue(strategy = GenerationType.AUTO)
	    private Long id;
		@Column(name = "token")
	    private String token;
	  
	    @OneToOne(targetEntity = UserDao.class, fetch = FetchType.EAGER)
	    @JoinColumn(nullable = false, name = "user_id")
	    private UserDao user;
		@Column(name = "expiry_date")
	    private Date expiryDate;
		
	    public VerificationToken() {
	        super();
	    }

	    public VerificationToken(final String token) {
	        super();

	        this.token = token;
	        this.expiryDate = calculateExpiryDate(EXPIRATION);
	    }

	    public VerificationToken(final String token, final UserDao user) {
	        super();

	        this.token = token;
	        this.user = user;
	        this.expiryDate = calculateExpiryDate(EXPIRATION);
	    }

	   
	    /**
		 * @return the id
		 */
		public Long getId() {
			return id;
		}

		/**
		 * @param id the id to set
		 */
		public void setId(Long id) {
			this.id = id;
		}

		/**
		 * @return the token
		 */
		public String getToken() {
			return token;
		}

		/**
		 * @param token the token to set
		 */
		public void setToken(String token) {
			this.token = token;
		}

		/**
		 * @return the user
		 */
		public UserDao getUser() {
			return user;
		}

		/**
		 * @param user the user to set
		 */
		public void setUser(UserDao user) {
			this.user = user;
		}

		/**
		 * @return the expiryDate
		 */
		public Date getExpiryDate() {
			return expiryDate;
		}

		/**
		 * @param expiryDate the expiryDate to set
		 */
		public void setExpiryDate(Date expiryDate) {
			this.expiryDate = expiryDate;
		}

		private Date calculateExpiryDate(int expiryTimeInMinutes) {
	    	 final Calendar cal = Calendar.getInstance();
	         cal.setTimeInMillis(new Date().getTime());
	         cal.add(Calendar.MINUTE, expiryTimeInMinutes);
	         return new Date(cal.getTime().getTime());
	    }
	    public void updateToken(final String token) {
	        this.token = token;
	        this.expiryDate = calculateExpiryDate(EXPIRATION);
	    }
}
