#Betaoven rest API

##Project
Name, desc created-at, [admins], status, private=true | false

##Build
Title, desc, created at, uploader-email, uploader-id, status, version, version code, project ID

##User
Display name, password, email, status

------
#Priority API we probably need first

##POST /projects
Params: name, desc, email

Return: project hash ID

##POST /builds
Params: title, desc, version, version code, email[user id], project ID

Return: build ID

##GET /projects
Params: filter=sort

Return list of all public projects

##GET /projects/<ID>
Get project with the given ID

-----

# Routes for site

## GET /
Show homepage when not authenticated and show dashboard when authenticated

## GET /<USERNAME>
User profile with list all projects of the user

## GET /<USERNAME>/<PID>
Display projects details with list of builds

## GET /<USERNAME>/<PID>/<BID>
Display build details

## GET /projects/new
Creating new project

## POST /projects
Process data and create new project

## POST /projects/<PID>/builds
Process data and create new Build for a project

## POST /projects/<PID>/invite
Process data and invite new members

## DELETE /projects/<PID>
Delete a project

## DELETE /projects/<PID>/build/<BID>
Delete a build