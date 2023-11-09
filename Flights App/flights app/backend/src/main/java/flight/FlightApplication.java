package flight;

import java.util.Properties;
import java.util.concurrent.Executor;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.task.TaskExecutionAutoConfiguration;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.event.ApplicationEventMulticaster;
import org.springframework.context.event.SimpleApplicationEventMulticaster;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.core.env.Environment;
import org.springframework.core.task.SimpleAsyncTaskExecutor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.concurrent.ConcurrentTaskScheduler;
import org.springframework.web.context.request.RequestContextListener;

import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties;

import flight.config.TokensPurgeTask;

@EnableScheduling
@EnableEncryptableProperties
@SpringBootApplication
public class FlightApplication{
	@Autowired
	private Environment env;
	
	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}
	
	 @Bean
	    public RequestContextListener requestContextListener() {
	        return new RequestContextListener();
	    }
	 
	 @Bean
	    public ResourceBundleMessageSource messageSource() {

		    ResourceBundleMessageSource source = new ResourceBundleMessageSource();
	        source.setBasenames("messages");
	        source.setUseCodeAsDefaultMessage(true);

	        return source;
	    }
	 
	    @Bean(name = "applicationEventMulticaster")
	    public ApplicationEventMulticaster simpleApplicationEventMulticaster() {
	        SimpleApplicationEventMulticaster eventMulticaster =
	          new SimpleApplicationEventMulticaster();
	        
	        eventMulticaster.setTaskExecutor(new SimpleAsyncTaskExecutor());
	        return eventMulticaster;
	    }
	 
	@Bean
	public JavaMailSender getJavaMailSender() {
	    JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
	    mailSender.setHost("smtp.gmail.com");
	    mailSender.setPort(587);
	    mailSender.setUsername("best2021tutorials@gmail.com");
	    mailSender.setPassword("jdarTHEr.1");
	    
	    Properties props = mailSender.getJavaMailProperties();   
	    props.put("mail.transport.protocol", "smtp");
	    props.put("mail.smtp.auth", "true");
	    props.put("mail.smtp.starttls.enable", "true");
	    props.put("mail.smtp.ssl.trust", "smtp.gmail.com");
	    props.put("mail.debug", "true");
	    
	    return mailSender;
	}
	
	public static void main(String[] args) {
		SpringApplication.run(FlightApplication.class, args);
	}
}
