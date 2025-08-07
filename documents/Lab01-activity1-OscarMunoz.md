# 2. Installing Angular CLI 

According to the documentation on the official website, to install Angular CLI version 20.x, we must have a version of node js of ^20.19.0 (>=20.19.0 and <21.0.0) || ^22.12.0 (>=22.12.0 and <23.0.0) || ^24.0.0 (>=24.0.0 and <25.0.0) and a version of npm of “^9.15.6” (>=9.15.6). Therefore, before installing Angular CLI, we will confirm the version of our node and the version of our npm with the commands `node -v` and `npm -v`:

### Result:

![alt text](images/Node&NpmVersions.png)

Once the minimum requirements have been confirmed, we will run the following command to install version 20:

```bash
npm install -g @angular/cli@20
```

### Result:

![alt text](images/InstallationResultAngular.png)

After installation, we make sure that Angular CLI has been installed correctly with the command:

```bash
ng version
```

### Result:

![alt text](images/AngularVersion.png)

# Create a workspace and an initial application

Once the installation is complete and confirmed, we will create a workspace to start an application in Angular. To do this, we will run the following command: `ng new my-app`.

![alt text](images/AngularInstallation.png)

*Here we answer the questions asked by the system and in `Which stylesheet format would you like to use?` we choose **Sass (SCSS)** as our style preprocessor.*

Once created, we run the server with the command `ng serve --open`.

# Result

![alt text](images/AngularApplication.png)

# Reference

- https://angular.dev/reference/versions
- https://angular.dev/tools/cli/setup-local#install-the-angular-cli
- https://angular.dev/tools/cli/setup-local#create-a-workspace-and-initial-application