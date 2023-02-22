pipeline{
	agent any
	stages{
		stage('env'){
			steps{
				script{
					emailid = readYaml file: "testconfig.yml"
					emailto = "${emailid.notification.email.emailRecipients}"
					echo "${emailto}"
					String stringIds=emailto.join(",") 
					println "$stringIds
				}

			}
		}
	}
}
