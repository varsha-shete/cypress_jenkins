pipeline{
	environment{
		emailid = readYaml file: "testconfig.yml"
	}
	agent any
	stages{
		stage('env'){
			steps{
				script{
					emailto = "${emailid.notification.email.emailRecipients}"
					echo "$emailto"
				}

			}
		}
	}
}
