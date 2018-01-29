# MVC Basics with ASP.NET

MVC is an architectural pattern that separates an app into three main components: Model, View, and Controller. 

### Models
Models represent the data of the app. Model classes use validation logic to enforce business rules. Typically, model objects are used to retrieve and store/update data in a database.

### Views
Views are your app's UI component, where you display your models.

### Controllers
Classes that handle browser requests, like REST API calls. They retrieve model data and send responses to views. They handle and respond to user input and interaction. 

The three different aspects of the app are loosely separated, making your app less complex and easier to test and debug. You can develop one aspect of the app without depending on the others.

## Simple MVC App

We will be making a basic To-Do List App.

### Steps

1. Install Visual Studio (I use Visual Studio for Mac).
1. From Visual Studio, select <b>File > New Solution</b>.
1. Select <b>.NET Core > App > ASP.NET Core Web App (MVC)</b>.
1. Name the project <b>ToDoApp</b>.
1. You can launch the app to see the default page on browser. Navigate to `http://localhost:port`, where `port` is a randomly assigned port number.
1. Right click on <b>Controllers directory > Add > New File</b>.
	![Branching](../images/tech/mvc_with_aspnet/add_controller.png "Add Controller")
1. Select <b>ASP.NET Core > MVC Controller Class</b>.
	![Branching](../images/tech/mvc_with_aspnet/select_controller.png "Select Controller")
1. Name your controller <b>ToDoAppController</b>.
1. Replace the content with the following:
```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ToDoApp.Controllers
{
    public class ToDoAppController : Controller
    {
        // GET: /ToDoApp/
        public List<string> GetToDoList() => new List<string>{
                "Create a To-Do List",
                "Complete something on To-Do List"
            };
    }
}
```
1. 