package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dtos.CommentDto;
import com.openclassrooms.mddapi.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("/article/{articleId}")
    public List<CommentDto> getCommentsByArticleId(@PathVariable Long articleId) {
        return commentService.getCommentsByArticleId(articleId);
    }
}
