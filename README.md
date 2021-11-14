# City editorials online API

Api permettant de stocker des villes, des utilisateurs reliés à ces villes (admins) et d'envoyer les documents liés aux villes sur S3.

- Express
- MongoDB
- Jest
- AWS S3

Pour les tests, il y a un fichier CI pour les branches develop et main. Par contre je n'ai pas réussi à faire marcher entièrement avec mongodb et jest qui me mets toujours une erreur qui est liée à une promise non résolue, par manque de temps ce n'est pas géré.

Preprod: https://city-editorials-preprod.herokuapp.com
Prod: https://city-editorials.herokuapp.com

Export JSON de la collection Postman : https://editorials-online-preprod.s3.eu-west-3.amazonaws.com/619169431a6892001600e900/10_2021/1636923269454
