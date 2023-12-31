/**
 * 
 */
package flight.registration;

import java.util.Locale;

import org.springframework.context.ApplicationEvent;

import flight.models.UserDao;

/**
 * @author kamal
 *
 */
@SuppressWarnings("serial")
public class OnRegistrationCompleteEvent extends ApplicationEvent{
	   private final String appUrl;
	    private final Locale locale;
	    private final UserDao user;

	    public OnRegistrationCompleteEvent(final UserDao user, final Locale locale, final String appUrl) {
	        super(user);
	        this.user = user;
	        this.locale = locale;
	        this.appUrl = appUrl;
	    }

	    //

	    public String getAppUrl() {
	        return appUrl;
	    }

	    public Locale getLocale() {
	        return locale;
	    }

	    public UserDao getUser() {
	        return user;
	    }
}
