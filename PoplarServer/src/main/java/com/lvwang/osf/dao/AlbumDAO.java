package com.lvwang.osf.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.web.multipart.MultipartFile;

import com.lvwang.osf.model.Album;
import com.lvwang.osf.model.Photo;

public interface AlbumDAO {
	
	String TABLE_ALBUM = "osf_albums";
	String TABLE_PHOTO = "osf_photos";
	
	@Insert("insert into " + TABLE_ALBUM + 
			"(user_id, album_title, album_desc, status, cover) values(#{user_id},#{album_title},#{album_desc},#{status},#{cover})")
	@Options(useGeneratedKeys=true, keyProperty="id", keyColumn="id", flushCache=true)
	int saveAlbum(Album album);
	
	@Insert("insert into " + TABLE_PHOTO + "(`key`, album_id, `desc`) values(#{key},#{album_id},#{desc})")
	@Options(useGeneratedKeys=true, keyProperty="id", keyColumn="id", flushCache=true)
	int savePhoto(Photo photo);
	
	//return photo etag
	String uploadPhoto(MultipartFile img, Photo details);
	String uploadPhoto(byte[] img, String key);
	void delPhotoInBucket(String key);

	@Select("select `key` from " + TABLE_PHOTO + " where id=#{id}")
	String getKey(int id);
	
	@Select("select `key` from " + TABLE_PHOTO + " where FIND_IN_SET(id, #{ids}) <> 0")
	List<String> getKeys(@Param("ids")List<Integer> ids);
	
	@Select("select user_id from "+TABLE_ALBUM + " where id = #{id}")
	int getAlbumUser(int id);
	
	@Select("select id from " + TABLE_ALBUM + " where user_id=#{user_id} and status=#{status}")
	Integer getAlbumID(@Param("user_id")int user_id, @Param("status") int status);
	
	@Update("update " + TABLE_ALBUM + 
			" set album_desc=#{album_desc}, photos_count=#{photos_count}, status=#{status},cover=#{cover},album_tags=#{album_tags} where id=#{id}")
	int updateAlbumInfo(Album album);
	
	@Update("update "+ TABLE_ALBUM + " set album_desc=#{album_desc}, status=#{album_status} where id=#{album_id}")
	int updateAlbumDesc(@Param("album_id")int album_id, @Param("album_desc")String album_desc, @Param("album_status")int album_status);
	
	@Update("update " + TABLE_ALBUM + " set cover=#{cover} where id=#{album_id}")
	int updateAlbumCover(@Param("album_id")int album_id, @Param("cover")String cover);
	
	@Update("update " + TABLE_ALBUM + " set photos_count=#{count} where id=#{album_id}")
	int updatePhotosCount(@Param("album_id")int album_id, @Param("count")int count);
	
	@Update("update " + TABLE_PHOTO+ " set `desc`=#{photo_desc} where id=#{photo_id}")
	int updatePhotoDesc(@Param("photo_id")int photo_id, @Param("photo_desc")String photo_desc);
	
	@Select("select * from " + TABLE_ALBUM + " where id=#{id}")
	Album getAlbum(int id);
	
	@Select("select * from " + TABLE_ALBUM + " where user_id=#{id}")
	List<Album> getAlbumsOfUser(int id);
	
	@Select("select * from " + TABLE_PHOTO +" where album_id=#{album_id} order by ts asc")
	List<Photo> getPhotos(int album_id);
	
	@Select("select user_id from " + TABLE_ALBUM + " where id=#{id}")
	int getAuthorOfAlbum(int id);
	
	@Select("select * from " + TABLE_PHOTO + " t1," + TABLE_ALBUM + " t2 where t1.id=#{photo_id} and t1.album_id=t2.id")
	Album getAlbumContainPhoto(int photo_id);
	
	@Delete("delete from " + TABLE_PHOTO + " where id=?")
	void delPhoto(int id);
	
	
}
