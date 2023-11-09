/**
 * 
 */
package flight.config;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Repository;

import flight.models.Email;

/**
 * @author kamal
 *
 */
@Repository
public interface EmailService {
	public void sendEmail(SimpleMailMessage  email);
}
