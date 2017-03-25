node ("master") {
	
stage 'Checkout' 
       
	   def mvnHome = tool 'M3'
	   dir('gs-service') {
	   git url: 'https://github.com/poojabansal607/test-app.git' 
		 
	   sh "${mvnHome}/bin/mvn clean install"
	   step([$class: 'ArtifactArchiver', artifacts: '**/target/*.jar', fingerprint: true])}
	   sh "cp -r /var/lib/jenkins/jobs/test-app-1/workspace/test-app/ /var/gs-service/"
	   
       sh "cp /var/lib/jenkins/jobs/test-app-1/lastSuccessful/archive/target/gs-rest-service-cors-0.1.0.jar /var/gs-service/gs-service/target/"
	   
	   sh "sshpass -p devop@123 scp -r /var/gs-service/gs-service/ root@del2vmpldevop02.sapient.com:/etc/puppetlabs/puppet/deploy_files/"
	   // Email for build 
		//mail (to: 'pbansal13@sapient.com',
         //subject: "Job '${env.JOB_NAME}' (${env.BUILD_NUMBER}) has been build",
         //body: "Please go to ${env.BUILD_URL}.");  
		//echo "email sent"
	   
stage 'Build'	   
	   dir('assessment') {
	   git url: 'https://github.com/poojabansal607/control-repo.git'
	   
	   sh "${mvnHome}/bin/mvn clean install"
	   step([$class: 'ArtifactArchiver', artifacts: '**/target/*.jar', fingerprint: true])}
	   sh "cp -r /var/lib/jenkins/jobs/test-app-1/workspace/control-repo /var/assessment/"
       sh "cp /var/lib/jenkins/jobs/test-app-1/lastSuccessful/archive/target/assessment-1.0-SNAPSHOT.jar /var/assessment/assessment/target/"
	   sh "sshpass -p devop@123 scp -r /var/assessment/assessment/ root@del2vmpldevop02.sapient.com:/etc/puppetlabs/puppet/deploy_files/"

	 
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
		puppet.job 'production', nodes: ['del2vmpldevop03.sapient.com']
		
		mail (to: 'pbansal13@sapient.com',
        subject: "Job '${env.JOB_NAME}' (${env.BUILD_NUMBER}) has been successfully Deployed ON PROD",
        body: "Please go to ${env.BUILD_URL}.");  
		echo "email sent"
	   

	}
