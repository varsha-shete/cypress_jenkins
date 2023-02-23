def emailto
pipeline{
	agent any
	stages{
		stage('env'){
			steps{
				script{
					emailid = readYaml file: "testconfig.yml"
					emailto = "${emailid.notification.email.emailRecipients}"
					str = emailto.substring(1)

				}

			}
		}
	}
}
