pipeline {
    agent any 

    stages {
        stage('Checkout') {
            steps {
                // Checkout the main branch
                checkout([$class: 'GitSCM', 
                    branches: [[name: '*/main']], 
                    userRemoteConfigs: [[url: 'https://github.com/valent1ad/winesjs.git']]
                ])
            }
        }
        stage('Install Dependencies') {
            steps {
                // Install dependencies
                sh 'npm install'
            }
        }
        stage('Install PM2') {
            steps {
                // Install PM2 globally
                sh 'npm install -g pm2'
            }
        }
        stage('Build') {
            steps {
                // Optional: Add build commands if needed
                echo 'Building the application...'
            }
        }
        stage('Run Tests') {
            steps {
                // Optional: Add test commands if needed
                echo 'Running tests...'
            }
        }
        stage('Deploy') {
            steps {
                // Start the application using PM2 in the background
                sh 'pm2 start server.js --name winesjs --watch'
                echo 'Application deployed successfully!'
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline completed.'
            // Optional: display the status of the PM2 processes
            sh 'pm2 status'
        }
    }
}
