def boolean stage_status = true
pipeline{
	agent {
		docker {
        	image 'cypress/included:10.10.0'
            	args '--entrypoint=/bin/bash'
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
				mkdir -p /e2e/
				cp /root/.cache/Cypress/10.10.0/Cypress/resources/app/package.json /e2e/
				cd /e2e/
				npm install
				npm install --save-dev cypress-mochawesome-reporter
				npm install --save-dev cypress-multi-reporters
				chmod -R 755 /e2e
			'''
			}
		}

	}
}
