package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.entities.Theme;
import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.repositories.ThemeRepository;
import com.openclassrooms.mddapi.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ThemeServiceImpl implements ThemeService {

    @Autowired
    private ThemeRepository themeRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Theme> findAllThemes() {
        return themeRepository.findAll();
    }

    @Override
    public void addUserToTheme(Long themeId, Long userId) {
        Theme theme = themeRepository.findById(themeId).orElseThrow(() -> new RuntimeException("Theme not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        theme.getUsers().add(user);
        user.getThemes().add(theme);
        themeRepository.save(theme);
    }

    @Override
    public List<Theme> findThemesByUserId(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return user.getThemes().stream().collect(Collectors.toList());
    }

    @Override
    public void removeUserFromTheme(Long themeId, Long userId) {
        Theme theme = themeRepository.findById(themeId).orElseThrow(() -> new RuntimeException("Theme not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        theme.getUsers().remove(user);
        user.getThemes().remove(theme);
        themeRepository.save(theme);
    }

    @Override
    public Theme findThemeById(Long id) {
        return themeRepository.findById(id).orElse(null);
    }
}
