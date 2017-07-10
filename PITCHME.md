---

## Mastering NPM
![Angular.io](assets/angular-logo.png)
![Firebase](assets/firebase-logo.png)

---

# Agenda

- Angular.io
- Firebase
- Add Firebase to your Angular application (with angularfire2)
- Use Firebase services from your application (with/without angularfire2)

---

## Angular.io

+++

### Create new project

```sh
$> sudo npm install -g @angular/cli
# installs Angular CLI (the tool to initialize, develop, scaffold and maintain Angular applications)
```
```sh
$> ng new chess && cd $_
# creates new app
$> ng serve
# builds and starts app in a web server
```

---

## Firebase

+++

### What is Firebase?

Real time database and much more...

---

## Add Firebase to your Angular application (with angularfire2)

+++

### Install angularfire2 as a dependency

```sh
$> npm install --save angularfire2 firebase
# creates new app
```

+++

## Get Firebase configuration details

### Log in to the Firebase console.
### Create New Project or open an existing one.
### Click Add Firebase to your web app.
### From the modal window that pops up you copy the config object.

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

## Configure the Environment

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

## Import and load FirebaseModule

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

### Repo for this talk

[git.io/vSYtX](https://git.io/vSYtX)

---

# FIN.
