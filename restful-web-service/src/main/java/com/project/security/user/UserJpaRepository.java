package com.project.security.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins="http://localhost:4200")
@Repository
public interface UserJpaRepository extends JpaRepository<User, String>{
	User findByUsername(String username);
	
	User deleteByUsername(String username);
	
	User findByUsernameAndPassword(String username, String password);
}
