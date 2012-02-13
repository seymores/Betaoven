#Betaoven rest API

##Project
Name, desc created-at, [admins], status, private=true | false

##Build
Title, desc, created at, uploader-email, uploader-id, status, version, version code, project id

##User
Display name, password, email, status

------
#Priority API we probably need first

##POST /projects
Params: name, desc, email
Return: project hash ID

##POST /builds
Params: title, desc, version, version code, email[user id], project I'd
Return: build id

##GET /projects
Params: filter=sort,
Return list of all public projects

##GET /projects/<ID>
Get project with the given I'd