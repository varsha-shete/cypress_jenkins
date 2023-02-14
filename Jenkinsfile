def boolean stage_status = false
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
				catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
					sh '''
						wrkdir=${PWD}/cypress_jenkins
						wrkdir="$(echo $wrkdir | sed \'s/\\/var\\/jenkins_home\\///g\')"
						docker run -v jenkins_home_volume:/e2e -w /e2e/$wrkdir  --user "$(id -u):$(id -g)" cypress/included:10.10.0
					pwd
					ls -lrt
					'''
				}
			 }
			  post{
                                        success {
                                                stash includes: 'cypress_jenkins/results/**/*', name: 'report', useDefaultExcludes: false
						script{
							stage_status = true
						}
                                        }
					failure {
                                                stash includes: 'cypress_jenkins/results/**/*', name: 'report', useDefaultExcludes: false
						script{
							stage_status = false
						}
                                        }


                         }
				
		}
		stage('junit'){
			steps{
				unstash 'report'
				sh ''' 
				ls -lrt '''
				junit allowEmptyResults: true, keepLongStdio: true, skipMarkingBuildUnstable: true, skipPublishingChecks: true, testResults: 'cypress_jenkins/results/*.xml'
				script{
				if ( stage_status == true ){
					currentBuild.result = "SUCCESS"
				}else {
					currentBuild.result = "FAILURE"
				}
				}
			}

		}
	}
}
