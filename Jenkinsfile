node ("master") {
	
	
       
stage 'Deploy to PROD'
       sh "sshpass -p devop@123 ssh -t -t root@del2vmpldevop03.sapient.com"
	   echo "loogin into another host"
       sh "puppet agent --test"	   
	   echo "failed"
	}
