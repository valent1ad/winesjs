pipeline {
    agent any

    stages {
        stage('Checkout SCM') {
            steps {
                // Checkout your code from the Git repository
                git branch: 'main', url: 'https://github.com/valent1ad/winesjs/'
            }
        }

        stage('Build Docker Image') {
            steps {
                // Build the Docker image
                sh 'docker build -t winesjs .'
            }
        }

        stage('Run Docker Container') {
            steps {
                // Stop and remove any existing container with the same name
                sh 'docker rm -f winesjs || true'
                
                // Run the Docker container
                sh 'docker run -d -p 3000:3000 --name winesjs winesjs'
            }
        }

        stage('Check Docker Status') {
            steps {
                // Check if the Docker container is running
                sh 'docker ps -a'
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
