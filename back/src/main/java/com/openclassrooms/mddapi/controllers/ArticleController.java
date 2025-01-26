package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dtos.ArticleDto;
import com.openclassrooms.mddapi.entities.Article;
import com.openclassrooms.mddapi.entities.Theme;
import com.openclassrooms.mddapi.services.ArticleService;
import com.openclassrooms.mddapi.services.ThemeService;
import com.openclassrooms.mddapi.mapper.DtoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @Autowired
    private ThemeService themeService;

    @GetMapping("/api/user/{userId}/articles")
    public ResponseEntity<List<ArticleDto>> getUserArticles(@PathVariable Long userId) {
        List<Theme> userThemes = themeService.findThemesByUserId(userId);
        List<Article> userArticles = userThemes.stream()
                .flatMap(theme -> articleService.findArticlesByThemeId(theme.getId()).stream())
                .sorted((a1, a2) -> a2.getCreatedAt().compareTo(a1.getCreatedAt()))
                .toList();
        List<ArticleDto> articleDtos = userArticles.stream()
                .map(DtoMapper.INSTANCE::articleToArticleDto)
                .collect(Collectors.toList());
        return new ResponseEntity<>(articleDtos, HttpStatus.OK);
    }
}
