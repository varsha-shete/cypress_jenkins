node{
	stage('basic info'){
		sh ''' pwd 
		       ls -lart
		'''
	}
	stage('scm checkout'){
		git changelog: false, credentialsId: 'varsha_git_test', poll: false, url: 'https://github.com/varsha-shete/cypress_jenkins.git'
	}
	stage('docker run'){
		sh '''
			pwd
			ls -lrt cypress
			docker run -v /var/jenkins_home/workspace/test_varsha/cypress_test:/e2e -w /e2e cypress/included:10.10.0
			echo "**************"
			ls -lrt
		'''
	}


}

