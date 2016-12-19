package com.lvwang.osf.util;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.regex.Pattern;

import org.apache.commons.codec.binary.Base64;


public class CipherUtil {
	
	private final static String[] hexDigits = {
		"0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
		"a", "b", "c", "d", "e", "f"
	};
	
	private final static int PWD_MIN_LEN = 8;
	private final static int PWD_MAX_LEN = 16;
	
	private final static Pattern hasUppercase = Pattern.compile("[A-Z]");
	private final static Pattern hasLowercase = Pattern.compile("[a-z]");
	private final static Pattern hasNumber = Pattern.compile("\\d");
	private final static Pattern hasSpecialChar = Pattern.compile("[^a-zA-Z0-9 ]");
	
	
	public static String generatePassword(String str) {
		return encodeByMD5(str);
		
	}
	
	public static boolean validatePassword(String password, String inputString) {
		if(password.equals(encodeByMD5(inputString)))
			return true;
		else
			return false;
	}
	
	public static String validatePasswordFormat(String password) {
		if(password.length() < PWD_MIN_LEN)
			return Property.ERROR_PWD_SHORT;
		if(password.length() > PWD_MAX_LEN)
			return Property.ERROR_PWD_LONG;
        if (!hasUppercase.matcher(password).find()) {
        	
        }

        if (!hasLowercase.matcher(password).find()) {

        }

        if (!hasNumber.matcher(password).find()) {

        }

        if (!hasSpecialChar.matcher(password).find()) {
        	
        }
        return Property.SUCCESS_PWD_FORMAT;
	}
	
	public static String generateActivationUrl(String email, String password) {
		MessageDigest md;
		try {
			md = MessageDigest.getInstance("MD5");
			byte[] results = md.digest(new String(email+password).getBytes("utf-8"));
			
			return Base64.encodeBase64String(results).replace('+', '-').replace('/', '_').substring(0, 24);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static String generateRandomLinkUseEmail(String email){
		MessageDigest md;
		try {
			md = MessageDigest.getInstance("MD5");
			byte[] results = md.digest(new String(email+System.currentTimeMillis()).getBytes("utf-8"));
			
			return Base64.encodeBase64String(results).replace('+', '-').replace('/', '_').substring(0, 24);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	private static String encodeByMD5(String originString) {
		if(originString != null && originString.length() != 0) {
			MessageDigest md;
			try {
				md = MessageDigest.getInstance("MD5");
				byte[] results = md.digest(originString.getBytes("utf-8"));
				String resultString = byteArrayToHexString(results);
				return resultString.toUpperCase();		
			} catch (NoSuchAlgorithmException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			
		}
		return null;
	}
	
	public static String sign(String str) {
		return encodeByMD5(str);
	}
	
	/*
	 * 转换字节数组为十六进制字符串
	 * @param	字节数字
	 * @return	十六进制字符串
	 */
	private static String byteArrayToHexString(byte[] bytes){
		StringBuffer sb = new StringBuffer();
		for(int i=0; i<bytes.length; i++) {
			sb.append(byteToHexString(bytes[i]));
		}
		return sb.toString();
	}
	
	private static String byteToHexString(byte b) {
		int n = b;
		if(n < 0) {
			n = 256 + n;
		}
		int d1 = n/16;
		int d2 = n%16;
		return hexDigits[d1] + hexDigits[d2];
	}
	
}
