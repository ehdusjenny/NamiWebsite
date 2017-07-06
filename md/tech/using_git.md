#Using Git

To learn about Git's philosophy and how it operates, check out [this page][git_philosophy].

Go download [Git][git] if you haven't done that yet.

All the following commands will be run from Git Bash (Linux commands).

##Set-Up
Configure your git account, which you only have to do once per computer.

```
git config --global user.name "Your Username"

git config --global user.email your_email@example.com
```

To check your settings, run `git config --list`.

That's all the basic set-up you need!

##Setting Up Your Git Project
If you're initializing a local Git project, run the following commands:
```
cd /path/to/your/project

git init
```

`git init` creates the `.git` file.

[git]: https://git-scm.com/downloads "Git Download"