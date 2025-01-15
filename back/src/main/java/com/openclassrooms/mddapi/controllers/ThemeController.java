package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dtos.ThemeDto;
import com.openclassrooms.mddapi.entities.Theme;
import com.openclassrooms.mddapi.mapper.DtoMapper;
import com.openclassrooms.mddapi.services.ThemeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
