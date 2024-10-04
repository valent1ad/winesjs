pipeline {
    agent any 

    stages {
        stage('Checkout') {
            steps {
                // Checkout the 'main' branch from the GitHub repository
                checkout([$class: 'GitSCM', 
                    branches: [[name: '*/main']], 
                    userRemoteConfigs: [[url: 'https://github.com/valent1ad/winesjs.git']]
                ])
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install the necessary npm dependencies
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                // Add build commands if needed (optional)
                echo 'Building the application...'
            }
        }

        stage('Run Tests') {
            steps {
                // Add test commands if needed (optional)
                echo 'Running tests...'
            }
        }

        stage('Deploy') {
            steps {
                // Start the application using PM2 and keep it running
                sh 'pm2 start server.js --name winesjs --watch'
                echo 'Application deployed successfully!'
            }
        }
    }

    post {
        always {
            // This will run after the pipeline completes, regardless of the outcome
            echo 'Pipeline completed.'
        }
    }
}
