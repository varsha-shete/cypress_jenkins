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
				cp /root/.cache/Cypress/10.10.0/Cypress/resources/app/package.json .
				chmod 777 package.json
				ls -lrt
				npm install
			'''
			}
		}

	}
}
