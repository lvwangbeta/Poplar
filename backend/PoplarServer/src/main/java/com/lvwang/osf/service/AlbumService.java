package com.lvwang.osf.service;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.imageio.ImageIO;

import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.lvwang.osf.dao.AlbumDAO;
import com.lvwang.osf.model.Album;
import com.lvwang.osf.model.Photo;
import com.lvwang.osf.model.Tag;
import com.lvwang.osf.model.User;
import com.lvwang.osf.util.Property;

@Service("albumService")
public class AlbumService {
	
	public static final int ALBUM_STAUS_NORMAL = 0;
	public static final int ALBUM_STAUS_TOBERELEASED = 1; //待发布
	
	
	public static String IMG_BASE_URL = Property.IMG_BASE_URL;
	
	
	@Autowired
	private AlbumDAO albumDao;
	
	@Autowired
	@Qualifier("userService")
	private UserService userService;
	
	@Autowired
	@Qualifier("tagService")
	private TagService tagService;
	
	@Autowired
	@Qualifier("relationService")
	private RelationService relationService;
	
	//图片格式校验
	public String validataImg(MultipartFile img) {
		
		return null;
	}
	
	public String getImgType(MultipartFile img) {
		String contentType = img.getContentType();
		return contentType.substring(contentType.indexOf('/')+1);
	}
	
	public Map<String, Object> newAlbum(int user_id, String title, String desc, int status, String cover) {
		Map<String, Object> map = new HashMap<String, Object>();
		Album album = new Album();
		album.setUser_id(user_id);
		album.setAlbum_title(title);
		album.setAlbum_desc(desc);
		album.setStatus(status);
		album.setCover(cover);
		int id = albumDao.saveAlbum(album);
		if(id != 0){
			album.setId(id);
			map.put("album", album);
			map.put("status", Property.SUCCESS_ALBUM_CREATE);
		} else {
			map.put("status", Property.ERROR_ALBUM_CREATE);
		}
		return map;
	}
	
