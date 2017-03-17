node ("master") {

stage 'Checkout'
       
	   checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'poojabansal607@gmail.com', url: 'https://github.com/poojabansal607/test-app.git']]])
       def mvnHome = tool 'M3'
   		
stage 'Build'
     
	   sh "${mvnHome}/bin/mvn clean install"
	   step([$class: 'ArtifactArchiver', artifacts: '**/target/*.jar', fingerprint: true])
	   step([$class: 'JUnitResultArchiver', testResults: '**/target/surefire-reports/TEST-*.xml'])		
	   
	   def workspace = pwd()
       echo "workspace=${workspace}"
	  
	  // sh "cp /var/lib/jenkins/jobs/gs-rest-service-cors/builds/lastSuccessfulBuild/archive/target/ /tmp"
		
stage 'Deploy to QA'
       puppet.credentials 'secret'
	   echo "connection is made with puppet"
	   puppet.codeDeploy 'production' 
	   echo "Code Deployed"
	   //puppet.job 'production'
	   
stage 'Deploy to PROD'
       input "Ready to deploy to PROD?"	   

	}


