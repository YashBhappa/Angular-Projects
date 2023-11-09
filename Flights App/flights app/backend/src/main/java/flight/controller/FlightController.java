package flight.controller;

import java.security.Principal;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.UUID;
import java.util.function.Consumer;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.MessageSource;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import flight.config.EmailService;
import flight.config.JwtUtil;
import flight.config.TheUserDetailsService;
import flight.dto.FlightDto;
import flight.dto.PasswordDto;
import flight.dto.SyntheseCompanyDto;
import flight.dto.SyntheseTripDto;
import flight.dto.UserDto;
import flight.models.Bookmark;
import flight.models.Email;
import flight.models.Flight;
import flight.models.FlightCriteria;
import flight.models.LoginRequest;
import flight.models.LoginResponse;
import flight.models.SynthesisCriteria;
import flight.models.UserDao;
import flight.registration.OnRegistrationCompleteEvent;
import flight.repository.UserRepository;
import flight.service.FlightService;

@CrossOrigin
@RestController
@RequestMapping("flight-webservices/api/v1.0/flights")
public class FlightController {
	@Autowired
	FlightService flightService;
	@Autowired
	AuthenticationManager authenticationManager;
	@Autowired
	JwtUtil jwtTokenUtil;
	@Autowired
	TheUserDetailsService theUserDetailsService;
	@Autowired
	private EmailService emailService;
	@Autowired
	private Environment env;
	@Autowired
	ApplicationEventPublisher eventPublisher;

	private ModelMapper modelMapper;

	@Autowired
	private MessageSource messages;

	PropertyMap<Flight, FlightDto> companyFieldMapping = new PropertyMap<Flight, FlightDto>() {
		protected void configure() {
			map().setCompanyName(source.getCompany().getCompanyName());
			map().setCabinDetails(source.getCompany().getCabinDetails());
			map().setComforts(source.getCompany().getComforts());
			map().setInflightInfos(source.getCompany().getInflightInfos());
		}
	};

