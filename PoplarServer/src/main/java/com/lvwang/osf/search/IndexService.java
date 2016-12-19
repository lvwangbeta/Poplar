package com.lvwang.osf.search;

public interface IndexService<T extends Searchable> {
	void add(T obj);
}
