def emailto
pipeline{
	environment{
		emailid = readYaml file: "testconfig.yml"
                emailto = "${emailid.notification.email.emailRecipients}"
	
	}

	agent any
	stages{
		stage('env'){
			steps{
				script{
					//emailid = readYaml file: "testconfig.yml"
					//emailto = "${emailid.notification.email.emailRecipients}"
					//str = emailto.substring(1)
					//str = emailto.replaceAll(~/[\[\]]/, '')
					str = env.emailto
					echo "${str}"
				}

			}
		}
	}
}
