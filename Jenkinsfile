pipeline{
	agent any
	stages{
		stage('env'){
			steps{
				script{
					emailid = readYaml file: "testconfig.yml"
					String emailto = "${emailid.notification.email.emailRecipients}"
					sh ''' echo hello '''
				}

			}
		}
	}
}
