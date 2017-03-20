node ("master") {
	
	
stage 'Checkout 1' 
       
	   def mvnHome = tool 'M3'
	   dir('test-app') {
	   git url: 'https://github.com/poojabansal607/test-app.git' 
		 
	   sh "${mvnHome}/bin/mvn clean install"
	   step([$class: 'ArtifactArchiver', artifacts: '**/target/*.jar', fingerprint: true])}
	   
stage 'Checkout 2'	   
	   dir('control-repo') {
	   git url: 'https://github.com/poojabansal607/control-repo.git'
	   
	   sh "${mvnHome}/bin/mvn clean install"
	   step([$class: 'ArtifactArchiver', artifacts: '**/target/*.jar', fingerprint: true])}
	   
stage 'Deploy Assessment APP'
       puppet.credentials 'secret'
	   echo "connection is made with puppet"
	   puppet.codeDeploy 'production' 
	   echo "Code Deployed"	   
	}
