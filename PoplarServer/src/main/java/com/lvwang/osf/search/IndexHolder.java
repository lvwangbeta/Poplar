package com.lvwang.osf.search;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import javax.annotation.PreDestroy;

import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.apache.lucene.util.Version;
import org.springframework.stereotype.Component;
import org.wltea.analyzer.lucene.IKAnalyzer;



@Component
public class IndexHolder {

	private static String indexDir;
	private static IndexWriter indexWriter;
	private static IndexReader indexReader;
	private static IndexSearcher indexSearcher;
	
	static{
		String classpath = IndexHolder.class.getClassLoader().getResource("").getPath();
		Properties prop = new Properties();  
		
		try {
			InputStream in = new FileInputStream(classpath+"/spring/property.properties");  
			prop.load(in);
			indexDir = prop.getProperty("index.dir");
			System.out.println(indexDir);
			File index_dir = new File(indexDir);
			if(!index_dir.exists() && !index_dir.isDirectory()) {
				index_dir.mkdir();
			} 
			
			Directory dir = FSDirectory.open(index_dir);
			//Analyzer analyzer = new StandardAnalyzer();
			Analyzer analyzer = new IKAnalyzer();
			IndexWriterConfig iwc = new IndexWriterConfig(Version.LUCENE_4_10_4, analyzer);
			indexWriter = new IndexWriter(dir, iwc);
			indexWriter.commit();
			
			indexReader = DirectoryReader.open(FSDirectory.open(index_dir));
			indexSearcher = new IndexSearcher(indexReader);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static IndexWriter getIndexWriter() {
		if(indexWriter == null){
			synchronized (IndexHolder.class) {
				if(indexWriter == null){
					try {
						Directory dir = FSDirectory.open(new File(indexDir));
						//Analyzer analyzer = new StandardAnalyzer();
						Analyzer analyzer = new IKAnalyzer();
						IndexWriterConfig iwc = new IndexWriterConfig(Version.LUCENE_4_10_4, analyzer);
						indexWriter = new IndexWriter(dir, iwc);
						indexWriter.commit();
					} catch (IOException e) {
						e.printStackTrace();
					}

				}
			}
			return indexWriter;
		} else {
			return indexWriter;
		}
	}
	
	public static IndexSearcher getIndexSearcher() {
		if(indexSearcher == null){
			synchronized (IndexHolder.class) {
				if(indexSearcher == null){
					try {
						indexWriter.commit();
						indexReader = DirectoryReader.open(FSDirectory.open(new File(indexDir)));
					} catch (IOException e) {
						e.printStackTrace();
					}
					indexSearcher = new IndexSearcher(indexReader);
				}
			}
			return indexSearcher;
		} else {
			IndexReader newReader = null;
			try {
				newReader = DirectoryReader.openIfChanged((DirectoryReader)indexReader, indexWriter, false);
			} catch (IOException e1) {
				e1.printStackTrace();
			}
			if(newReader != null) {
				synchronized (IndexHolder.class) {
					if(indexReader != null) {
						try {
							indexReader.close();
							indexReader = newReader;
							indexSearcher = new IndexSearcher(indexReader);
						} catch (IOException e) {
							e.printStackTrace();
						}
					}
				}
			}
				
			return indexSearcher;
		}

	}
	
	@PreDestroy
	private static void destroy(){
		System.out.println("index writer and reader closing.......");
		try {
			indexWriter.close();
			indexReader.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}





