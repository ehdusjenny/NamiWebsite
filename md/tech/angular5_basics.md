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

## Components
Angular Components are the basic building blocks of your app.

In your newly created project, you can see everything you need to create a component:
<div class="code">
```
>src
	>app
		app.component.ts 		// Component file
		app.component.html 		// Template
		app.component.scss 		// Styling
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


[node]: https://nodejs.org/en/download/ "Download Node"