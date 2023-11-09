/**
 * 
 */
package flight.registration;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.MessageSource;
import org.springframework.context.event.EventListener;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import flight.config.TheUserDetailsService;
import flight.models.UserDao;

/**
 * @author kamal
 *
 */
@Component
public class RegistrationListener implements ApplicationListener<OnRegistrationCompleteEvent>{
    @Autowired
    private TheUserDetailsService service;

    @Autowired
    private MessageSource messages;

    @Autowired
    private JavaMailSender mailSender;
    
	@Override
	public void onApplicationEvent(OnRegistrationCompleteEvent event) {
        this.confirmRegistration(event);
	}
	
    private void confirmRegistration(final OnRegistrationCompleteEvent event) {
        final UserDao user = event.getUser();
        final String token = UUID.randomUUID().toString();
        service.createVerificationTokenForUser(user, token);

        final SimpleMailMessage email = constructEmailMessage(event, user, token);
        mailSender.send(email);
    }
    
    private SimpleMailMessage constructEmailMessage(final OnRegistrationCompleteEvent event, final UserDao user, final String token) {
        final String recipientAddress = user.getEmail();
        final String subject = "Registration Confirmation";
        final String message = "To confirm registration click this URL:\\n http://localhost:4200/authentification/registration-confirm?token="+ token;
        final SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(recipientAddress);
        email.setSubject(subject);
        email.setText(message);
        email.setFrom("kamal.danguir92@gmail.com");
        return email;
    }

}
