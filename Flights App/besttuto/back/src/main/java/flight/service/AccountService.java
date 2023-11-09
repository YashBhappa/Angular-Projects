/**
 * 
 */
package flight.service;

import org.springframework.security.core.userdetails.UserDetailsService;

import flight.dto.AccountDto;
import flight.models.Account;

/**
 * @author BestTutorials
 *
 */
public interface AccountService extends UserDetailsService{
	Account addAccount(AccountDto accountDto);
	Account findByUsername(String username);
}
