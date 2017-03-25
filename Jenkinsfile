node ("master") {
	
stage 'Checkout' 
       
	   def mvnHome = tool 'M3'
	   dir('test-app') {
	   git url: 'https://github.com/poojabansal607/test-app.git' 
		 
	   sh "${mvnHome}/bin/mvn clean install"
	   step([$class: 'ArtifactArchiver', artifacts: '**/target/*.jar', fingerprint: true])}
       sh "cp -r /var/lib/jenkins/jobs/gs-rest-service-cors/lastSuccessful/archive/target/gs-rest-service-cors-0.1.0.jar /var/"
	   sh "scp /var/lib/jenkins/jobs/gs-rest-service-cors/lastSuccessful/archive/target/gs-rest-service-cors-0.1.0.jar root@del2vmpldevop02.sapient.com:/etc/puppetlabs/puppet/deploy_files/gs-service/target"
	  // Email for build 
	//	mail (to: 'pbansal13@sapient.com',
      //   subject: "Job '${env.JOB_NAME}' (${env.BUILD_NUMBER}) has been build",
       //  body: "Please go to ${env.BUILD_URL}.");  
		// echo "email sent"
		
	//	stage 'Deploy to QA'
      // puppet.credentials 'secret'
	   //echo "connection is made with puppet"
	   //puppet.codeDeploy 'production' 
	   //echo "Code Deployed"
	   

	}
