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

If you're cloning an existing repository, run
```
git clone http://github.com/username/repo_name repository_name
```
`repository_name` is optional; without it, the directory name will be `repo_name`.

To check the status of the files (whether they are tracked, staged, committed, etc), run
```
git status
```

To track a new file, run
```
git add filename
```
Often, there will be files you don't Git to automatically add, like logs. You can define these in your `.gitignore` files using regex, like `*.[oa]` which will ignore all `.o` or `.a` files.

To commit all your staged files, run
```
git commit -m "some message"
```
The commit message is required, and you should describe succinctly what changes you've made.

To skip the `add` and immediately commit all your previously tracked files, run
```
git commit -m -a "some message"
```

To delete a file from Git, run 
```
git rm filename
```
This will remove the file from your staging area as well as from your actual working directory. Simply running `rm filename` will not make any changes to Git.

To rename a file explicitly for Git, run
```
git mv file_from file_to
```

To see your commit history, run
```
git log
```
Most recent commit is at the top.

If you forgot to add a file or messed up your message, run
```
git commit -m "old message"
git add forgotten_file
git commit --amend -m "new message"
```
In the end, you'll have a single commit with the forgotten file and a new message which will overwrite your old message.

To unstage a file, run
```
git reset HEAD no_longer_tracked_file
```
The file will not be included in your next commit.

To discard changes (**it's gone forever**) and revert a file back to when you last committed it, run
```
git checkout -- filename
```

##Working with Remotes
`origin` is the default name Git gives to the server you cloned a repository from.
To see which remotes you are working with, run
```
git remote -v
```
This will show you a list of shorthand names and the corresponding URL.

To add a remote, run
```
git remote add origin2 https://github.com/ehdusjenny/repo
```

To fetch all the data from the remote, run
```
git fetch origin2
```

The data from the new remote `origin2` is now available locally through `origin2/branch_name`.

`fetch` only downloads the Git data to your local directory, but it doesn't automatically merge.

You can also run
```
git pull origin branch
```
which will fetch and merge the remote branch from the remote origin server to your local, currently checked-out branch.



[git]: https://git-scm.com/downloads "Git Download"