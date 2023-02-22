pipeline{
	environment {
		 emailid = readYaml file: "testconfig.yml"
	}
	agent any
	stages{
		stage('env'){
			steps{
				env.emailTo = configTest['notification']['email']['emailRecipients']
				//emailext body: "hello", subject: "test", to: "${env.emailid}"
				echo "${env.emailTo}"

			}
		}
	}
}
