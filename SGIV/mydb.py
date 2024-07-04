#Instalar MySQL en el computador
#https://dev.mysql.com/downloads/installer/
#pip install mysql
#pip install mysql-connector o pip install mysql-connector-python


#INICIAR SERVER
#
#source virt/Scripts/activate
#cd SGIV
#python manage.py runserver

#Si quiero hacer una nueva BBDD; 
#Creamos nueva DB en mysql
#Borramos los migrations excepto el init
#Cambiamos lo que queramos en models
#Cambiamos db_name dentro de settings
#hacemos python manage.py migrate para crear los datos default en nueva DB
#hacemos nuevo superuser 'winpty python manage.py createsuperuser'
#hacemos python manage.py makemigrations para crear nuevas archivos con el SQL que representa las tablas
#hacemos migrate para aplicar esos cambios en la base de datos
#estamos done 


import mysql.connector

dataBase = mysql.connector.connect(
    host = 'localhost',
    user = 'root',
    passwd = 'iluminarTudia1$' 
)

