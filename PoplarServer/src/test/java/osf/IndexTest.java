package osf;

import static org.junit.Assert.*;

import java.io.IOException;
import java.util.List;

import org.apache.lucene.analysis.Analyzer;
import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.wltea.analyzer.lucene.IKAnalyzer;

import com.lvwang.osf.model.Event;
import com.lvwang.osf.search.EventIndexService;
import com.lvwang.osf.search.IndexHolder;
import com.lvwang.osf.service.PostService;

public class IndexTest {

	@Test
	public void test() {
		ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("classpath:/spring/app-config.xml");
		PostService postService = (PostService)context.getBean("postService");
		EventIndexService eventIndexService = (EventIndexService)context.getBean("eventIndexService");
		Event event = new Event();
		event.setId(1);
		event.setTitle("indexer创建完索引后没有关闭（提交）导致索引没有完整创建，导致搜索报错");
		event.setContent("indexer创建完索引后没有关闭（提交）导致索引没有完整创建，导致搜索报错");
		eventIndexService.add(event);
		
		
//		List<Event> events = eventIndexService.findByTitleOrContent("关闭报错");
//		if(events != null && events.size() !=0) {
//			for(Event e : events) {
//				System.out.println(e.getId());
//			}
//		}
		
		//
		event.setId(2);
		eventIndexService.add(event);
		List<Event> events = eventIndexService.findByTitleOrContent("创建索引");
		if(events != null && events.size() !=0) {
			for(Event e : events) {
				System.out.println(e.getId());
			}
		}
		
		
		try {
			IndexHolder.getIndexWriter().close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.print("index ");
		//fail("Not yet implemented");
	}

}
