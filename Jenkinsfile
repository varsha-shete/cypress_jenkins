node{
	stage('basic info'){
			deleteDir()
			sh '''rm -rf *'''
	}
	stage('scm checkout'){
		 withCredentials([usernameColonPassword(credentialsId: 'csi4auto-technical-user', variable: 'github_credential'), usernameColonPassword(credentialsId: 'varsha_git_test', variable: 'varshagit'), usernamePassword(credentialsId: 'nexus_id', passwordVariable: 'nexuspwd', usernameVariable: 'nexusuname')]) {
                  sh '''
		  	git clone https://$varshagit@github.com/varsha-shete/cypress_jenkins.git cypress

			chmod +x ./cypress/utilities/script.sh
			cd cypress && ./utilities/script.sh $github_credential $nexusuname $nexuspwd
		  '''
                    }
	}


}

