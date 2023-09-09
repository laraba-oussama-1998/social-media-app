pipeline{

    agent any
    stages{

        stage('build'){
            steps{
                echo 'building the application'
            }
        }

        stage('test'){
            steps{
                dir('backend/app'){
                    script{
                        sh 'python manage.py test'
                    }
                }
            }
        }

        stage('deploy'){
            steps{
                echo 'deploying the application'
            }
        }
    }

}
