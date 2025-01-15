package com.openclassrooms.mddapi.repositories;

import com.openclassrooms.mddapi.entities.Theme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import java.util.List;

public interface ThemeRepository extends JpaRepository<Theme, Long> {

    @NonNull
    public List<Theme> findAll();

}
