node{
	stage('basic info'){
	}
	stage('scm checkout'){
		 withCredentials([usernameColonPassword(credentialsId: 'csi4auto-technical-user', variable: 'github_credential'), usernameColonPassword(credentialsId: 'varsha_git_test', variable: 'varshagit'), usernamePassword(credentialsId: 'nexus_id', passwordVariable: 'nexuspwd', usernameVariable: 'nexusuname')]) {
                  sh '''
		  	git clone https://$varshagit@github.com/varsha-shete/cypress_jenkins.git cypress_final
			chmod +x ./cypress_final/utilities/script.sh
			mkdir ./cypress_final/results
			chmod -R 777 ./cypress_final/results
			cd cypress_final && ./utilities/script.sh $github_credential $nexusuname $nexuspwd
		  '''
                    }
	}


}

