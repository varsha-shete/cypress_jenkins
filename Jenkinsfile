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
						wrkdir="$(echo $wrkdir | sed \'s/\\/var\\/jenkins_home\\///g\')"
						ls -lrt
						pwd
						docker run -e NO_COLOR=1 -v jenkins_home_volume:/e2e/e2etest -w /e2e/ --user "$(id -u):$(id -g)" custom_cypress -C e2etest/$wrkdir/cypress.config.js --spec e2etest/$wrkdir/*.cy.js --reporterEnabled junit,cypress-mochawesome-reporter --reporter  --reporter-options reportDir="e2etest/$wrkdir/reports" mochaFile: 'results/my-test-output-[hash].xml'
					'''
				}
			 }
		         post{
			  
			  	always  {
						stash includes: 'cypress_jenkins/reports/**/*', name: 'report', useDefaultExcludes: false
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
				publishHTML (target: [
      					allowMissing: false,
				      	alwaysLinkToLastBuild: false,
      					keepAll: true,
	      				reportDir: 'cypress_jenkins/reports',
      					reportFiles: 'index.html',
      					reportName: "HTML Report"
    				])
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
