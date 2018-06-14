package com.lvwangbeta.poplar.common.intr;

import com.lvwangbeta.poplar.common.model.Follower;
import com.lvwangbeta.poplar.common.model.Following;
import com.lvwangbeta.poplar.common.model.User;

import java.util.List;
import java.util.Map;

public interface FollowService {
    boolean newFollowing(int user_id, String user_name, int following_user_id, String following_user_name);
    boolean undoFollow(int user_id, int following_user_id);
    long followersCount(int user_id);
    long followingsCount(int user_id);
    List<Integer> getFollowerIDs(int user_id);
    List<Integer> getFollowingIDs(int user_id);
    List<Follower> getFollowers(int user_id);
    List<Following> getFollowings(int user_id);
    boolean isFollowing(int user_a, int user_b);
    Map<Integer, Boolean> isFollowing(int user_id, List<User> users);
}
