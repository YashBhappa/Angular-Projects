/**
 * 
 */
package flight.config;

import java.time.Instant;
import java.util.Date;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import flight.repository.PasswordResetTokenRepository;

/**
 * @author kamal
 *
 */
@Service
@Transactional
public class TokensPurgeTask {
    @Autowired
    PasswordResetTokenRepository passwordTokenRepository;
    
    @Scheduled(cron = "${purge.cron.expression}")
    public void purgeExpired() {
    	System.out.println("******scheduling************");
        Date now = Date.from(Instant.now());
        passwordTokenRepository.deleteAllExpiredSince(now);
    }
}
