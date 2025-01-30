package com.openclassrooms.mddapi.dtos;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
public class CommentDto extends BaseEntityDto implements Serializable {

    private String content;

    private LocalDateTime createdAt;

    private ArticleDto articleDto;

    private UserDto userDto;
}
