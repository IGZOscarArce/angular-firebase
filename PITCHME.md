---

## Angular + Firebase
![Angular](assets/angular-logo.png)
![Firebase](assets/firebase-logo.png)

---

# Agenda

- Angular
- Firebase
- Firebase & application (with angularfire2)
- Firebase & application (without angularfire2)
- References
- Repository

---

## Angular

+++

### Create new project

```sh
$> sudo npm install -g @angular/cli
# installs Angular CLI (the tool to initialize, develop, scaffold and maintain Angular applications)
```
```sh
$> ng new myApp && cd $_
# creates new app
$> ng serve
# builds and starts app in a web server
```

---

## Firebase

+++

### What is Firebase?

Realtime database and much more...

- Hosting service
- Storage service
- Authentication service
- ...

+++

### Firebase tools

Initialization

```sh
$> npm install -g firebase-tools
$> firebase login
$> firebase init
```

Deployment

```sh
$> firebase deploy
$> firebase deploy --only hosting
```

---

## Firebase & application (with angularfire2)

+++

### Install angularfire2 as a dependency

```sh
$> npm install --save angularfire2 firebase
```

+++

### Get Firebase configuration details

- Log in to the Firebase console.
- Create New Project or open an existing one.
- Click Add Firebase to your web app.
- From the modal window that pops up you copy the config object.

```typescript
  const config = {
    apiKey: 'your-api-key',
    authDomain: 'your-auth-domain',
    databaseURL: 'your-database-url',
    storageBucket: 'your-storage-bucket',
    messagingSenderId: 'your-message-sender-id'
  }
```

+++

### Configure the Environment

Edit src/environments/environment.ts
Edit src/environments/environment.prod.ts

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: 'your-api-key',
    authDomain: 'your-auth-domain',
    databaseURL: 'your-database-url',
    storageBucket: 'your-storage-bucket',
  }
};
```

+++

### Import and load FirebaseModule

Edit src/app/app.module.ts

```typescript
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

@NgModule({
  // declarations
  imports: [
    // BrowserModule, etc
    AngularFireModule.initializeApp(environment.firebase),
  ]
  // providers
  // bootstrap
})
```

@[1-2](import modules)
@[8](initialize application with firebase config)

+++

### Import and load FirebaseModule

Edit src/app/app.module.ts

```typescript
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

@NgModule({
  // declarations
  imports: [
    // BrowserModule, etc
    AngularFireModule.initializeApp(environment.firebase),
  ]
  // providers
  // bootstrap
})
```

---

### References

Some Angular.io references:

 - https://angular.io/docs
 - https://github.com/angular/angular-cli/wiki


 Some Firebase references:

 - https://firebase.google.com/docs/web/setup?hl=en-419
 - https://github.com/angular/angular-cli/wiki/stories-include-angularfire

---

### Repository for this talk

[https://github.com/IGZOscarArce/angular-firebase](https://github.com/IGZOscarArce/angular-firebase)

---

# FIN.
