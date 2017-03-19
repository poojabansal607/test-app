node ("master") {

stage 'Checkout 1' 
       
	  // def mvnHome = tool 'M3'
	  // dir('test-app') {
	  // git url: 'https://github.com/poojabansal607/test-app.git' 
		 
	  // sh "${mvnHome}/bin/mvn clean install"
	  // step([$class: 'ArtifactArchiver', artifacts: '**/target/*.jar', fingerprint: true])}
	   
stage 'Checkout 2'	   
	 //  dir('control-repo') {
	 //  git url: 'https://github.com/poojabansal607/control-repo.git'
	   
	  // sh "${mvnHome}/bin/mvn clean install"
	  // step([$class: 'ArtifactArchiver', artifacts: '**/target/*.jar', fingerprint: true])}
	   
stage 'puppet Master'	
	
	 def username = 'root'
     def password = 'devop@123'
	 def Ip="del2vmpldevop02.sapient.com"
	 def var1 = '/var/lib/jenkins/jobs/gs-rest-service-cors/lastSuccessful/archive/target'
	 def var2 = '/etc/puppetlabs/puppet/deploy_files/gs-service/target'
	   
	   
	sh  "spawn scp -r ${var1}/gs-rest-service-cors-0.1.0.jar $username@$Ip:${var2}"
    sh  "expect password:"
    sh  "send "devop@123\r"
    sh  "expect "*\r"
    sh  "expect "\r"
	// sh "sshpass -p $password scp ${var1}/gs-rest-service-cors-0.1.0.jar $username@$Ip:${var2}"
	   
	   
	  
	   //sh "scp ${var1}/gs-rest-service-cors-0.1.0.jar root:devop@123@del2vmpldevop02.sapient.com:${var2}"
	   
//sh "scp /var/lib/jenkins/jobs/gs-rest-service-cors/lastSuccessful/archive/target/gs-rest-service-cors-0.1.0.jar //root@del2vmpldevop02.sapient.com:/etc/puppetlabs/puppet/deploy_files/gs-service/target"
	  
	  // sh "cp /var/lib/jenkins/jobs/gs-rest-service-cors/builds/lastSuccessfulBuild/archive/target/ /tmp"
		

	}


