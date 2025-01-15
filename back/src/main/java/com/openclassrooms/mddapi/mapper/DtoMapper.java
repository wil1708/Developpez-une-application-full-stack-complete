package com.openclassrooms.mddapi.mapper;

import com.openclassrooms.mddapi.dtos.ThemeDto;
import com.openclassrooms.mddapi.dtos.UserDto;
import com.openclassrooms.mddapi.entities.Theme;
import com.openclassrooms.mddapi.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;


@Mapper
public interface DtoMapper {
    DtoMapper INSTANCE = Mappers.getMapper(DtoMapper.class);

    UserDto userToUserDto(User user);
    ThemeDto themeToThemeDto(Theme theme);
}
