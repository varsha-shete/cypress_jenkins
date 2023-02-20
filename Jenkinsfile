def boolean stage_status = true
pipeline{
	agent {
		docker {
        	image 'custom_cypress'
            	args '--entrypoint='
        	}
	}
	stages{
		stage('Clean Workspace'){
        		steps{
				deleteDir()
			}
    		}
		stage('SCM checkout'){
			 steps{
                                withCredentials([usernameColonPassword(credentialsId: 'csi4auto-technical-user', variable: 'github_credential'), usernameColonPassword(credentialsId: 'varsha_git_test', variable: 'varshagit'), usernamePassword(credentialsId: 'nexus_id', passwordVariable: 'nexuspwd', usernameVariable: 'nexusuname')]) {
                  		sh '''
                        		cd /e2e/
					git cloine https://$varshagit@github.com/varsha-shete/cypress_jenkins.git .
					ls -lrt
                  		'''
                    		}
			}
		}
		stage('Cypress execution'){
			steps{
				sh '''
					cypress --version	
				'''
			}
		}

	}
}
