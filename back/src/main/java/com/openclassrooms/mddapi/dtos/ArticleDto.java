package com.openclassrooms.mddapi.dtos;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.time.LocalDate;

@EqualsAndHashCode(callSuper = true)
@Data
public class ArticleDto extends BaseEntityDto implements Serializable {

    private String title;

    private LocalDate createdAt;

    private String description;

    private String user;

    private String theme;
}
