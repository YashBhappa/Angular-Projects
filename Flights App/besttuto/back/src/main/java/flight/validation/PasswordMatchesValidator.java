/**
 * 
 */
package flight.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import flight.dto.AccountDto;

/**
 * @author BestTutorials
 *
 */
public class PasswordMatchesValidator implements ConstraintValidator<PasswordMatches, Object> {

	@Override
	public boolean isValid(Object value, ConstraintValidatorContext context) {
		AccountDto accountDto =(AccountDto) value;
		return accountDto.getPassword().equals(accountDto.getConfpassword());
	}

}