	public void saveImgToLocal(MultipartFile img, String key){
		try {
			BufferedImage imgBuf = ImageIO.read(img.getInputStream());
			String classpath = AlbumService.class.getClassLoader().getResource("").getPath();
			ImageIO.write(imgBuf, getImgType(img), new File(classpath+"/tmp/"+key));
			
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public Map<String, Object> uploadPhoto(MultipartFile img) {
		Map<String, Object> map = new HashMap<String, Object>();
		Photo details = new Photo();
		String key = UUID.randomUUID().toString()+"."+getImgType(img);
		details.setKey(key);
		String etag = albumDao.uploadPhoto(img, details);
		if(etag == null || etag.length() ==0) {
			map.put("status", Property.ERROR_PHOTO_CREATE);
			return map;
		} else {	
			map.put("key", key);
			map.put("link", IMG_BASE_URL+key);
			map.put("status", Property.SUCCESS_PHOTO_CREATE);			
		}
		return map;
	}
	
	public Map<String, Object> newPhoto(int album_id, MultipartFile img, String desc) {
		Map<String, Object> map = new HashMap<String, Object>();
		Photo details = new Photo();
		String key = UUID.randomUUID().toString()+"."+getImgType(img);
		details.setKey(key);
		details.setAlbum_id(album_id);
		details.setDesc(desc);
		String etag = albumDao.uploadPhoto(img, details);
		if(etag == null || etag.length() ==0) {
			map.put("status", Property.ERROR_PHOTO_CREATE);
			return map;
		} else {		
			map.put("status", Property.SUCCESS_PHOTO_CREATE);			
		}
		int photo_id = albumDao.savePhoto(details);
		if(photo_id == 0) {
			map.put("status", Property.ERROR_PHOTO_CREATE);
			return map;
		} 
		details.setId(photo_id);
		map.put("photo", details);		
		return map;
	}
	
	public List<Tag> newPhotos(Album album) {
		//save tag
		Map<String, Object> tagsmap = tagService.newTags(album.getAlbum_tags_list());
		album.setAlbum_tags_list((List<Tag>)tagsmap.get("tags"));
		
		updateAlbumInfo(album);
		
		//save relation 
		for(Tag tag: (List<Tag>)tagsmap.get("tags")) {
			relationService.newRelation(
					 		RelationService.RELATION_TYPE_ALBUM, 
					 		album.getId(), 
					 		tag.getId()
					 		);
		}
		List<Photo> photos = album.getPhotos();
		for(Photo photo : photos) {
			photo.setAlbum_id(album.getId());
			photo.setId(albumDao.savePhoto(photo));
		}
		
		return (List<Tag>)tagsmap.get("tags");
		
	}
	
	
	public String checkUserOfAlbum(int album_id, int user_id) {
		int id = albumDao.getAlbumUser(album_id);
		if(id != user_id) {
			return Property.ERROR_ALBUM_PERMISSIONDENIED;
		} else {
			return Property.SUCCESS_ALBUM_ALLOWED;
		}
	}
	
	//获取用户的待发布相册
	public Integer getToBeReleasedAlbum(int user_id) {
		return albumDao.getAlbumID(user_id, ALBUM_STAUS_TOBERELEASED);
	}
	
	
	public List<Photo> getPhotosOfAlbum(int album_id) {
		return albumDao.getPhotos(album_id);
	}
	
	public String updateAlbumDesc(int album_id, String album_desc) {
		int effRows = albumDao.updateAlbumDesc(album_id, album_desc, ALBUM_STAUS_NORMAL);
		if(effRows==1) {
			return Property.SUCCESS_ALBUM_UPDATE;
		} else {
			return Property.ERROR_ALBUM_UPDDESC;
		}
	}
	
	public String updatePhotoDesc(List<Photo> photos) {
		for(Photo photo: photos) {
			albumDao.updatePhotoDesc(photo.getId(), photo.getDesc());
		}
		return Property.SUCCESS_ALBUM_UPDATE;
	}
	
	public String updateAlbumCover(int album_id, String cover) {
		int effRows = albumDao.updateAlbumCover(album_id, cover);
		if(effRows==1) {
			return Property.SUCCESS_ALBUM_UPDATE;
		} else {
			return Property.ERROR_ALBUM_UPDCOVER;
		}
	}
	
	public String updatePhotosCount(int album_id, int count) {
		int effRows = albumDao.updatePhotosCount(album_id, count);
		if(effRows==1) {
			return Property.SUCCESS_ALBUM_UPDATE;
		} else {
			return Property.ERROR_ALBUM_UPDCOVER;
		}
	}
	
	public String updateAlbumInfo(Album album) {
		albumDao.updateAlbumInfo(album);
		return Property.SUCCESS_ALBUM_UPDATE; 
	}
	
	public List<Tag> updateAlbum(Album album) {
		
		
		//save tag
		Map<String, Object> tagsmap = tagService.newTags(album.getAlbum_tags_list());
		album.setAlbum_tags_list((List<Tag>)tagsmap.get("tags"));
		
		updateAlbumInfo(album);
		updatePhotoDesc(album.getPhotos());
		
		//save relation 
		for(Tag tag: (List<Tag>)tagsmap.get("tags")) {
			relationService.newRelation(
					 		RelationService.RELATION_TYPE_ALBUM, 
					 		album.getId(), 
					 		tag.getId()
					 		);
		}
		return (List<Tag>)tagsmap.get("tags");
	}
	
	public List<Album> getAlbumsOfUser(int id) {
		return albumDao.getAlbumsOfUser(id);
	}
	
	public Album getAlbum(int id) {
		Album album = albumDao.getAlbum(id);
		List<Photo> photos = getPhotosOfAlbum(id);
		album.setPhotos(photos);
		return album;
	}
	
	public String getKeyofPhoto(int id) {
		return albumDao.getKey(id);
	}
	
	public User getAuthorOfALbum(int id) {
		int user_id = albumDao.getAuthorOfAlbum(id);
		return userService.findById(user_id);
	}
	public User getAuthorOfPhoto(int id){
		Album album = albumDao.getAlbumContainPhoto(id);
		User user = new User();
		if(album != null){
			user.setId(album.getUser_id());
		}
		return user;
	}
	
	public String cropAvatar(String key, int x, int y, int width, int height) {
		String classpath = AlbumService.class.getClassLoader().getResource("").getPath();
		try {
			File ori_img = new File(classpath+"/tmp/"+key);
			
			BufferedImage croped_img = Thumbnails.of(ImageIO.read(ori_img))
									  .sourceRegion(x, y, width, height)
									  .size(200, 200).asBufferedImage();
			String img_type = key.split("\\.")[1];
			//convert bufferedimage to inputstream
			ByteArrayOutputStream bos = new ByteArrayOutputStream();  
			ImageIO.write(croped_img, img_type, bos);  
			
			albumDao.delPhotoInBucket(key);
			
			String new_key = UUID.randomUUID().toString()+"."+img_type;
			if( albumDao.uploadPhoto(bos.toByteArray(), new_key) != null ){
				if(ori_img.exists()){
					ori_img.delete();
				}
				return new_key;
			} else {
				return key;
			}
			
		} catch (IOException e) {
			e.printStackTrace();
		}		
		return key;
	}
	
	public void deletePhoto(int id){
		albumDao.delPhoto(id);
	}

	
}
