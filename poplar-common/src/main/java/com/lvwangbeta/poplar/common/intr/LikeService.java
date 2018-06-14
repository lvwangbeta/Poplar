package com.lvwangbeta.poplar.common.intr;

import java.util.List;

public interface LikeService {
    void like(int user_id, int object_type, int object_id);
    void undoLike(int user_id, int object_type, int object_id);
    boolean isLike(int user_id, int object_type, int object_id);
    long likersCount(int object_type, int object_id);
    List<Integer> likers(int object_type, int object_id);
    int likeCount(int user_id);
}
