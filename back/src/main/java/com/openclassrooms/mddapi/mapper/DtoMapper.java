package com.openclassrooms.mddapi.mapper;

import com.openclassrooms.mddapi.dtos.ArticleDto;
import com.openclassrooms.mddapi.dtos.ThemeDto;
import com.openclassrooms.mddapi.dtos.UserDto;
import com.openclassrooms.mddapi.entities.Article;
import com.openclassrooms.mddapi.entities.Theme;
import com.openclassrooms.mddapi.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;


@Mapper
public interface DtoMapper {
    DtoMapper INSTANCE = Mappers.getMapper(DtoMapper.class);

    UserDto userToUserDto(User user);
    ThemeDto themeToThemeDto(Theme theme);

    @Mapping(source = "user.name", target = "name")
    @Mapping(source = "theme.id", target = "theme_id")
    ArticleDto articleToArticleDto(Article article);
}
