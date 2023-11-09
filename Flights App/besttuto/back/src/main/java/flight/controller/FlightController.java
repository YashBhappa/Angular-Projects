/**
 * 
 */
package flight.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.core.env.Environment;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;

import flight.dto.AccountDto;
import flight.dto.BookmarkDto;
import flight.dto.FlightDto;
import flight.dto.LogResponseDto;
import flight.dto.LoginDto;
import flight.dto.SyntheseCompanyDto;
import flight.models.Account;
import flight.models.Bookmark;
import flight.models.Flight;
import flight.models.FlightCriteria;
import flight.models.SynthesisCriteria;
import flight.service.AccountService;
import flight.service.BookmarkService;
import flight.service.FlightService;
import flight.util.JwtTokenUtil;

/**
 * @author BestTutorials
 *
 */
@RestController
@RequestMapping(value ="flight-webservices/api/v1.0/flights",produces={"application/json; charset=UTF-8"})
public class FlightController {
	@Autowired
	FlightService flightService;

	@Autowired
	AccountService accountService;

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	BookmarkService bookmarkService;

	@Autowired
	JwtTokenUtil jwtTokenUtil;
	
	@Autowired  
	private MessageSource messages;

	private ModelMapper modelMapper;

	PropertyMap<Flight, FlightDto> companyFieldMapping = new PropertyMap<Flight, FlightDto>() {
		protected void configure() {
			map().setCompanyName(source.getCompany().getCompanyName());
			map().setCabinDetails(source.getCompany().getCabinDetails());
			map().setInflightInfos(source.getCompany().getInflightInfos());
		}

	};

	@Autowired
	public FlightController(ModelMapper modelMapper) {
		this.modelMapper = modelMapper;
		this.modelMapper.addMappings(companyFieldMapping);
	}

	@PostMapping("/addFlight")
	public ResponseEntity<Flight> addFlight(@RequestBody Flight flight) {
		Flight addedFlight = flightService.addFlight(flight);
		return new ResponseEntity<Flight>(addedFlight, new HttpHeaders(), HttpStatus.OK);
	}

	@GetMapping("/allFlights")
	public ResponseEntity<List<FlightDto>> getAllFlights() {
		List<FlightDto> flights = flightService.getAllFlights().stream()
				.map(flight -> modelMapper.map(flight, FlightDto.class)).collect(Collectors.toList());
		return new ResponseEntity<List<FlightDto>>(flights, new HttpHeaders(), HttpStatus.OK);
	}

	@PostMapping("/search")
	public ResponseEntity<List<FlightDto>> searchFlights(@RequestBody FlightCriteria flightCriteria) {
		List<FlightDto> flights = flightService.searchFlight(flightCriteria).stream()
				.map(flight -> modelMapper.map(flight, FlightDto.class)).collect(Collectors.toList());
		return new ResponseEntity<List<FlightDto>>(flights, new HttpHeaders(), HttpStatus.OK);
	}

	@GetMapping("/getFlight/{id}")
	public ResponseEntity<?> getFlight(@PathVariable(value = "id") Long idFlight) {
		Flight flight = flightService.getFlight(idFlight);
		if(flight==null) {
			 return new ResponseEntity<String>("Flight number " + idFlight + " doesn't exist",HttpStatus.NOT_FOUND);
		}
		else {
			FlightDto flightDto = modelMapper.map(flight, FlightDto.class);
			return new ResponseEntity<FlightDto>(flightDto, new HttpHeaders(), HttpStatus.OK);
		}

	}

	@PostMapping("/numberFlights")
	public ResponseEntity<Long> getNumberFlights(@RequestBody SynthesisCriteria synthesisCriteria) {
		Long nbFlights = flightService.getNumberFlights(synthesisCriteria);
		return new ResponseEntity<Long>(nbFlights, new HttpHeaders(), HttpStatus.OK);
	}

	@PostMapping("/syntheseCompany")
	public ResponseEntity<List<SyntheseCompanyDto>> getNbsFlightsByCompany(
			@RequestBody SynthesisCriteria synthesisCriteria) {
		List<SyntheseCompanyDto> syntheseCompanyDtos = flightService.getNbsFlightsByCompany(synthesisCriteria);
		return new ResponseEntity<List<SyntheseCompanyDto>>(syntheseCompanyDtos, new HttpHeaders(), HttpStatus.OK);
	}

	@PostMapping("/register")
	public ResponseEntity<Account> addAccount(@Valid @RequestBody AccountDto accountDto) {
		Account account = accountService.addAccount(accountDto);
		return new ResponseEntity<Account>(account, new HttpHeaders(), HttpStatus.OK);
	}

	@PostMapping("/authenticate")
	public ResponseEntity<LogResponseDto> authenticate(@RequestBody LoginDto loginDto) throws Exception {
		try {
			authenticationManager.authenticate(   
					new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword()));
		} catch (BadCredentialsException e) {
			throw new Exception("Incorrect username or password", e);
		}
		UserDetails userDetails = accountService.loadUserByUsername(loginDto.getUsername());
		String jwt = jwtTokenUtil.generateJwt(userDetails);
		return new ResponseEntity<LogResponseDto>(new LogResponseDto(jwt), new HttpHeaders(), HttpStatus.OK);
	}
  
	@GetMapping("/bookmarks")
	public ResponseEntity<List<Bookmark>> getBookmarkList(Principal principal) {
		List<Bookmark> bookmarks = bookmarkService.getBookmarkList(principal.getName());
		return new ResponseEntity<List<Bookmark>>(bookmarks, new HttpHeaders(), HttpStatus.OK);
	}

	@DeleteMapping("/deleteBookmark/{id}")
	public ResponseEntity<String> deleteBookmark(@PathVariable(value = "id") Long idBookmark,final HttpServletRequest request) {
        Locale currentLocale = LocaleContextHolder.getLocale();
		try {
			bookmarkService.deleteBookmark(idBookmark);
			return new ResponseEntity<String>(messages.getMessage("bookmark.del.msg",new Object[] {idBookmark},currentLocale), HttpStatus.OK);
		} catch (EmptyResultDataAccessException e) {
			return new ResponseEntity<String>(messages.getMessage("bookmark.exist.msg",new Object[] {idBookmark},currentLocale),HttpStatus.NOT_FOUND);
		}

	}

	@PostMapping("/addBookmark")
	public ResponseEntity<Bookmark> addBookmark(@RequestBody BookmarkDto bookmarkDto, Principal principal) {
		Account account = accountService.findByUsername(principal.getName());
		Bookmark bookmark = modelMapper.map(bookmarkDto, Bookmark.class);
		bookmark.setAccount(account);
		Bookmark addedBookmark = bookmarkService.addBookmark(bookmark);
		return new ResponseEntity<Bookmark>(addedBookmark, new HttpHeaders(), HttpStatus.OK);
	}

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException exception) {
		Map<String, String> errors = new HashMap<>();
		exception.getBindingResult().getAllErrors().forEach((error) -> {
			String field = "";
			if (error.getClass().getSimpleName().equals("ViolationObjectError")) {
				field = ((ObjectError) error).getObjectName();
			} else if (error.getClass().getSimpleName().equals("ViolationFieldError")) {
				field = ((FieldError) error).getField();
			}
			String message = error.getDefaultMessage();
			errors.put(field, message);
		});
		return errors;
	}

}
