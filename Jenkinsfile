node ("master") {
		
stage 'Deploy to QA'
   puppet.credentials 'secret'
	  echo "connection is made with puppet"
	  puppet.codeDeploy 'production' 
	  echo "Code Deployed"
	      

	}
