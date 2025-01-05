package com.openclassrooms.mddapi.repositories;

import com.openclassrooms.mddapi.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import java.util.ArrayList;

public interface UserRepository extends JpaRepository<User, Long> {

    public User findByEmail(String name);
    @NonNull
    public ArrayList<User> findAll();
}
