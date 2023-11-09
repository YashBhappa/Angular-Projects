/**
 * 
 */
package flight.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import flight.models.UserDao;;

/**
 * @author kamal
 *
 */
@Repository
public interface UserRepository extends CrudRepository<UserDao, Integer> {
    @Query("SELECT u FROM UserDao u where u.username = ?1")
	UserDao findByUsername(String username);
    
    @Query("SELECT u FROM UserDao u where u.email = ?1")
    Optional<UserDao> findByEmail(String email);
 
}
