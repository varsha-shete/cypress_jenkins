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
					'''
				}
			}
			 post{
                                        always  {
						script {sh '''echo $WORKSPACE
						ls -lrt /e2e/cypress/
						cp -rf /e2e/cypress/*  $WORKSPACE/
						mv $WORKSPACE/screenshots $WORKSPACE/reports/
						'''}
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
				unstash 'report'
				junit  allowEmptyResults: true, keepLongStdio: true, skipMarkingBuildUnstable: true, skipPublishingChecks: true, testResults: 'reports/junit/*.xml'
				publishHTML (target: [
                        	allowMissing: false,
                                alwaysLinkToLastBuild: false,
                                keepAll: true,
                                reportDir: 'reports/html',
                                reportFiles: 'index.html',
                                reportName: "HTML Report"
         	             ])
			}

		}
		stage('archive reports'){
			steps{
				archiveArtifacts artifacts: 'reports/**/*', defaultExcludes: false, fingerprint: true, followSymlinks: false
			}
		}
		stage('set build status'){
			steps{
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
