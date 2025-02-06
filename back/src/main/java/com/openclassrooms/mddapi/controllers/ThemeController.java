package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dtos.ThemeDto;
import com.openclassrooms.mddapi.entities.Theme;
import com.openclassrooms.mddapi.mapper.DtoMapper;
import com.openclassrooms.mddapi.services.ThemeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class ThemeController {

    @Autowired
    private ThemeService themeService;

    /**
     * Méthode de récupération de tous les thèmes
     * @return une liste de thèmes et un statut réponse 200
     */
    @GetMapping("/api/theme")
    public ResponseEntity<List<ThemeDto>> getAllThemes() {
        List<Theme> themes = themeService.findAllThemes();
        List<ThemeDto> themeDtos = themes.stream()
                .map(DtoMapper.INSTANCE::themeToThemeDto)
                .collect(Collectors.toList());
        return new ResponseEntity<>(themeDtos, HttpStatus.OK);
    }

    /**
     * Méthode d'abonnement d'un user à un thème
     * @param themeId
     * @param userId
     * @return un statut réponse 200
     */
    @PostMapping("/api/theme/{themeId}/user/{userId}")
    public ResponseEntity<Void> subscribeToTheme(@PathVariable Long themeId, @PathVariable Long userId) {
        themeService.addUserToTheme(themeId, userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Méthode de désabonnement d'un user à un thème
     * @param themeId
     * @param userId
     * @return un statut réponse 200
     */
    @DeleteMapping("/api/theme/{themeId}/user/{userId}")
    public ResponseEntity<Void> unsubscribeFromTheme(@PathVariable Long themeId, @PathVariable Long userId) {
        themeService.removeUserFromTheme(themeId, userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Méthode de récupération des thèmes auxquels un user est abonné
     * @param userId
     * @return un statut réponse 200
     */
    @GetMapping("/api/user/{userId}/themes")
    public ResponseEntity<List<ThemeDto>> getUserThemes(@PathVariable Long userId) {
        List<Theme> userThemes = themeService.findThemesByUserId(userId);
        List<ThemeDto> themeDtos = userThemes.stream() .map(DtoMapper.INSTANCE::themeToThemeDto) .collect(Collectors.toList());
        return new ResponseEntity<>(themeDtos, HttpStatus.OK);
    }
}
