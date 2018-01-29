# AngularJS Basics

## Prerequisite
Install [Node][node].

## Installation
Angular CLI is the easiest and fastest way to get started and develop.
We will create a project called my-project.

Run the following commands:
<div class="code">
```
	npm install @angular/cli -g
	ng new my-project --style=scss --routing
	cd my-project
```
</div>

`--style=scss` flag specifies that we want to use the Sass compiler for styling, and `--routing` flag creates a file `app-routing.module.ts` to store the module routes.

To run your project in a browser, run `ng serve`.

Note that the app will be reloaded automatically when changes are made to any of the source files.

## Components
Angular Components are the basic building blocks of your app.

In your newly created project, you can see everything you need to create a component:
<div class="code">
```
>src
	>app
		app.component.ts 		// TypeScript Component file
		app.component.html 		// HTML Template
		app.component.scss 		// SCSS Styling
```
</div>

Within `src/app/app.component.ts` we have:
<div class="code">
```
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
}
```
</div>

As you can see above, every Component file must define the following:
	1. Any imports needed by the component
	1. A component decorator, where you can specify many properties, such as the template url, CSS, host, animation, etc
	1. A class to contain the component's logic

To use this component, plug in `<app-root></app-root>`, i.e. the selector as specified by the component file. You can see this in action when you run your app on the browser. Your browser will load `src/index.html`, which contains the `app-root` component.

It is good practice to separate the components by folders, like:
<div class="code">
```
>src
	>app
		>home
			...
		>about
			...
		>contact-us
			...
```
</div>
Each of the `src/app/*` component folders should contain a stylesheet, template and component file.

You can also use the Angular CLI to create components for you:
<div class="code">
```
ng generate component home

// or equivalently

ng g c home
```
</div>

Go ahead and create two components `home` and `about`. You will see two folders appear under `src/app`, each corresponding to the aforementioned components.

Replace `src/app/app.component.html` with the following:
<div class="code">
```
<ul>
  <li><a routerLink="about">About</a></li>
</ul>

<app-home></app-home>

<router-outlet></router-outlet>
```
</div>

In `app.module.ts`, add the following:
<div class="code">
```
...
import { RouterModule } from '@angular/router';
...

@NgModule({
  ...
  imports: [
  	...
    RouterModule.forRoot([
    {
      path: 'about',
      component: AboutComponent
    }
    ])
  ],
  ...
})
```
</div>

The `app-home` tag is the name specified in `src/app/home/home.component.ts`.

The `router-outlet` tag is a placeholder to display the component you route to.
Run the app on the browser. When you click the About link, the About page should be displayed in place of the`router-outlet` tag.

In the end, you should see the texts `home works!` and `about works!`.

## Interpolation

To inject objects from the component class to the template, you can use interpolation. 

The format for interpolation is: `{{ variableName }}`.

In `src/app/home.component.ts`, replace the class with:
<div class="code">
```
export class HomeComponent implements OnInit {

  name: string = "World";

  constructor() { }

  ngOnInit() {
  }

}
```
</div>

In `home.component.html`, replace the content with:
<div class="code">
```
<p>
  Hello {{ name }}!
</p>
```
</div>

When you open the app on the browser, you should see "Hello World!" printed.

[node]: https://nodejs.org/en/download/ "Download Node"