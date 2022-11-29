package com.project.security.password;

import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.web.bind.annotation.CrossOrigin;

import com.project.security.user.User;

@CrossOrigin(origins="http://localhost:4200")
@Entity
@Table(name="passwords") 
public class Password implements Comparable<Password> {
	
	@Id
	@GeneratedValue
	private Long id;
	
	@Column
	private String name;
	
	@Column
	private String url;
	
	@Column
	private String username;
	
	@Column
	private String password;
	
	@Column
	private String notes;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user.username")
	private User user;
    
    protected Password() {
    	
    }

	public Password(long id, String name, String url, String username, String password, String notes, User user) {
		super();
		this.id = id;
		this.name = name;
		this.url = url;
		this.username = username;
		this.password = password;
		this.notes = notes;
		this.user = user;
	}
    
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getUrl() {
		return url;
	}
	
	public void setUrl(String url) {
		this.url = url;
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
	
	public String getNotes() {
		return notes;
	}
	
	public void setNotes(String notes) {
		this.notes = notes;
	}

//	public User getUser() {
//		return user;
//	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Password other = (Password) obj;
		return id == other.id;
	}
	
	@Override
	public String toString() {
		return "Password [id=" + id + ", name=" + name + ", url=" + url + ", username=" + username + ", password=" + password + ", notes=" + notes + "]";
	}

	@Override
	public int compareTo(Password p) {
		if (this.getName() == null || p.getName() == null) {
			return 0;
		}
		return this.getName().compareTo(p.getName());
	}
}
