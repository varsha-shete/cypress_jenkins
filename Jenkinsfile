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
		stage('setup'){
			steps{
			sh '''
				cd /e2e/
				ls -lrt
			'''
			}
		}

	}
}
