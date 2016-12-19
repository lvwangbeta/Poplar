package com.lvwang.osf.service;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.antlr.stringtemplate.StringTemplate;
import org.antlr.stringtemplate.StringTemplateGroup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;


@Service("mailService")
public class MailService {
	
	static{
		String classpath = MailService.class.getClassLoader().getResource("").getPath();
		 
		Properties prop = new Properties();  
		try {
			InputStream in = new FileInputStream(classpath+"/spring/property.properties");  
			prop.load(in);
			IMG_BASE_URL = prop.getProperty("img_base_url");
			
			ACTIVATE_CONTEXT = "http://"+prop.getProperty("domain.name")
								+(prop.getProperty("domain.port")==null?null:":"+prop.getProperty("domain.port"))
								+(prop.getProperty("context")==null?null:prop.getProperty("context"))+
								"/account/activation/";
			
			RESETPWD_CONTEXT = "http://"+prop.getProperty("domain.name")
								+(prop.getProperty("domain.port")==null?null:":"+prop.getProperty("domain.port"))
								+(prop.getProperty("context")==null?null:prop.getProperty("context"))+
								"/account/resetpwd";
			
			MAIL_FROM = prop.getProperty("mail.from");
			
			templateGroup = new StringTemplateGroup("mailTemplates", classpath + "/mailTemplates");
			
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static String IMG_BASE_URL;
	public static String MAIL_FROM;
	public static String ACTIVATE_CONTEXT;
	public static String RESETPWD_CONTEXT;
	
	public static StringTemplateGroup templateGroup;
	
    @Autowired
    private JavaMailSenderImpl mailSender;
    
    private void sendMail(String to, String subject, String body) {
    	MimeMessage mail = mailSender.createMimeMessage();	
    	try {
    		MimeMessageHelper helper = new MimeMessageHelper(mail, true, "utf-8");
			helper.setFrom(MAIL_FROM);
			helper.setTo(to);
			helper.setSubject(subject);
			helper.setText(body, true);
			mailSender.send(mail);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
    	
    }
    
    /**
     * send activation mail to
     * @param to
     */
    public void sendAccountActivationEmail(String to, String key){
    	//String body = "<a href='"+ACTIVATE_CONTEXT+key+"?email="+to+"'>激活链接</a>";
    	StringTemplate activation_temp = templateGroup.getInstanceOf("activation");
    	activation_temp.setAttribute("img_base_url", IMG_BASE_URL);
    	activation_temp.setAttribute("email", to);
    	activation_temp.setAttribute("href", ACTIVATE_CONTEXT+key+"?email="+to);
    	activation_temp.setAttribute("link", ACTIVATE_CONTEXT+key+"?email="+to);
    	sendMail(to, "OSF账户激活", activation_temp.toString());
    }
    
    /**
     * send change password link to
     * @param to
     */
    public void sendResetPwdEmail(String to, String key){
    	
    	StringTemplate activation_temp = templateGroup.getInstanceOf("resetpwd");
    	activation_temp.setAttribute("img_base_url", IMG_BASE_URL);
    	activation_temp.setAttribute("href", RESETPWD_CONTEXT+"?key="+key+"&email="+to);
    	activation_temp.setAttribute("link", RESETPWD_CONTEXT+"?key="+key+"&email="+to);
    	
    	sendMail(to, "OSF账户密码重置", activation_temp.toString());
    }
}
