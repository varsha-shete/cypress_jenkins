node{
	stage('basic info'){
			deleteDir()
			sh '''rm -rf *'''
	}
	stage('scm checkout'){
		 withCredentials([usernameColonPassword(credentialsId: 'csi4auto-technical-user', variable: 'github_credential'), usernameColonPassword(credentialsId: 'varsha_git_test', variable: 'varshagit'), usernamePassword(credentialsId: 'nexus_id', passwordVariable: 'nexuspwd', usernameVariable: 'nexusuname')]) {
                  sh '''
		  	git clone https://$varshagit@github.com/varsha-shete/cypress_jenkins.git cypress_test

			chmod +x ./cypress_test/utilities/script.sh
			cd cypress_test && ./utilities/script.sh $github_credential $nexusuname $nexuspwd
		  '''
                    }
	}


}

