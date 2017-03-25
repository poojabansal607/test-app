node ("master") {
	

		stage 'Deploy to PROD'
        puppet.credentials 'secret'
	    echo "connection is made with puppet"
	    puppet.codeDeploy 'production' 
	    echo "Code Deployed"
		//puppet.job 'production', nodes: ['del2vmpldevop03.sapient.com']
		
		mail (to: 'pbansal13@sapient.com',
        subject: "Job '${env.JOB_NAME}' (${env.BUILD_NUMBER}) has been successfully Deployed ON PROD",
        body: "Please go to ${env.BUILD_URL}.");  
		echo "email sent"
	   

	}
