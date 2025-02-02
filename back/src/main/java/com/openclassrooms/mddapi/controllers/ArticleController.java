package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dtos.ArticleDto;
import com.openclassrooms.mddapi.entities.Article;
import com.openclassrooms.mddapi.entities.Theme;
import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.services.ArticleService;
import com.openclassrooms.mddapi.services.ThemeService;
import com.openclassrooms.mddapi.services.UserService;
import com.openclassrooms.mddapi.mapper.DtoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @Autowired
    private ThemeService themeService;

    @Autowired
    private UserService userService;

    @PostMapping("/api/articles/theme/{themeId}/user/{userId}")
    public ResponseEntity<ArticleDto> createArticle(@PathVariable Long themeId, @PathVariable Long userId, @RequestBody ArticleDto articleDto) {
        Theme theme = themeService.findThemeById(themeId);
        User user = userService.findUserById(userId);

        Article article = new Article();
        article.setTitle(articleDto.getTitle());
        article.setCreatedAt(LocalDate.now());
        article.setDescription(articleDto.getDescription());
        article.setTheme(theme);
        article.setUser(user);

        Article savedArticle = articleService.saveArticle(article);
        ArticleDto savedArticleDto = DtoMapper.INSTANCE.articleToArticleDto(savedArticle);

        return new ResponseEntity<>(savedArticleDto, HttpStatus.CREATED);
    }

    @GetMapping("/api/user/{userId}/articles")
    public ResponseEntity<List<ArticleDto>> getUserArticles(@PathVariable Long userId) {
        List<Theme> userThemes = themeService.findThemesByUserId(userId);
        List<Article> userArticles = userThemes.stream()
                .flatMap(theme -> articleService.findArticlesByThemeId(theme.getId()).stream())
                .sorted((a1, a2) -> a2.getCreatedAt().compareTo(a1.getCreatedAt()))
                .collect(Collectors.toList());
        List<ArticleDto> articleDtos = userArticles.stream()
                .map(DtoMapper.INSTANCE::articleToArticleDto)
                .collect(Collectors.toList());
        return new ResponseEntity<>(articleDtos, HttpStatus.OK);
    }
}
