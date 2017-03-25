node ("master") {
	
stage 'Checkout' 
       
	   def mvnHome = tool 'M3'
	   dir('test-app') {
	   git url: 'https://github.com/poojabansal607/test-app.git' 
		 
	   sh "${mvnHome}/bin/mvn clean install"
	   step([$class: 'ArtifactArchiver', artifacts: '**/target/*.jar', fingerprint: true])}
       sh "cp /var/lib/jenkins/jobs/gs-rest-service-cors/lastSuccessful/archive/target/gs-rest-service-cors-0.1.0.jar /var/"
	   sh '''#!/bin/bash -l
       echo $0
	   echo "pooja"
	   #rsync -avzp /var/gs-rest-service-cors-0.1.0.jar -e ssh -oStrictHostKeyChecking=no host  root@del2vmpldevop02.sapient.com:/var/
	   
	   
	   scp /var/gs-rest-service-cors-0.1.0.jar root@del2vmpldevop02.sapient.com:/etc/puppetlabs/puppet/deploy_files/gs-service/target/
       #moar stuff I needed to do
       #like use rvm, which doesn't work with shell, it needs bash.
       '''
	   //sh "rsync -avzp /var/gs-rest-service-cors-0.1.0.jar -e ssh -oStrictHostKeyChecking=no host  root@del2vmpldevop02.sapient.com:/var/"
	   //sh "scp /var/gs-rest-service-cors-0.1.0.jar root@del2vmpldevop02.sapient.com:/etc/puppetlabs/puppet/deploy_files/gs-service/target"
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
