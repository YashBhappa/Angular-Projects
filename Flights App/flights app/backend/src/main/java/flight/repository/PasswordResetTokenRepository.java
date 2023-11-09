/**
 * 
 */
package flight.repository;

import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import flight.models.PasswordResetToken;
import flight.models.UserDao;

/**
 * @author kamal
 *  
 */
@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    @Query("SELECT passResToken FROM PasswordResetToken passResToken where passResToken.token = ?1")
	PasswordResetToken findByToken(String token);
    
    @Query("SELECT passResToken FROM PasswordResetToken passResToken where passResToken.user = ?1")
	PasswordResetToken findByUser(UserDao user);
    
    @Modifying
    @Query("delete from PasswordResetToken t where t.expiryDate <= ?1")
    void deleteAllExpiredSince(Date now);
}  
