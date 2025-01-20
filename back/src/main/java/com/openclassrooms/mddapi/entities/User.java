package com.openclassrooms.mddapi.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.Set;

@EqualsAndHashCode(callSuper = true, exclude = "themes")
@Data
@Entity
public class User extends BaseEntity implements Serializable {

    private String name;

    private String email;

    private String password;

    @ManyToMany
    private Set<Theme> themes;

}
