package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dtos.UserDto;
import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.mapper.DtoMapper;
import com.openclassrooms.mddapi.repositories.UserRepository;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Optional;

@Transactional
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JWTService jwtService;

    @Override
    public void save(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    @Override
    public Optional<User> findUserById(long id) {
        return Optional.ofNullable(userRepository.findById(id));
    }

    @Override
    public Optional<User> findUserByUsername(String username) {
        return Optional.ofNullable(userRepository.findByEmail(username));
    }

    @Override
    public ArrayList<User> findAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public UserDto findUserByToken(String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        Claims claims = jwtService.parseToken(token);
        String username = claims.getSubject();
        Optional<User> userOptional = findUserByUsername(username);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return DtoMapper.INSTANCE.userToUserDto(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    @Override
    public Optional<User> updateUser(Long id, UserDto userDto) {
        return userRepository.findById(id).map(user -> {
            if (userDto.getName() != null) {
                user.setName(userDto.getName());
            }
            if (userDto.getEmail() != null) {
                user.setEmail(userDto.getEmail());
            }
            userRepository.save(user);
            return user;
        });
    }
}
