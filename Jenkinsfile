node{
	stage('basic info'){
		sh ''' pwd 
		       ls -lart
		       whoami
		       rm -rf cypress_jenkins
		'''
	}
	stage('scm checkout'){
		 withCredentials([usernameColonPassword(credentialsId: 'csi4auto-technical-user', variable: 'github_credential'), usernameColonPassword(credentialsId: 'varsha_git_test', variable: 'varshagit'), usernamePassword(credentialsId: 'nexus_id', passwordVariable: 'nexuspwd', usernameVariable: 'nexusuname')]) {
                  sh '''git clone https://$varshagit@github.com/varsha-shete/cypress_jenkins.git
			pwd
			whoami
			ls -lrt
			docker rm cypress_test
			docker run --name cypress_test -v cypress_test:/e2e -w /e2e cypress/included:10.10.0
			docker cp cypress_test:/e2e/ /tmp/
			
		  '''
                    }
	}


}

