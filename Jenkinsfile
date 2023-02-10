node{
	stage('basic info'){
	}
	stage('scm checkout'){
		 withCredentials([usernameColonPassword(credentialsId: 'csi4auto-technical-user', variable: 'github_credential'), usernameColonPassword(credentialsId: 'varsha_git_test', variable: 'varshagit'), usernamePassword(credentialsId: 'nexus_id', passwordVariable: 'nexuspwd', usernameVariable: 'nexusuname')]) {
                  sh '''
		  	git clone https://$varshagit@github.com/varsha-shete/cypress_jenkins.git cypress_final
			chmod +x ./cypress_final/utilities/script.sh
			cd cypress_final && ./utilities/script.sh $github_credential $nexusuname $nexuspwd
		  '''
                    }
		    junit '/var/jenkins_home/workspace/test_varsha/cypress_jenkins_test/cypress_final/results/my-test-output.xml'
	}


}

