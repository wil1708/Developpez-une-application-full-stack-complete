package com.openclassrooms.mddapi.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Theme extends BaseEntity implements Serializable {

    private String title;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String description;

    @ManyToMany(mappedBy = "themes")
    private Set<User> users;

}
