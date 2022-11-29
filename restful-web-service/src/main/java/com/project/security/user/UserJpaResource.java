package com.project.security.user;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.project.security.password.Password;
import com.project.security.password.PasswordJpaRepository;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class UserJpaResource {

	@Autowired
	private UserJpaRepository userJpaRepo;
		
	@GetMapping(path="/jpa/users")
	public List<User> getAllUsers() {
		return userJpaRepo.findAll();
	}
	
	@GetMapping(path="/jpa/users/{username}")
	public User getUserByUsername(@PathVariable String username) {
		return userJpaRepo.findByUsername(username);
	}
	
	@GetMapping(path="/jpa/users/{username}/{password}")
	public User getUserByUsernameAndPassword(@PathVariable String username, @PathVariable String password) {		
		return userJpaRepo.findByUsernameAndPassword(username, password);
	}
	
	@DeleteMapping(path="/jpa/users/{username}")
	public ResponseEntity<Void> deleteUser(@PathVariable String username) {
		userJpaRepo.deleteByUsername(username);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(path="/jpa/users/{username}")
	public ResponseEntity<User> updateUser(@PathVariable String username, @RequestBody User user) {
		User updatedUser = userJpaRepo.save(user);
		
		return new ResponseEntity<User>(updatedUser, HttpStatus.OK);
	}
	
	@PostMapping(path="/jpa/users")
	public ResponseEntity<Void> saveUser(@PathVariable String username, @RequestBody User user) {
		User newUser = userJpaRepo.save(user);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{username}").buildAndExpand(newUser.getUsername()).toUri();
		return ResponseEntity.created(uri).build();
	}
}
