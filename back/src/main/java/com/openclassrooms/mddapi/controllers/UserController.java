package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dtos.UserDto;
import com.openclassrooms.mddapi.mapper.DtoMapper;
import com.openclassrooms.mddapi.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    /**
     * Méthode de récupération d'un User par son id
     * @param id
     * @return un statut réponse 200
     */
    @GetMapping("/api/user/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable Long id) {
        return userService.findUserById(id)
                .map(user -> {
                    UserDto userDto = DtoMapper.INSTANCE.userToUserDto(user);
                    return new ResponseEntity<>(userDto, HttpStatus.OK);
                })
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Méthode permettant de trouver l'identité d'un utilisateur en décodant un token
     * @param token
     * @return un statut réponse 200
     */
    @GetMapping("/api/auth/me")
    public ResponseEntity<UserDto> getUserByToken(@RequestHeader("Authorization") String token) {
        try {
            UserDto userDto = userService.findUserByToken(token);
            return ResponseEntity.status(HttpStatus.OK).body(userDto);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    /**
     * Méthode permettant de modifier le name ou email d'un utilisateur
     * @param token
     * @param id
     * @param userDto
     */
    @PatchMapping("/api/user/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long id, @RequestBody UserDto userDto, @RequestHeader("Authorization") String token) {
        try {
            UserDto authenticatedUser = userService.findUserByToken(token);
            if (authenticatedUser.getId() != id) {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }
            return userService.updateUser(id, userDto) .map(updatedUser -> {
                UserDto updatedUserDto = DtoMapper.INSTANCE.userToUserDto(updatedUser);
                return new ResponseEntity<>(updatedUserDto, HttpStatus.OK);
            })
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}
