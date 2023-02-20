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
				sh '''rm -rf /e2e/cypress_jenkins '''
			}
    		}
		stage('SCM checkout'){
			 steps{
                                withCredentials([usernameColonPassword(credentialsId: 'csi4auto-technical-user', variable: 'github_credential'), usernameColonPassword(credentialsId: 'varsha_git_test', variable: 'varshagit'), usernamePassword(credentialsId: 'nexus_id', passwordVariable: 'nexuspwd', usernameVariable: 'nexusuname')]) {
                  		sh '''
					git clone https://$varshagit@github.com/varsha-shete/cypress_jenkins.git 
					cp -rf cypress_jenkins/* /e2e/
					cd /e2e/
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
