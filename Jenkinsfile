pipeline{
	environment {
		 emailid = readYaml file: "testconfig.yml"
	}
	agent any
	stages{
		stage('env'){
			steps{
				emailTo = emailid['notification']['email']['emailRecipients']

			}
		}
	}
}
