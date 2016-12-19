package com.lvwang.osf.search;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.LongField;
import org.apache.lucene.document.TextField;
import org.apache.lucene.queryparser.classic.ParseException;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TopDocs;
import org.springframework.stereotype.Service;
import org.wltea.analyzer.lucene.IKAnalyzer;

import com.lvwang.osf.model.Tag;

@Service("tagIndexService")
public class TagIndexService implements IndexService<Tag>{

	public void add(Tag tag) {
		index(tag);
	}

	private void index(Tag tag) {
		Document doc = new Document();
		doc.add(new LongField("tag_id", tag.getId(), Field.Store.YES));
		doc.add(new TextField("tag_name", tag.getTag(), Field.Store.NO));
		
		try {
			IndexHolder.getIndexWriter().addDocument(doc);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public List<Integer> findTag(String tag_search_term) {
		List<Integer> tags = new ArrayList<Integer>();
		//Analyzer analyzer=new StandardAnalyzer();
		Analyzer analyzer = new IKAnalyzer();
		QueryParser parser = new QueryParser("tag_name", analyzer);
		Query query;
		try {
			query = parser.parse(tag_search_term);
			IndexSearcher searcher = IndexHolder.getIndexSearcher();
			TopDocs docs = searcher.search(query, 10);
			ScoreDoc[] sds =docs.scoreDocs;
			for(ScoreDoc sd: sds){
				Document doc = searcher.doc(sd.doc);
				tags.add(Integer.valueOf(doc.get("tag_id")));
			}
		} catch (ParseException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return tags;
	}
}
