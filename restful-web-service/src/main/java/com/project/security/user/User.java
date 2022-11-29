package com.project.security.user;

import java.util.List;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.springframework.web.bind.annotation.CrossOrigin;

import com.project.security.password.Password;

@CrossOrigin(origins="http://localhost:4200")
@Entity
@Table(name="users", uniqueConstraints = {@UniqueConstraint(columnNames = {"username"})})
public class User {
	
	@Id
	private String username;
	
	@Column
	private String password;
	
	@Column
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;
	
	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY, orphanRemoval = false)
	private List<Password> listPasswords;

	public User() {	}
	
	public User(String username, String password, List<Password> listPasswords) {
		super();
		this.username = username;
		this.password = password;
		this.listPasswords = listPasswords;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<Password> getListPasswords() {
		return listPasswords;
	}

	public void setListPasswords(List<Password> listPasswords) {
		this.listPasswords = listPasswords;
	}

	@Override
	public int hashCode() {
		return Objects.hash(username);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		return Objects.equals(username, other.username);
	}

	@Override
	public String toString() {
		return "User [username=" + username + ", password=" + password + ", listPasswords=" + listPasswords + "]";
	}
}
