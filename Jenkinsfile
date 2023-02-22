pipeline{
	environment{
		emailid = readYaml file: "testconfig.yml"
	}
	agent any
	stages{
		stage('env'){
			steps{
				script{
					echo "${emailid.notification.email.emailRecipients}"
				}

			}
		}
	}
}
