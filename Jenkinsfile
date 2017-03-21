node ("master") {
	
stage 'Checkout' 
       
	   def mvnHome = tool 'M3'
	   dir('test-app') {
	   git url: 'https://github.com/poojabansal607/test-app.git' 
		 
	   sh "${mvnHome}/bin/mvn clean install"
	   step([$class: 'ArtifactArchiver', artifacts: '**/target/*.jar', fingerprint: true])}
	  // Email for build 
	    emailext body: '''Hi,
		Build is successful.
		Regards,
		Pooja''', compressLog: true, recipientProviders: [[$class: 'DevelopersRecipientProvider']], subject: 'Build is successful', to: 'pooja.bansal@sapient.com' 	   
	   
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
