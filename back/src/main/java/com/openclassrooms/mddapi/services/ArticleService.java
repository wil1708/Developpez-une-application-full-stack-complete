package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.entities.Article;

import java.util.List;

public interface ArticleService {
    List<Article> findAllArticles();
    List<Article> findArticlesByThemeId(Long themeId);
    Article saveArticle(Article article);
}
