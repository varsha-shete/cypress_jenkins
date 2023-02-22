pipeline{
	environment{
		emailid = readYaml file: "testconfig.yml"
	}
	agent any
	stages{
		stage('env'){
			steps{
				script{
					emailto = "${env.emailid.notification.email.emailRecipients}"
					echo "$emailto"
				}

			}
		}
	}
}
