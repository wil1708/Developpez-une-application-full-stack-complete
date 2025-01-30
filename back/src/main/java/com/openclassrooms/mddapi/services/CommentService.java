package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dtos.CommentDto;

import java.util.List;

public interface CommentService {
    List<CommentDto> getCommentsByArticleId(Long articleId);
}
