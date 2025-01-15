package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.entities.Theme;

import java.util.List;

public interface ThemeService {
    List<Theme> findAllThemes();
}
