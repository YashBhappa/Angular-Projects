/**
 * 
 */
package flight.repository;
import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import flight.models.UserDao;  
import flight.models.VerificationToken;

/**
 * @author kamal
 *
 */
@Repository
public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long>{
	   @Query("SELECT verifToken FROM VerificationToken verifToken where verifToken.token = ?1")
	   VerificationToken findByToken(String token);
	    
	    @Query("SELECT verifToken FROM VerificationToken verifToken where verifToken.user = ?1")
	    VerificationToken findByUser(UserDao user);
	    
	    @Modifying
	    @Query("delete from VerificationToken t where t.expiryDate <= ?1")
	    void deleteAllExpiredSince(Date now);
}
