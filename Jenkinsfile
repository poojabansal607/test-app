node ("master") {
	
stage 'Checkout' 
       
	   def mvnHome = tool 'M3'
	   dir('test-app') {
	   git url: 'https://github.com/poojabansal607/test-app.git' 
		 
	   sh "${mvnHome}/bin/mvn clean install"
	   step([$class: 'ArtifactArchiver', artifacts: '**/target/*.jar', fingerprint: true])}
	  // Email for build 
		mail (to: 'pbansal13@sapient.com',
         subject: "Job '${env.JOB_NAME}' (${env.BUILD_NUMBER}) is waiting for input",
         body: "Please go to ${env.BUILD_URL}.");  
		 echo "email sent"
	   
//stage 'Build'	   
	 //  dir('control-repo') {
	 //  git url: 'https://github.com/poojabansal607/control-repo.git'
	   
	  // sh "${mvnHome}/bin/mvn clean install"
	  // step([$class: 'ArtifactArchiver', artifacts: '**/target/*.jar', fingerprint: true])}
	   
//stage 'Deploy Assessment APP'
  //     puppet.credentials 'secret'
	//   echo "connection is made with puppet"
	 //  puppet.codeDeploy 'production' 
	  // echo "Code Deployed"		
       
//stage 'Deploy to PROD'
   //    sh "hostname"
     //  sh "puppet agent -t"	   
	  // echo "failed"
	}
