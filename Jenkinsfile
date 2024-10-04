pipeline {
    agent any

    stages {
        stage('Checkout SCM') {
            steps {
                // Checkout your code from the Git repository
                git branch: 'main', url: 'https://github.com/valent1ad/winesjs/'
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
                // Use Forever to run the application in the background
                sh 'forever start --uid "winesjs" -c "node" server.js'
            }
        }

        stage('Check Forever Status') {
            steps {
                // Check Forever status to confirm the application is running
                sh 'forever list'
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
