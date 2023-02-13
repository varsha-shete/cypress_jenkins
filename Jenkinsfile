
pipeline{
	agent any
	stages{
		stage('Clean Workspace'){
        		steps{
				deleteDir()
			}
    		}
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
					wrkdir=${PWD}/cypress_jenkins
					wrkdir="$(echo $wrkdir | sed \'s/\\/var\\/jenkins_home\\///g\')"
i					docker run -v jenkins_home_volume:/e2e -w /e2e/$wrkdir  --user "$(id -u):$(id -g)" cypress/included:10.10.0
					-c 'npm install cypress-soft-assertions'					
					pwd
					ls -lrt
				'''
			}
			post{
				success {
					stash includes: 'cypress_jenkins/results/my-test-output.xml', name: 'report', useDefaultExcludes: false
				}
			}
		}
		stage('junit'){
			steps{
				unstash 'report'
				sh ''' 
				ls -lrt '''
				junit 'cypress_jenkins/results/my-test-output.xml'
			}
		}

	}
}

