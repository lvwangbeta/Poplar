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

import com.lvwang.osf.model.User;

@Service("userIndexService")
public class UserIndexService implements IndexService<User>{

	public void add(User user) {
		Document doc = new Document();
		doc.add(new LongField("user_id", user.getId(), Field.Store.YES));
		doc.add(new TextField("user_name", user.getUser_name(), Field.Store.NO));
		
		try {
			IndexHolder.getIndexWriter().addDocument(doc);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public List<Integer> findUserByName(String username) {
		List<Integer> users = new ArrayList<Integer>();
//		Analyzer analyzer=new StandardAnalyzer();
		Analyzer analyzer = new IKAnalyzer();
		QueryParser parser = new QueryParser("user_name", analyzer);
		Query query;
		try {
			query = parser.parse(username);
			IndexSearcher searcher = IndexHolder.getIndexSearcher();
			TopDocs docs = searcher.search(query, 10);
			ScoreDoc[] sds =docs.scoreDocs;
			for(ScoreDoc sd: sds){
				Document doc = searcher.doc(sd.doc);
				users.add(Integer.valueOf(doc.get("user_id")));
			}
		} catch (ParseException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return users;
	}

}
