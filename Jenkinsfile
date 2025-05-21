pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm // Клонирует репозиторий
            }
        }
        stage('Test HTML') {
            steps {
                sh 'echo "Здесь могут быть тесты (например, htmlhint)"'
            }
        }
        stage('Deploy') {
            steps {
                sh 'echo "Деплой на GitHub Pages (автоматический через git push)"'
            }
        }
    }
}
