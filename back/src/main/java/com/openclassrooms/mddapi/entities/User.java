package com.openclassrooms.mddapi.entities;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class User extends BaseEntity implements Serializable {

    private String name;

    private String email;

    private String password;

}
