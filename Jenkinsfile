node{
	def workdir="/var/lib/docker/volumes/cypress_test/_data"
	stage('basic info'){
		sh ''' pwd 
		       ls -lart
		       whoami
		       rm -rf cypress_jenkins
		'''
	}
	stage('scm checkout'){
		 withCredentials([usernameColonPassword(credentialsId: 'csi4auto-technical-user', variable: 'github_credential'), usernameColonPassword(credentialsId: 'varsha_git_test', variable: 'varshagit'), usernamePassword(credentialsId: 'nexus_id', passwordVariable: 'nexuspwd', usernameVariable: 'nexusuname')]) {
                  sh '''
		  	cd $workdir
		  	git clone https://$varshagit@github.com/varsha-shete/cypress_jenkins.git
			pwd
			whoami
			ls -lrt
			docker run -v cypress_test:/e2e -w /e2e cypress/included:10.10.0 /bin/bash
		        cp $workdir/results/my-test-output.xml .	
		  '''
                    }
	}


}

