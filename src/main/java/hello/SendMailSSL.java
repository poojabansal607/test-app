package hello;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class SendMailSSL {  
	 public void  main(String[] args) {  
	//change accordingly  
	  
	  //Get the session object  
	 Properties props = new Properties();
		props.put("mail.smtp.host", "inrelaymail.sapient.com");
		props.put("mail.smtp.socketFactory.port", "25");
	
		props.put("mail.smtp.starttls.enable","false");
		props.put("mail.transport.protocol","smtp");
		
		props.put("mail.smtp.port", "25");
		 props.put("mail.smtp.socketFactory.fallback", "true");
		 
		Session session = Session.getDefaultInstance(props,
				new javax.mail.Authenticator() {
					protected PasswordAuthentication getPasswordAuthentication() {
						return new PasswordAuthentication("skashyap@sapient.com","password");
					}
				});
	   
	  //compose message  
	  try {  
		  Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress("skashyap@sapient.com"));
			message.setRecipients(Message.RecipientType.TO,
				InternetAddress.parse("sagrawal26@sapient.com"));
			message.setSubject("Testing Subject");
			message.setText("Hello its Sapient mail java program");

			Transport.send(message);

			System.out.println("Done");
	   
	  } catch (MessagingException e) {throw new RuntimeException(e);}  
	   
	 }  
	}  