	@GetMapping
	public ResponseEntity<List<FlightDto>> getAllFlights() {
		List<FlightDto> flightDtos = flightService.getAllFlights().stream()
				.map(flight -> modelMapper.map(flight, FlightDto.class)).collect(Collectors.toList());
		return new ResponseEntity<List<FlightDto>>(flightDtos, new HttpHeaders(), HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<List<FlightDto>> searchFlight(@Valid @RequestBody FlightCriteria flightCriteria) {
		List<FlightDto> flightDtos = flightService.searchFlight(flightCriteria).stream()
				.map(flight -> modelMapper.map(flight, FlightDto.class)).collect(Collectors.toList());
		return new ResponseEntity<List<FlightDto>>(flightDtos, new HttpHeaders(), HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<FlightDto> getFlight(@PathVariable(value = "id") Long idFlight) {
		Flight flight = flightService.getFlight(idFlight);
		FlightDto flightDto = modelMapper.map(flight, FlightDto.class);
		return new ResponseEntity<FlightDto>(flightDto, new HttpHeaders(), HttpStatus.OK);
	}

	@PostMapping("/numberFlights")
	public ResponseEntity<Long> getNumberFlights(@Valid @RequestBody SynthesisCriteria synthesisCriteria) {
		Long nbFlights = flightService.getNumberFlights(synthesisCriteria);
		return new ResponseEntity<Long>(nbFlights, new HttpHeaders(), HttpStatus.OK);
	}

	@PostMapping("/syntheseCompanyFlights")
	public ResponseEntity<List<SyntheseCompanyDto>> getSyntheseCompanyFlights(
			@Valid @RequestBody SynthesisCriteria synthesisCriteria) {
		List<SyntheseCompanyDto> syntheseCompanyDtos = flightService.getSyntheseCompanyFlights(synthesisCriteria);
		return new ResponseEntity<List<SyntheseCompanyDto>>(syntheseCompanyDtos, new HttpHeaders(), HttpStatus.OK);
	}

	@PostMapping("/syntheseTripFlights")
	public ResponseEntity<List<SyntheseTripDto>> getSyntheseTripFlights(
			@Valid @RequestBody SynthesisCriteria synthesisCriteria) {
		List<SyntheseTripDto> syntheseTripDtos = flightService.getSyntheseTripFlights(synthesisCriteria);
		return new ResponseEntity<List<SyntheseTripDto>>(syntheseTripDtos, new HttpHeaders(), HttpStatus.OK);
	}

	@PostMapping("/bookmarks")
	public ResponseEntity<Bookmark> addBookmark(@Valid @RequestBody Bookmark bookmark, Principal principal) {
		UserDao user = theUserDetailsService.loadUserByName(principal.getName());
		bookmark.setUser(user);
		Bookmark addedBookmark = flightService.addBookmark(bookmark);
		return new ResponseEntity<Bookmark>(addedBookmark, new HttpHeaders(), HttpStatus.OK);
	}

	@GetMapping("/bookmarks")
	public ResponseEntity<List<Bookmark>> getAllBookmarks(Principal principal) {
		List<Bookmark> bookmarks = flightService.getBookmarkList(principal.getName());
		return new ResponseEntity<List<Bookmark>>(bookmarks, new HttpHeaders(), HttpStatus.OK);
	}

	@GetMapping("/bookmarks/{id}")
	public ResponseEntity<Bookmark> getBookmark(@PathVariable(value = "id") Long idBookmark) {
		Bookmark bookmark = flightService.getBookmark(idBookmark);
		return new ResponseEntity<Bookmark>(bookmark, new HttpHeaders(), HttpStatus.OK);
	}

	@DeleteMapping("/bookmarks/{id}")
	public void deleteBookmark(@PathVariable(value = "id") Long idBookmark) {
		flightService.deleteBookmark(idBookmark);
	}

	@DeleteMapping("/bookmarks")
	public void deleteAllBookmark(Principal principal) {
		List<Bookmark> bookmarks = flightService.getBookmarkList(principal.getName());
		for (Bookmark bookmark : bookmarks) {
			flightService.deleteBookmark(bookmark.getIdBookmark());
		}
	}

	@PostMapping("/authenticate")
	public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginRequest loginRequest) throws Exception {
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
		} catch (BadCredentialsException e) {
			throw new Exception("Incorrect username or password", e);
		}
		final UserDetails userDetails = theUserDetailsService.loadUserByUsername(loginRequest.getUsername());
		final String jwt = jwtTokenUtil.generateToken(userDetails);
		return new ResponseEntity<LoginResponse>(new LoginResponse(jwt), new HttpHeaders(), HttpStatus.OK);
	}

	@PostMapping("/register")
	public ResponseEntity<?> saveUser(@RequestBody UserDto user, final HttpServletRequest request) throws Exception {
		final UserDao userDao = theUserDetailsService.save(user);
		eventPublisher.publishEvent(new OnRegistrationCompleteEvent(userDao, Locale.US, getAppUrl(request)));
		return ResponseEntity.ok(userDao);
	}

	@PostMapping("/forgotPassword")
	public ResponseEntity<LoginResponse> forgotPassword(@RequestBody String userEmail, HttpServletRequest request)
			throws Exception {
		Optional<UserDao> optional = theUserDetailsService.loadUserByEmail(userEmail);
		if (optional.isPresent()) {
			UserDao user = optional.get();
			final String token = UUID.randomUUID().toString();
			theUserDetailsService.createPasswordResetTokenForUser(user, token);
			/*
			 * String appUrl = request.getRemoteAddr()+":"+request.getRemotePort();
			 * System.out.println(appUrl);
			 */
			SimpleMailMessage passwordResetEmail = new SimpleMailMessage();
			passwordResetEmail.setFrom(env.getProperty("support.email"));
			passwordResetEmail.setTo(user.getEmail());
			passwordResetEmail.setSubject("Password Reset Request");
			passwordResetEmail.setText(
					"To reset your password, click the link below:\n http://localhost:4200/authentification/reset-password?token="
							+ token);
			emailService.sendEmail(passwordResetEmail);
			return new ResponseEntity<LoginResponse>(new LoginResponse("Email sent"), new HttpHeaders(), HttpStatus.OK);
		} else {
			return new ResponseEntity<LoginResponse>(
					new LoginResponse(messages.getMessage("message.userNotFound", null, Locale.US)), new HttpHeaders(),
					HttpStatus.OK);
		}

	}

	@PostMapping("/reset")
	public ResponseEntity<LoginResponse> resetPassword(@RequestBody PasswordDto passwordDto) throws Exception {
		final String result = theUserDetailsService.validatePasswordResetToken(passwordDto.getToken());
		if (result != null) {
			return new ResponseEntity<LoginResponse>(new LoginResponse("Invalid token"), new HttpHeaders(),
					HttpStatus.OK);
		}
		Optional<UserDao> user = theUserDetailsService.getUserByPasswordResetToken(passwordDto.getToken());
		if (user.isPresent()) {
			theUserDetailsService.changeUserPassword(user.get(), passwordDto.getNewPassword());
			return new ResponseEntity<LoginResponse>(new LoginResponse("Reset Success"), new HttpHeaders(),
					HttpStatus.OK);
		} else {
			return new ResponseEntity<LoginResponse>(new LoginResponse("User not exist"), new HttpHeaders(),
					HttpStatus.OK);
		}
	}

	@GetMapping("/registration-confirm")
	public ResponseEntity<LoginResponse> confirmRegistration(@RequestParam("token") final String token) {
		final String result = theUserDetailsService.validateVerificationToken(token);
		return new ResponseEntity<LoginResponse>(new LoginResponse(result), new HttpHeaders(), HttpStatus.OK);
	}

	private String getAppUrl(HttpServletRequest request) {
		return "http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
	}

	/*
	 * @PostMapping("/reset") public ResponseEntity<String> reset(@RequestBody
	 * String password) throws Exception { Optional<UserDao> optional =
	 * theUserDetailsService.loadUserByResetToken(resetToken); UserDao user =
	 * optional.get();
	 * 
	 * return new ResponseEntity<String>("A password reset link has been sent to " +
	 * resetToken, new HttpHeaders(), HttpStatus.OK); }
	 */
	/*
	 * @PostMapping("/contact") public ResponseEntity<Email> contact(@RequestBody
	 * Email email) throws Exception {
	 * 
	 * emailService.sendEmail(email); return new ResponseEntity<Email>(email,new
	 * HttpHeaders(), HttpStatus.OK); }
	 */
	/**
	 * @param modelMapper
	 */
	@Autowired
	public FlightController(ModelMapper modelMapper) {
		this.modelMapper = modelMapper;
		this.modelMapper.addMappings(companyFieldMapping);
	}

}
