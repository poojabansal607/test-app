node ("master") {
   stage 'Checkout'
       checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'poojabansal607@gmail.com', url: 'https://github.com/poojabansal607/test-app.git']]])
       def mvnHome = tool 'M3'
   		//echo 'Hello World 1'
   stage 'Build'
      
	  // def pom = readMavenPom file: 'pom.xml'
	  // def version = pom.version.replace("-SNAPSHOT", ".${currentBuild.number}")
	   sh "${mvnHome}/bin/mvn clean install"
	   echo 'pass'
	   echo '${BUILD_URL}'
	   //archiveArtifacts '/var/lib/jenkins/jobs/order-test/workspace/ordermanagementui/target/order-management-1.0-SNAPSHOT.war'
	 //  sh "cd /var/lib/jenkins/.m2/repository/com/sape/order/order-management-ui/1.0-SNAPSHOT"
	   echo 'pass1'
	  // sh "cp -r order-management-1.0-SNAPSHOT.war /var"
	  // echo 'pass2'
      // sh ''/usr/share/mvn' clean install' 
	   // input 'Publish?'
	     // Email for build 
	    emailext body: '''Hi,
		Build is successful.
		Regards,
		Pooja''', compressLog: true, recipientProviders: [[$class: 'DevelopersRecipientProvider']], subject: 'Build is successful', to: 'pbansal13@sapient.com'
   		//echo 'Hello World 2'

	
   //stage 'Artifactory upload'
   //def server = Artifactory.server('art-1')
   //def rtMaven = Artifactory.newMavenBuild()
   //rtMaven.tool = M3
   //rtMaven.deployer releaseRepo:'libs-release-local', snapshotRepo:'libs-snapshot-local', server: server
   //rtMaven.resolver releaseRepo:'libs-release', snapshotRepo:'libs-snapshot', server: server
   //def buildInfo = Artifactory.newBuildInfo()
   
   //stage 'Publish build info'
      //server.publishBuildInfo buildInfo
	  //Set the Jenkins credentials that hold our Puppet Enterprise RBAC token
	//  puppet.credentials 'SecretID'

  // stage 'Deploy to dev'
// input "Ready to deploy to Dev?"
//	puppet.hiera scope: 'staging', key: 'build-version', value: version
//	puppet.hiera scope: 'staging', key: 'build-path', value: "http://" + hostaddress + "/builds/app/build-${version}.tar.gz"
//	echo 'Hello World 4'
//  puppet.codeDeploy 'production', credentials: 'SecretID'
   
   
   stage 'Run Acceptance tests'
        echo 'Hello World 5'
   stage 'Run Jmeter Tests'
        echo 'Hello World 6'
   stage 'Nexus'
         echo 'Hello World 7'
   stage 'Deployment to UAT'
         echo 'Hello World 8'			 
} 