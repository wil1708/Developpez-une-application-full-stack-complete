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

    /**
     * Méthode de récupération des commentaires d'un article
     * @param articleId
     * @return une liste de commentaires
     */
    @GetMapping("/article/{articleId}")
    public List<CommentDto> getCommentsByArticleId(@PathVariable Long articleId) {
        return commentService.getCommentsByArticleId(articleId);
    }

    /**
     * Méthode d'ajout d'un commentaire à un article
     * @param articleId
     * @param userId
     * @param commentDto
     * @return un commentaire
     */
    @PostMapping("/article/{articleId}/user/{userId}")
    public CommentDto addComment(@PathVariable Long articleId, @PathVariable Long userId, @RequestBody CommentDto commentDto) {
        String content = commentDto.getContent();
        return commentService.addComment(articleId, userId, content);
    }
}
