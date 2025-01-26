package com.openclassrooms.mddapi.repositories;

import com.openclassrooms.mddapi.entities.Article;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findByThemeId(Long themeId);
}
