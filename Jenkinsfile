pipeline {
    agent any

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install project dependencies
                sh 'npm install'
            }
        }

        stage('Install PM2') {
            steps {
                // Install PM2 locally
                sh 'npm install pm2 --save-dev'
            }
        }

        stage('Build') {
            steps {
                // Build your application here if necessary
                // Example: sh 'npm run build'
            }
        }

        stage('Run Tests') {
            steps {
                // Run your tests here if necessary
                // Example: sh 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                // Start the application using local PM2
                sh './node_modules/.bin/pm2 start server.js --name winesjs --watch'
                echo 'Application deployed successfully!'
            }
        }
    }

    post {
        always {
            script {
                // Check the PM2 status
                sh './node_modules/.bin/pm2 status'
            }
        }
    }
}
