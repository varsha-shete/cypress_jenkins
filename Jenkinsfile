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
			mkdir /tmp/test/
			cp -rf /var/jenkins_home/workspace/test_varsha/cypress_jenkins_test/ /tmp/test/
			ls -lrt /tmp/test/
			docker run -v /tmp/test:/e2e -w /e2e cypress/included:10.10.0
			echo "**************"
			ls -lrt
		'''
	}


}

