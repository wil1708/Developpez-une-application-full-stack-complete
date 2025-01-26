package com.openclassrooms.mddapi.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.time.LocalDate;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Article extends BaseEntity implements Serializable {

    private String title;

    private LocalDate createdAt;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String description;

    @ManyToOne
    private User user;

    @ManyToOne
    private Theme theme;
}
