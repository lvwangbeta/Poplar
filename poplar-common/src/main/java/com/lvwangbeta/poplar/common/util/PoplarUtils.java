package com.lvwangbeta.poplar.common.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class PoplarUtils {

	public static List<Integer> toList(Set<Integer> set){
		if(set == null){
			return new ArrayList<Integer>();
		}
		
		List<Integer> list = new ArrayList<Integer>();
		for(Integer ele : set){
			list.add(ele);
		}
		return list;
	}
}
