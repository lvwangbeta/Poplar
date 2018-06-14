package com.lvwangbeta.poplar.common.intr;

import com.lvwangbeta.poplar.common.model.Comment;
import com.lvwangbeta.poplar.common.model.Message;
import com.lvwangbeta.poplar.common.model.User;

import java.util.List;

public interface CommentService {
    Message newComment(Integer comment_object_type, Integer comment_object_id,
                   Integer comment_author, String comment_author_name,
                   String comment_content, Integer comment_parent,
                   int comment_parent_author, String comment_parent_author_name,
                   Message message);
    Comment findCommentByID(int id);
    List<Comment> getComments(String type, int id);
    List<Comment> getComments(String type, int id, int offset, int count);
    User getCommentAuthor(int comment_id);
    int getCommentsCount(int object_type, int object_id);

}
