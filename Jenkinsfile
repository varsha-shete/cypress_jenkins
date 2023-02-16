def boolean stage_status = true
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
						container_id=`docker inspect --format="{{.Id}}" custom_cypress | cut -d ":" -f2`
						docker cp $wrkdir/cypress.config.js $container_id:/e2e/
						wrkdir="$(echo $wrkdir | sed \'s/\\/var\\/jenkins_home\\///g\')"
						docker run -e NO_COLOR=1 -v jenkins_home_volume:/e2e -w /e2e  --user "$(id -u):$(id -g)" custom_cypress
					'''
				}
			 }
			  post{
			  		always  {
						 stash includes: 'cypress_jenkins/results/**/*', name: 'report', useDefaultExcludes: false
					}
					failure {
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
