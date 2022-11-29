package com.project.security.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.project.security.user.User;
import com.project.security.user.UserJpaRepository;

@Service
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
	private UserJpaRepository userJpaRepository;
	
	@Override
  	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userJpaRepository.findByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException(username);
		}
		return JwtUserDetails.build(user);
	}

}


