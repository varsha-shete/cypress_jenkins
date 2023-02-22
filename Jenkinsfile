pipeline{
	environment{
		emailid = readYaml file: "testconfig.yml"
	}
	agent any
	stages{
		stage('env'){
			steps{
				script{
					echo "${env.emailid.notification.email.emailRecipients}"
				}

			}
		}
	}
}
