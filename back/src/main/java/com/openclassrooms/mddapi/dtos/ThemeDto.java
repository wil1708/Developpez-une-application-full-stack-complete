package com.openclassrooms.mddapi.dtos;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class ThemeDto extends BaseEntityDto implements Serializable {

    private String title;

    private String description;

    private List<UserDto> usersDto;
}
