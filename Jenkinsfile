node{
	stage('basic info'){
		sh ''' pwd 
		       cd pwd
		       rm -rf *
		       ls -lart
		'''
	}
	stage('scm checkout'){
		git changelog: false, credentialsId: 'varsha_git_test', poll: false, url: 'https://github.com/varsha-shete/cypress_jenkins.git'
	}
	stage('docker run'){
		sh '''
			pwd
			ls -lrt
			docker run -v $PWD:/e2e -w /e2e cypress/included:10.10.0
		'''
	}


}

