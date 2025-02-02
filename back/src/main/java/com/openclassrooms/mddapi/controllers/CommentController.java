package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dtos.CommentDto;
import com.openclassrooms.mddapi.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/article/{articleId}/user/{userId}")
    public CommentDto addComment(@PathVariable Long articleId, @PathVariable Long userId, @RequestBody CommentDto commentDto) {
        String content = commentDto.getContent();
        return commentService.addComment(articleId, userId, content);
    }
}
