pipeline{
	agent any
	stages{
		stage('env'){
			steps{
				script{
					emailid = readYaml file: "testconfig.yml"
					echo "${emailid.notification.email.emailRecipients}"
				}

			}
		}
	}
}
