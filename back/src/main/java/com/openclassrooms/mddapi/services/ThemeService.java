package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.entities.Theme;

import java.util.List;

public interface ThemeService {
    List<Theme> findAllThemes();
    void addUserToTheme(Long themeId, Long userId);
    List<Theme> findThemesByUserId(Long userId);
    void removeUserFromTheme(Long themeId, Long userId);  // Nouvelle méthode
}
