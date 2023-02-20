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
				sh '''rm -rf /e2e/cypress_jenkins '''
			}
    		}
		stage('SCM checkout'){
			 steps{
                                withCredentials([usernameColonPassword(credentialsId: 'csi4auto-technical-user', variable: 'github_credential'), usernameColonPassword(credentialsId: 'varsha_git_test', variable: 'varshagit'), usernamePassword(credentialsId: 'nexus_id', passwordVariable: 'nexuspwd', usernameVariable: 'nexusuname')]) {
                  		sh '''
					git clone https://$varshagit@github.com/varsha-shete/cypress_jenkins.git 
					cp -rf cypress_jenkins/* /e2e/
                  		'''
                    		}
			}
		}
		stage('Cypress execution'){
			steps{
				catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
					sh '''
						cypress --version	
						cd /e2e/
						NO_COLOR=1 cypress run
						echo $WORKSPACE
						cp -rf reports $WORKSPACE
					'''
				}
			}
			 post{
                                        always  {
						script {sh '''echo $WORKSPACE
                                                cp -rf /e2e/reports $WORKSPACE '''}
                                                 stash includes: 'reports/**/*', name: 'report', useDefaultExcludes: false
                                        }
                                        failure {
                                                script{
                                                        stage_status = false
                                                }
                                        }


                         }
		}
		stage('html report generation'){
			steps{
				publishHTML (target: [
                        	allowMissing: false,
                                alwaysLinkToLastBuild: false,
                                keepAll: true,
                                reportDir: 'reports',
                                reportFiles: 'index.html',
                                reportName: "HTML Report"
         	             ])
			}

		}
		stage('set build status'){
			steps{
                                 if ( stage_status == true ){
                                          currentBuild.result = "SUCCESS"
                                 }else {
                                          currentBuild.result = "FAILURE"
                                 }
                        }
		}

	}
}
