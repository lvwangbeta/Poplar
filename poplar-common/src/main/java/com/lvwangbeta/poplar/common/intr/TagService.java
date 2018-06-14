package com.lvwangbeta.poplar.common.intr;

import com.lvwangbeta.poplar.common.model.Tag;

import java.util.List;

public interface TagService {
    List<Tag> getRecommendTags(int user_id);
    Tag getTagByID(int id);
    List<Tag> getTagsByIDs(List<Integer> ids);
}
