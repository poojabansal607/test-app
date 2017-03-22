node ("master") {
	
stage 'Checkout' 
       
	   def mvnHome = tool 'M3'
	   dir('test-app') {
	   git url: 'https://github.com/poojabansal607/test-app.git' 
		 
	   sh "${mvnHome}/bin/mvn clean install"
	   step([$class: 'ArtifactArchiver', artifacts: '**/target/*.jar', fingerprint: true])}
       sh "scp /var/lib/jenkins/jobs/test-app-1/lastSuccessful/archive/target/gs-rest-service-cors-0.1.0.jar root@del2vmpldevop02.sapient.com:/etc/puppetlabs/puppet/test/"
	   
	  // Email for build 
	//	mail (to: 'pbansal13@sapient.com',
      //   subject: "Job '${env.JOB_NAME}' (${env.BUILD_NUMBER}) has been build",
       //  body: "Please go to ${env.BUILD_URL}.");  
		// echo "email sent"
	   

	}
