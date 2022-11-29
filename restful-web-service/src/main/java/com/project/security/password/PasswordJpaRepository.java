package com.project.security.password;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.project.security.user.User;

@CrossOrigin(origins="http://localhost:4200")
@Repository
public interface PasswordJpaRepository extends JpaRepository<Password, Long>{
	List<Password> findAllByUserUsername(String username);
}
