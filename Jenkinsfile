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
					try{
						docker run -v jenkins_home_volume:/e2e -w /e2e/$wrkdir  --user "$(id -u):$(id -g)" cypress/included:10.10.0}
					catch{
						 echo "Error in $__EXCEPTION_SOURCE__ at line: $__EXCEPTION_LINE__!"	}
						pwd
						ls -lrt
					'''
				}
			  post{
                                        always {
                                                stash includes: 'cypress_jenkins/results/**/*', name: 'report', useDefaultExcludes: false
                                        }


                         }
				
		}
		stage('junit'){
			steps{
				unstash 'report'
				sh ''' 
				ls -lrt '''
				junit allowEmptyResults: true, keepLongStdio: true, skipMarkingBuildUnstable: true, skipPublishingChecks: true, testResults: 'cypress_jenkins/results/*.xml'
			}

		}


