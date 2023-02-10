pipeline{
	agent any
	stages{
		stage('scm checkout'){
			script{
				withCredentials([usernameColonPassword(credentialsId: 'csi4auto-technical-user', variable: 'github_credential'), usernameColonPassword(credentialsId: 'varsha_git_test', variable: 'varshagit'), usernamePassword(credentialsId: 'nexus_id', passwordVariable: 'nexuspwd', usernameVariable: 'nexusuname')]) {
                  sh '''
                        git clone https://$varshagit@github.com/varsha-shete/cypress_jenkins.git
                  '''
                    }
			}
		}
		stage('run cypress'){
			script{
				sh '''
					wrkdir="$(echo $wrkdir | sed 's/\/var\/jenkins_home\///g')"
					docker run -v jenkins_home_volume:/e2e -w /e2e/$wrkdir cypress/included:10.10.0
					pwd
					ls -lrt
				'''
			}
		}

	}
}

