package com.openclassrooms.mddapi.dtos;

import com.openclassrooms.mddapi.entities.Theme;
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

    private String name;

    private Theme theme_id;
}
