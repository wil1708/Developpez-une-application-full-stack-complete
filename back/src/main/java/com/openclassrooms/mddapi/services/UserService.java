package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dtos.UserDto;
import com.openclassrooms.mddapi.entities.User;

import java.util.ArrayList;
import java.util.Optional;

public interface UserService {

    void save(User user);
    Optional<Optional<User>> findUserById(long id);

    Optional<User> findUserByUsername(String username);

    ArrayList<User> findAllUsers();

    UserDto findUserByToken(String token);
}
