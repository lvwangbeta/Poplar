package com.lvwang.osf.util;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.lvwang.osf.model.Photo;
import com.qiniu.common.QiniuException;
import com.qiniu.storage.BucketManager;
import com.qiniu.storage.UploadManager;
import com.qiniu.util.Auth;
import com.qiniu.util.StringMap;

public class AlbumHelper {

	private static final String AK = "1mAeoCNoX25n_QiPGK-aS8895kQ4RedWWYb6LCpK";
	private static final String SK = "kJBUkzruYDjmnmx8UDsjMHD2OEw5SzTi36WP2BD4";
	private static final String bucket = "osfimg";
	private Auth auth = Auth.create(AK, SK);
	private BucketManager bucketManager = new BucketManager(auth);
	
	public String uploadPhoto(MultipartFile img, Photo details) {
		UploadManager uploadManager = new UploadManager();
		try {
			uploadManager.put(img.getBytes(), details.getKey(), getUpToken());
		} catch (QiniuException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return details.getKey();
		
//		ObjectMetadata meta = new ObjectMetadata();
//		meta.setContentLength(img.getSize());
//		
//		try {
//			//上传到图片服务器
//			PutObjectResult result = client.putObject(bucket, details.getKey(), img.getInputStream(), meta);
//			return result.getETag();
//
//		} catch (OSSException e) {
//			e.printStackTrace();
//		} catch (ClientException e) {
//			e.printStackTrace();
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		return null;				
	}
	public String uploadPhoto(byte[] img, String key){
		
		UploadManager uploadManager = new UploadManager();
		try {
			uploadManager.put(img, key, getUpToken());
		} catch (QiniuException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return key;
		
//		ObjectMetadata meta = new ObjectMetadata();
//		try {
//			meta.setContentLength(img.available());
//			
//			//上传到图片服务器
//			PutObjectResult result = client.putObject(bucket, key, img, meta);
//			return result.getETag();
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		return null;
	}
	
	private String getUpToken(){
	    return auth.uploadToken(bucket, null, 3600, new StringMap().
	    		putNotEmpty("returnBody", "{\"key\": $(key), \"hash\": $(etag), \"width\": $(imageInfo.width), \"height\": $(imageInfo.height)}"));
	}
	
	public void delPhotoInBucket(String key){
		//client.deleteObject(bucket, key);
		try {
			bucketManager.delete(bucket, key);
		} catch (QiniuException e) {
			e.printStackTrace();
		}
	}
}
