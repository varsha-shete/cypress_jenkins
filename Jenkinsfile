def boolean stage_status = true
pipeline{
	agent {
		docker {
        	image 'cypress/included:10.10.0'
            	args '--entrypoint='
	    	args '-u root'
        	}
	}
	stages{
		stage('Clean Workspace'){
        		steps{
				deleteDir()
			}
    		}
		stage('setup'){
			steps{
			sh '''
				cp /root/.cache/Cypress/10.10.0/Cypress/resources/app/package.json /e2e/
				cd /e2e/
				ls -lrt
				npm install
			'''
			}
		}

	}
}
