pipeline {
    agent any

    stages {
        stage('Checkout SCM') {
            steps {
                // Checkout your code from the Git repository
                git 'https://github.com/valent1ad/winesjs/'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                // You can include any build steps if needed
                echo 'Build stage (if any build steps are needed)'
            }
        }

        stage('Run Application in Background') {
            steps {
                // Use PM2 to run the application in the background
                sh 'pm2 start server.js --name winesjs --watch'
            }
        }

        stage('Check PM2 Status') {
            steps {
                // Check PM2 status to confirm the application is running
                sh 'pm2 status'
            }
        }
    }

    post {
        always {
            // Optional: Add any cleanup actions or notifications
            echo 'Pipeline finished.'
        }
    }
}
