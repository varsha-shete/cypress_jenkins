pipeline{
	environment {
		 emailid = readYaml file: "notification.yml"
	}
	agent any
	stages{
		stage('env'){
			steps{
				println "${emailid}"
			}
		}
	}
}
