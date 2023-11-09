/**
 * 
 */
package flight.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import flight.service.AccountService;
import flight.util.JwtTokenUtil;
import io.jsonwebtoken.ExpiredJwtException;

/**
 * @author BestTutorials
 *
 */
@Service
public class JwtFilter extends OncePerRequestFilter {

	@Autowired
	JwtTokenUtil jwtTokenUtil;

	@Autowired
	AccountService accountService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {
		// Authorization: Bearer <token>
		String JwtHeader = request.getHeader("Authorization");

		String username = null;
		String token = null;

		if (JwtHeader != null && JwtHeader.startsWith("Bearer")) {
			token = JwtHeader.substring(7);
			try {
				username = jwtTokenUtil.getUsernameFromJwt(token);
			} catch (ExpiredJwtException e) {
				System.out.println("Token expired");
			}
		} else {
			System.out.println("Authorization header must begin with Bearer String");
		}
		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			UserDetails userDetails = accountService.loadUserByUsername(username);
			if (jwtTokenUtil.validateJwt(token, userDetails)) {
				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
						userDetails, null,userDetails.getAuthorities());
				usernamePasswordAuthenticationToken
						.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
			}
		}
		chain.doFilter(request, response);
	}

}
