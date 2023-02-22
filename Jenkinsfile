pipeline{
	 environment {
                emailTo = readYaml file: "notification.yml"
		emailBody = """     Hello,</br></br>
                            ${env.JOB_NAME} - Build # $BUILD_NUMBER ${currentBuild.currentResult}</br></br>
                            Please find the attached zip file for junit, html reports alongwith videos and screenshots</br></br></br>
                            Kindly check console output <a href='$BUILD_URL'>here</a> to view the details.</br></br></br>
                            Regards,</br>
                            CSI4Auto DevOps Team
                                        """
		stage_status = true
		emailSubject = "${env.JOB_NAME}- Jenkins Build ${currentBuild.currentResult}"
        }
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
						sh '''
							cp -rf /e2e/cypress/*  $WORKSPACE/
						'''
                                        }
                                        failure {
                                                script{
                                                        env.stage_status = false
							echo "${env.stage_status}"
                                                }
                                        }


                         }
		}
		stage('junit report generation'){
			steps{
				junit  allowEmptyResults: true, keepLongStdio: true, skipMarkingBuildUnstable: true, skipPublishingChecks: true, testResults: 'reports/junit/*.xml'
			}
		}
		stage('html report generation'){
			steps{
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
				zip archive: true, dir: 'reports', exclude: '', glob: '', overwrite: true, zipFile: 'reports.zip'
			}
		}
		stage('Email notification'){
			steps{
				//emailext attachmentsPattern: 'reports.zip', body: "${env.emailBody}", subject: "${env.emailSubject}", to: "${env.emailTo}"
				sh ''' echo hello'''
				echo "${env.stage_status}"
			}
		}
		stage('set build status'){
			steps{
				script{
	                                 if ( env.stage_status == true ){
        	                                  currentBuild.result = "SUCCESS"
                	                 }else {
                        	                  currentBuild.result = "FAILURE"
                                	 }
				}
                        }
		}

	}
}
