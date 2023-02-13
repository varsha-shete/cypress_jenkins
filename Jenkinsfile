pipeline{
	agent any
	stages{
		stage('scm checkout'){
			steps{
				withCredentials([usernameColonPassword(credentialsId: 'csi4auto-technical-user', variable: 'github_credential'), usernameColonPassword(credentialsId: 'varsha_git_test', variable: 'varshagit'), usernamePassword(credentialsId: 'nexus_id', passwordVariable: 'nexuspwd', usernameVariable: 'nexusuname')]) {
                  sh '''
                        git clone https://$varshagit@github.com/varsha-shete/cypress_jenkins.git
                  '''
                    }
			}
		}
		stage('run cypress'){
			steps{
				sh '''
					wrkdir=${PWD}
					wrkdir="$(echo $wrkdir | sed \'s/\\/var\\/jenkins_home\\///g\')"
					docker run -v jenkins_home_volume:/e2e -w /e2e/$wrkdir  --user "$(id -u):$(id -g)" cypress/included:10.10.0
					pwd
					ls -lrt
				'''
			}
			post{
				success {
					stash includes: 'results/my-test-output.xml', name: 'report', useDefaultExcludes: false
				}
			}
		}
		stage('junit'){
			steps{
				unstash 'report'
				sh ''' 
				chmod +x results/my-test-output.xml
				ls -lrt '''
			}
		}

	}
}

