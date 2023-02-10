node{
	stage('basic info'){
		sh ''' pwd 
		       ls -lart
		'''
	}
	stage('scm checkout'){
		 withCredentials([usernameColonPassword(credentialsId: 'csi4auto-technical-user', variable: 'github_credential'), usernameColonPassword(credentialsId: 'varsha_git_test', variable: 'varshagit'), usernamePassword(credentialsId: 'nexus_id', passwordVariable: 'nexuspwd', usernameVariable: 'nexusuname')]) {
                  sh '''git clone https://$varshagit@github.com/varsha-shete/cypress_jenkins.git
			pwd
			ls -lrt
			docker run -v /var/jenkins_home/workspace/test_varsha/cypress_jenkins_test:/e2e -w /e2e cypress/included:10.10.0
			
		  '''
			}
	}


}

