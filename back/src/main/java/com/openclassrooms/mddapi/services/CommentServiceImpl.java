package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dtos.CommentDto;
import com.openclassrooms.mddapi.entities.Comment;
import com.openclassrooms.mddapi.mapper.DtoMapper;
import com.openclassrooms.mddapi.repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Override
    public List<CommentDto> getCommentsByArticleId(Long articleId) {
        List<Comment> comments = commentRepository.findByArticleId(articleId);
        return comments.stream()
                .map(DtoMapper.INSTANCE::commentToCommentDto)
                .collect(Collectors.toList());
    }
}
