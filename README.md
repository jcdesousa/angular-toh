# TourOfHeroes

The _Tour of Heroes_ tutorial covers the fundamentals of Angular.  
In this tutorial you will build an app that helps a staffing agency manage its stable of heroes.

This basic app has many of the features you'd expect to find in a data-driven application.
It acquires and displays a list of heroes, edits a selected hero's detail, and navigates among different views of heroic data.

You'll learn enough Angular to get started and gain confidence that Angular can do whatever you need it to do. 

## **Setup**

### Install the Angular CLI

 Install the [Angular CLI](https://github.com/angular/angular-cli), if you haven't already done so.

```sh
npm install -g @angular/cli
```

### Get the application
```sh
git clone https://github.com/jcdesousa/angular-toh.git angular-toh
```

### Install the dependencies

Go to the project directory and install the dependencies.

```sh
cd angular-toh
npm install
```


## **Commands**


### Serve the application

The `ng serve` command builds the app, starts the development server, watches the source files, and rebuilds the app as you make changes to those files.

The `--open` flag  opens a browser to `http://localhost:4200/`.
```sh
ng serve --open
```
You should see the app running in your browser.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

----

## **Get started**
## 1 - The Hero Editor

Update the binding in the template to announce the hero's name and show both `id` and `name` in a details layout like this:

```html
<!-- src/app/hero-detail/hero-detail.component.html !-->

<div>
    <h2>{{ hero.name }} Details</h2>
    <div><span>id: </span>{{hero.id}}</div>
    <div><span>name: </span>{{hero.name}}</div>
</div>
```

### **Add a _hero detail_ route**

A URL like `~/detail/11` would be a good URL for navigating to the *Hero Detail* view of the hero whose `id` is `11`. 

Open `AppRoutingModule` and import `HeroDetailComponent`.

```typescript
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
```

Then add a parameterized route to the AppRoutingModule.routes array that matches the path pattern to the hero detail view.

```typescript
{ path: 'detail/:id', component: HeroDetailComponent },
```

### **Format with the _UppercasePipe_**
Modify the selectedHero.name binding like this.

```html
<!-- src/app/heroes/hero-detail.component.html !-->

<h2>{{ hero.name | uppercase }} Details</h2>
```
Now the selected hero's name is displayed in capital letters.

### **Hide empty details with** _*ngIf_

The component should only display the selected hero details if the hero exists.

```html
<!-- src/app/heroes/hero-detail.component.html (*ngIf) -->

<div *ngIf="hero">
  ...
</div>
```

### **Edit the Hero**
Users should be able to edit the selected hero name in an `<input>` textbox.

To automate that data flow, setup a two-way data binding between the `<input>` form element and the `hero.name` property.

```html
<!-- src/app/heroes/hero-detail.component.html !-->

<input [(ngModel)]="hero.name" placeholder="name"> 
```

### **Import _FormsModule_**
Although ngModel is a valid Angular directive, it isn't available by default. 

It belongs to the optional `FormsModule` and you must _opt-in_ to using it.

Open `AppModule` (`app.module.ts`) and import the `FormsModule` symbol from the `@angular/forms` library. 

```typescript
//app.module.ts (FormsModule symbol import)

import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
```
Then add `FormsModule` to the `@NgModule` metadata's `imports` array, which contains a list of external modules that the app needs.

```typescript
//app.module.ts ( @NgModule imports)

imports: [
  BrowserModule,
  FormsModule
],
```
### **Find the way back**

By clicking the browser's back button, you can go back to the hero list or dashboard view, depending upon which sent you to the detail view.

It would be nice to have a button on the `HeroDetail` view that can do that.

``` html
<!-- src/app/hero-detail/hero-detail.component.html (back button)-->

<button (click)="goBack()">go back</button>
```

### **Update heroes**

Editing a hero's name in the _hero detail_ view.

As you type, the hero name updates the heading at the top of the page. But when you click the "go back button", the changes are lost.

If you want changes to persist, you must write them back to the server.

At the end of the hero detail template, add a save button with a `click` event binding that invokes a new component method named `save()`.

``` html
<!-- src/app/hero-detail/hero-detail.component.html (save) -->

<button (click)="save()">save</button>
```

Add the following save() method, which persists hero name changes using the hero service updateHero() method and then navigates back to the previous view.


```typescript
save(): void {
    this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
}
```
-----

## **2 - Heroes Component**

Using the Angular CLI, generate a new component named `heroes`.

```sh
ng generate component heroes
```

### **Displaying heroes**

Import the `hero` and `HeroService`.

```typescript
// src/app/heroes/heroes.component.ts (import HEROES)

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

```
Add a heroes property to the class that exposes these heroes for binding.

```typescript
// src/app/heroes/heroes.component.ts

heroes: Hero[];
```
### **Inject the `HeroService`**

Add a private `heroService` parameter of type `HeroService` to the constructor.

```typescript
// src/app/heroes/heroes.component.ts

constructor(private heroService: HeroService) { }
```

### **Add _getHeroes()_**
Create a function to retrieve the heroes from the service.

```typescript
// src/app/heroes/heroes.component.ts

getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
}
```
### **Call it in `ngOnInit`**

While you could call `getHeroes()` in the constructor, that's not the best practice.

Reserve the constructor for simple initialization such as wiring constructor parameters to properties.
The constructor shouldn't _do anything_.

```typescript
// src/app/heroes/heroes.component.ts

ngOnInit() {
    this.getHeroes();
}
```

### **List heroes with** _*ngFor_

Open the `HeroesComponent` template file and add the following to the top of the file:
```html
<!-- heroes.component.html (template excerpt) -->

<h2>My Heroes</h2>
<ul class="heroes">
  <li *ngFor="let hero of heroes">
      <span class="badge">{{hero.id}}</span> {{hero.name}}
  </li>
</ul>
```

### **Add a _heroes_ route**

You intend to navigate to the `HeroesComponent` when the URL is something like `localhost:4200/heroes`.

Import the `HeroesComponent` so you can reference it in a `Route`. Then define an array of routes with a single route to that component.

```typescript
// src/app/app-routing.module.ts

import { HeroesComponent }      from './heroes/heroes.component';

const routes: Routes = [
  // ...
  { path: 'heroes', component: HeroesComponent }
];
```

Once you've finished setting up, the router will match that URL to path: 'heroes' and display the HeroesComponent.

### **Add a navigation link to heroes route (routerLink)**

```html
<!-- src/app/app-component.html -->

<a routerLink="/heroes">Heroes</a>
```

### **Style the heroes**

The heroes list should be attractive and should respond visually when users hover over and select a hero from the list.

```css
/* src/app/heroes/heroes.component.css (HeroesComponent's private CSS styles) */

.heroes {
  margin: 0 0 2em 0;
  list-style-type: none;
  padding: 0;
  width: 15em;
}
.heroes li {
  position: relative;
  cursor: pointer;
  background-color: #EEE;
  margin: .5em;
  padding: .3em 0;
  height: 1.6em;
  border-radius: 4px;
}
 
.heroes li:hover {
  color: #607D8B;
  background-color: #DDD;
  left: .1em;
}
 
.heroes a {
  color: #888;
  text-decoration: none;
  position: relative;
  display: block;
  width: 250px;
}
 
.heroes a:hover {
  color:#607D8B;
}
 
.heroes .badge {
  display: inline-block;
  font-size: small;
  color: white;
  padding: 0.8em 0.7em 0 0.7em;
  background-color: #607D8B;
  line-height: 1em;
  position: relative;
  left: -1px;
  top: -4px;
  height: 1.8em;
  min-width: 16px;
  text-align: right;
  margin-right: .8em;
  border-radius: 4px 0 0 4px;
}
 
.button {
  background-color: #eee;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  cursor: hand;
  font-family: Arial;
}
 
button:hover {
  background-color: #cfd8dc;
}
 
button.delete {
  position: relative;
  left: 194px;
  top: -32px;
  background-color: gray !important;
  color: white;
}
```

### **Links to Hero Details**
Wrap the badge and name in an anchor element (`<a>`), and add a routerLink attribute to the anchor that is the same as in the dashboard template

```html
<ul class="heroes">
  <li *ngFor="let hero of heroes">
    <a routerLink="/detail/{{hero.id}}">
      <span class="badge">{{hero.id}}</span> {{hero.name}}
    </a>
  </li>
</ul>
```

### **Add a new hero**

To add a hero, this app only needs the hero's name. You can use an `input`
element paired with an add button.

Insert the following into the `HeroesComponent` template, just after
the heading:

```html
<div>
  <label>Hero name:
    <input #heroName />
  </label>
  <!-- (click) passes input value to add() and then clears the input -->
  <button (click)="add(heroName.value); heroName.value=''">
    add
  </button>
</div>
```

Add the `add` and `delete()` handler to the component.

```typescript
    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.heroService.addHero({ name } as Hero)
        .subscribe(hero => {
            this.heroes.push(hero);
        });
    }

    delete(hero: Hero): void {
        this.heroes = this.heroes.filter(h => h !== hero);
        this.heroService.deleteHero(hero).subscribe();
    }
```

### **Delete a hero**

Each hero in the heroes list should have a delete button.

Add the following button element to the `HeroesComponent` template, after the hero name in the repeated `<li>` element.

```html
<button class="delete" title="delete hero" (click)="delete(hero)">x</button>
```

The HTML for the list of heroes should look like this:

```html
<!-- src/app/heroes/heroes.component.html (list of heroes) -->
<ul class="heroes">
  <li *ngFor="let hero of heroes">
    <a routerLink="/detail/{{hero.id}}">
      <span class="badge">{{hero.id}}</span> {{hero.name}}
    </a>
    <button class="delete" title="delete hero" (click)="delete(hero)">x</button>
  </li>
</ul>
```

### **3 - Message Service**

In this section you will 

* add a `MessagesComponent` that displays app messages at the bottom of the screen.
* create an injectable, app-wide `MessageService` for sending messages to be displayed
* inject `MessageService` into the `HeroService`
* display a message when `HeroService` fetches heroes successfully.

### Create _MessageService_

Use the CLI to create the `MessageService`. The `--module=app` option tells the CLI to provide this service in the `AppModule`,


```sh
ng generate service message --module=app
```

### Display  _MessagesComponent_

Open `MessageService` and replace its contents with the following.
```typescript
import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
```
The service exposes its cache of messages and two methods: one to add() a message to the cache and another to clear() the cache.

Modify the `AppComponent` template to display the MessagesComponent

```html
<!-- /src/app/app.component.html -->

<app-messages></app-messages>
```

### **Display the message from `MessagesComponent`**

The `MessagesComponent` should display all messages, including the message sent by the `HeroService` when it fetches heroes.

Open `MessagesComponent` and import the `MessageService`.

```typescript
// /src/app/messages/messages.component.ts (import MessageService)

import { MessageService } from '../message.service';
```

Modify the constructor with a parameter that declares a public `messageService` property. Angular will inject the singleton `MessageService` into that property when it creates the `HeroService`.


```typescript
// /src/app/messages/messages.component.ts

constructor(private messageService: MessageService) { }
```
The `messageService` property must be public because you're about to bind to it in the template.


### **Send a message from `HeroService`**
Inject `MessageService` into the constructor in a private property called `messageService`.

```typescript
// src/app/hero.service.ts
import { MessageService } from './message.service';

constructor(
  private http: HttpClient,
  private messageService: MessageService) { }

```
Modify the `log` method in `HeroService` to send the log message.

```typescript
// src/app/hero.service.ts

private log(message: string) {
  this.messageService.add('HeroService: ' + message);
}
```

## See it run
You're at the end of your journey, and you've accomplished a lot. **Congrats, You are awesome!**

