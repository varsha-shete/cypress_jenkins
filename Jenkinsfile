def stage_status = true
def emailBody = """     Hello,</br></br>
                            Please find the attached report of smoke testing</br></br></br>
                            Kindly check console output <a href='$BUILD_URL'>here</a> to view the details.</br></br></br>
                            Regards,</br>
                            CSI4Auto DevOps Team
                                        """
def emailSubject

pipeline{
	environment{
                emailid = readYaml file: "testconfig.yml"
                emailto = "${emailid.notification.email.emailRecipients}"
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
							ls -lrt /e2e/
							cp -rf /e2e/cypress/*  /e2e/testconfig.yml $WORKSPACE/
						'''
                                        }
                                        failure {
                                                script{
                                                	stage_status = false
						}
                                        }


                         }
		}
		stage('junit report generation'){
			steps{
				junit  allowEmptyResults: true, keepLongStdio: true, skipMarkingBuildUnstable: true, skipPublishingChecks: true, testResults: 'reports/junit/*.xml'
				echo "${emailSubject}"
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
		stage('Email notification'){
                        steps{
				script{
					emailSubject = "${env.JOB_NAME}- Jenkins Build ${currentBuild.currentResult}"
					echo "${emailSubject}"
					emailto = env.emailto.replaceAll(~/[\[\]]/, '')
					echo "${emailto}"
					//emailext attachmentsPattern: 'reports.zip', body: "${emailBody}", subject: "${emailSubject}", to: "${emailto}"
				}

                        }

                }

	}
}
