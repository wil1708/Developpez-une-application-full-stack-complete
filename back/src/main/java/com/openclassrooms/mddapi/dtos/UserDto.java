package com.openclassrooms.mddapi.dtos;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

@EqualsAndHashCode(callSuper = true)
@Data
public class UserDto extends BaseEntityDto implements Serializable {

    private String name;

    private String email;

}
