def emailto
pipeline{
	agent any
	stages{
		stage('env'){
			steps{
				script{
					emailid = readYaml file: "testconfig.yml"
					emailto = "${emailid.notification.email.emailRecipients}"
					sh ''' echo $emailto '''
				}

			}
		}
	}
}
