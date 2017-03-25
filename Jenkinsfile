node ("master") {
	
stage 'Checkout' 
       
	   def mvnHome = tool 'M3'
	   dir('test-app') {
	   git url: 'https://github.com/poojabansal607/test-app.git' 
		 
	   sh "${mvnHome}/bin/mvn clean install"
	   step([$class: 'ArtifactArchiver', artifacts: '**/target/*.jar', fingerprint: true])}
       sh "cp /var/lib/jenkins/jobs/test-app-1/lastSuccessful/archive/target/gs-rest-service-cors-0.1.0.jar /var/gs-service/"
	   sh "sshpass -p devop@123 scp -r /var/gs-service/gs-rest-service-cors-0.1.0.jar root@del2vmpldevop02.sapient.com:/etc/puppetlabs/puppet/deploy_files/gs-service/target/"
	   // Email for build 
		//mail (to: 'pbansal13@sapient.com',
         //subject: "Job '${env.JOB_NAME}' (${env.BUILD_NUMBER}) has been build",
         //body: "Please go to ${env.BUILD_URL}.");  
		//echo "email sent"
	   
stage 'Build'	   
	   dir('control-repo') {
	   git url: 'https://github.com/poojabansal607/control-repo.git'
	   
	   sh "${mvnHome}/bin/mvn clean install"
	   step([$class: 'ArtifactArchiver', artifacts: '**/target/*.jar', fingerprint: true])}
       sh "cp /var/lib/jenkins/jobs/test-app-1/lastSuccessful/archive/target/assessment-1.0-SNAPSHOT.jar /var/assessment/"
	   sh "sshpass -p devop@123 scp -r /var/assessment/assessment-1.0-SNAPSHOT.jar root@del2vmpldevop02.sapient.com:/etc/puppetlabs/puppet/deploy_files/assessment/target/"

	 
	  // Email for build 
		mail (to: 'pbansal13@sapient.com',
        subject: "Job '${env.JOB_NAME}' (${env.BUILD_NUMBER}) has been successfully build",
        body: "Please go to ${env.BUILD_URL}.");  
		echo "email sent"
		
		stage 'Deploy to PROD'
        puppet.credentials 'secret'
	    echo "connection is made with puppet"
	    puppet.codeDeploy 'production' 
	    echo "Code Deployed"
	   

	}
