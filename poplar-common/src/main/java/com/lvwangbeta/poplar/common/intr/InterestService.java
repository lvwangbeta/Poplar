package com.lvwangbeta.poplar.common.intr;

import com.lvwangbeta.poplar.common.model.Tag;

import java.util.List;
import java.util.Map;

public interface InterestService {
    void interestInTag(int user_id, int tag_id);
    void undoInterestInTag(int user_id, int tag_id);
    List<Integer> getUsersInterestedInTag(int tag_id);
    boolean hasInterestInTag(int user_id, int tag_id);
    Map<Integer, Boolean> hasInterestInTags(int user_id, List<Tag> tags);
    List<Tag> getTagsUserInterestedIn(int user_id);

}
