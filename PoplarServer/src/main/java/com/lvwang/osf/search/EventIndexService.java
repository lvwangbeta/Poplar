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
import org.apache.lucene.queryparser.classic.MultiFieldQueryParser;
import org.apache.lucene.queryparser.classic.ParseException;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TopDocs;
import org.apache.lucene.search.TopScoreDocCollector;
import org.springframework.stereotype.Service;
import org.wltea.analyzer.lucene.IKAnalyzer;

import com.lvwang.osf.model.Album;
import com.lvwang.osf.model.Event;
import com.lvwang.osf.model.Post;
import com.lvwang.osf.model.ShortPost;
import com.lvwang.osf.util.Dic;

@Service("eventIndexService")
public class EventIndexService implements IndexService<Event>{

	public void add(Event event) {
		
		index(event);
	}

	public void add(Event e, Object origin_obj) {
		Event event = new Event();
		event.setId(e.getId());
		event.setTitle(e.getTitle());
		
		int object_type = e.getObject_type();
		if(Dic.OBJECT_TYPE_POST == object_type){
			event.setContent(((Post)origin_obj).getPost_content());
		} else if(Dic.OBJECT_TYPE_ALBUM == object_type){
			event.setTitle(((Album)origin_obj).getAlbum_desc());
			event.setContent(((Album)origin_obj).getAlbum_desc());
		} else if(Dic.OBJECT_TYPE_SHORTPOST == object_type){
			event.setTitle("");
			event.setContent(((ShortPost)origin_obj).getPost_content());
		}
		index(event);
		
	}
	
	private void index(Event event) {
		Document doc = new Document();
		doc.add(new LongField("event_id", event.getId(), Field.Store.YES));
		doc.add(new TextField("event_title", event.getTitle(), Field.Store.NO));
		doc.add(new TextField("event_content", event.getContent(), Field.Store.NO));
		
		try {
			IndexHolder.getIndexWriter().addDocument(doc);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public List<Integer> findByTitleOrContent(String searchTerm) {
		return findByTitleOrContent(searchTerm, 0, 10);
		
	}
	
	public List<Integer> findByTitleOrContent(String searchTerm, int start, int count) {
		List<Integer> events = new ArrayList<Integer>();
		//Analyzer analyzer=new StandardAnalyzer();
		Analyzer analyzer = new IKAnalyzer();
		QueryParser parser = new MultiFieldQueryParser(new String[]{"event_title", "event_content"}, analyzer);
		Query query;
		try {
			query = parser.parse(searchTerm);
			IndexSearcher searcher = IndexHolder.getIndexSearcher();
			TopScoreDocCollector topCollector = TopScoreDocCollector.create(100, false);
			searcher.search(query, topCollector);
			ScoreDoc[] sds = topCollector.topDocs(start, count).scoreDocs;
			for(ScoreDoc sd: sds){
				Document doc = searcher.doc(sd.doc);
				events.add(Integer.valueOf(doc.get("event_id")));
				System.out.println(doc.get("event_id"));
			}
		} catch (ParseException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return events;		
	}
	
}
