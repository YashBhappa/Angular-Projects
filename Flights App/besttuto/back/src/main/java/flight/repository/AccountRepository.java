/**
 * 
 */
package flight.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import flight.models.Account;

/**
 * @author BestTutorials
 *
 */
@Repository
public interface AccountRepository extends CrudRepository<Account, Integer>{
	@Query("select account from Account account where account.username=?1")
	Account findByUsername(String username);
}
