package com.project.security.password;

import java.net.URI;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.project.security.user.User;
import com.project.security.user.UserJpaRepository;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class PasswordJpaResource {

	@Autowired
	private PasswordJpaRepository passJpaRepo;
	
	@Autowired
	private UserJpaRepository userJpaRepo;
	
	@GetMapping(path="/jpa/users/{username}/passwords")
	public List<Password> getAllPasswordsForUser(@PathVariable String username) {
		List<Password> passwords = passJpaRepo.findAllByUserUsername(username);
		Collections.sort(passwords);
		return passwords;
	}
	
	@GetMapping(path="/jpa/users/{username}/passwords/{id}")
	public Password getPasswordById(@PathVariable String username, @PathVariable long id) {
		return passJpaRepo.findById(id).get();
	}
	
	@DeleteMapping(path="/jpa/users/{username}/passwords/{id}")
	public ResponseEntity<Void> deletePassword(@PathVariable String username, @PathVariable long id) {
		passJpaRepo.deleteById(id);		
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(path="/jpa/users/{username}/passwords/{id}")
	public ResponseEntity<Password> updatePassword(@PathVariable String username, @PathVariable long id, @RequestBody Password password) {
		User user = userJpaRepo.findByUsername(username);
		
		password.setUser(user);
		
		Password updatedPassword = passJpaRepo.save(password);
		
		return new ResponseEntity<Password>(updatedPassword, HttpStatus.OK);
	}
	
	@PostMapping(path="/jpa/users/{username}/passwords")
	public ResponseEntity<Void> createPassword(@PathVariable String username, @RequestBody Password password) {
		User user = userJpaRepo.findByUsername(username);
		
		password.setUser(user);
		
		Password newPassword = passJpaRepo.save(password);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(newPassword.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}
}
