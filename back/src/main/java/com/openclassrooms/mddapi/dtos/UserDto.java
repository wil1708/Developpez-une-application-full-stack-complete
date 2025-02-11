package com.openclassrooms.mddapi.dtos;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class UserDto extends BaseEntityDto implements Serializable {

    private String name;

    private String email;

    private List<ThemeDto> themesDto;

}
