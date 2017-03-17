node ("master") {

stage 'Checkout'
       
	step(checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'poojabansal607@gmail.com', url: 'https://github.com/poojabansal607/test-app.git']]]))
	
	step(checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'poojabansal607@gmail.com', url: 'https://github.com/poojabansal607/control-repo.git']]]))
	   
	def mvnHome = tool 'M3'
   		
stage 'Build'
     
	   sh "${mvnHome}/bin/mvn clean install"
	   step([$class: 'ArtifactArchiver', artifacts: '**/target/*.jar', fingerprint: true])
	   step([$class: 'JUnitResultArchiver', testResults: '**/target/surefire-reports/TEST-*.xml'])		
	   
	   def workspace = pwd()
       echo "workspace=${workspace}"
	   
	  // def var1 = /var/lib/jenkins/jobs/gs-rest-service-cors/lastSuccessful/archive/target
	  // def var2 = /etc/puppetlabs/puppet/deploy_files/gs-service/target
	   
	 //  sh "scp $(var1)/gs-rest-service-cors-0.1.0.jar root@del2vmpldevop02.sapient.com:$(var2) "
	   
//sh "scp /var/lib/jenkins/jobs/gs-rest-service-cors/lastSuccessful/archive/target/gs-rest-service-cors-0.1.0.jar //root@del2vmpldevop02.sapient.com:/etc/puppetlabs/puppet/deploy_files/gs-service/target"
	  
	  // sh "cp /var/lib/jenkins/jobs/gs-rest-service-cors/builds/lastSuccessfulBuild/archive/target/ /tmp"
		

	}


