#Using Git

All images via [Git Book][https://git-scm.com/book/en/v2]

To learn about Git's philosophy and how it operates, check out [this page][git_philosophy].

Go download [Git][git] if you haven't done that yet.

All the following commands will be run from Git Bash (Linux commands).

##Git Set-Up
Configure your git account, which you only have to do once per computer.

```
git config --global user.name "Your Username"

git config --global user.email your_email@example.com
```
To check your settings, run `git config --list`.

That's all the basic set-up you need!

##Git Project Set-Up
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

To push your changes to a remote server, run
```
git push remote_name branch_name
```
For an example, `git push origin master` will push your changes to the master branch of the remote named origin.

If someone has pushed to the same upstream, you'll have to pull and merge their changes to your local workspace before you can push.

To push your local branch to a remote with a different name, you can run
```
git push remote_name local_branch_name:remote_branch_name
```

To see more information on a particular remote, run
```
git remote show remote_name
```

To rename remotes, run
```
git remote rename origin origin2
```

To remove remotes, run
```
git remote remove origin2
```

##Tags
Git allows you to tag specific points in history, ex. release points like v1.0.

To list tags, run
```
git tag
```

To search for specific tags, like versions after 1.8, run
```
git tag -l "v1.8.*"
```

There are two types of tags.
**Lightweight**: Simple pointer to a specific commit.
**Annotated**: Stored as full objects in the Git database which are checksummed and contains the tagger name, email, date and message.

To create a lightweight tag, run
```
git tag tag_name
```

To create an annotated tag, run
```
git tag -a tag_name -m "my message"
```

To see your tag information, run
```
git show tag_name
```

To tag a historical commit, run
```
git tag -a tag_name checksum_number
```

By default, `git push` does not transfer tags to remote servers.
To explicitly push tags, run
```
git push origin tag_name
```

To push all your tags, run
```
git push origin --tags
```

##Branching 
To create a new branch, run
```
git branch testing
```

![Branching](../images/tech/using_git/branching.png "branching")

Both `master` and `testing` branches are pointing to the same snapshot for now, since you just created `testing`.

Git has a special pointer called `HEAD`, which points to the local branch you're currently on. 

To switch branches, run
```
git checkout testing
```

![Branching2](../images/tech/using_git/branching2.png "branching2")
`HEAD` now points to the branch `testing`.

To create and switch branches in one command, run
```
git checkout -b testing
```

After you've made your changes and commit, your current local branch will move forward:
![Branching3](../images/tech/using_git/branching3.png "branching3")

If you change branch to `master` and make more commits, your tree will diverge:
![Branching4](../images/tech/using_git/branching4.png "branching4")

To see the list of local branches, run
```
git branch
```

To see the last commit on each branch, run
```
git branch -v
```

To visualize your branching history, run
```
git log --oneline --decorate --graph --all
```

Alternatively, you can use [GitKraken][gitkraken], which I recommend.

##Merging
You're currently working on a branch `iss53` solving an issue. However, an important fix is needed so you create branch `hotfix` and fix the problem. Now you want to merge branch `hotfix` onto the production branch `master`, then go back to your own branch.

The commands you'll run are
```
git checkout -b hotfix
~Make some changes~
git commit -a -m "fixed this and that"
git checkout master
git merge hotfix
git checkout iss53
``` 

![Merging](../images/tech/using_git/merging.png "Merging")

![Merging2](../images/tech/using_git/merging2.png "Merging 2")

Simply moving the branch pointer forward up the same line of the tree is called "fast-forwarding".

To delete a branch you no longer need, run
```
git branch -d hotfix
```

When you merge your changes from `iss53` onto `master`, since `master` has branched off from `iss53`, it cannot simply fast-forward. Instead Git creates a new snapshot that joins `iss53`'s line of commits and `master`'s line of commits.
![Merging3](../images/tech/using_git/merging3.png "Merging 3")

Merging can cause conflicts where the same part of the same file is modified by both branches you're merging. In this case, `git merge` will spit out a list of conflicts:
```
CONFLICT (content): Merge conflict in index.html
CONFLICT (content): Merge conflict in app.js
```

You'll have to fix the conflicts and then commit.

The merge conflicts will appear in your files like the following:
```
<<<<<<< HEAD: index.html
<base href="/">
=======
<base href="/my-app">
>>>>>>> iss53:index.html
```

Everything above ======= are the changes from `HEAD`, which is the `master` branch currently checked out. Everything below ======= are the changes from `iss53`. Replace the entire block with whichever change you want to keep, and then commit.

To see which branches are merged into the checked-out branch, run
```
git branch --merged
```

To see which branches are not merged into the checked-out branch, run
```
git branch --no-merged
```

Let's say you have the following configuration:
![Merging4](../images/tech/using_git/merging4.png "Merging 4")

Let's say your `dumbidea` turns out to be good and is merged onto `master`. Also the second solution to iss91 is better over the first so you delete `iss91`.
The resulting tree will look like the following:
![Merging5](../images/tech/using_git/merging5.png "Merging 5")

#Branching with Remotes

Let's say you clone from a repository and make some commits locally. In the meantime, someone else has pushed some commits to the remote server. The tree will look like the following:
![RemoteBranching](../images/tech/using_git/remote_branching.png "Remote Branching")

To update your local repo to the latest changes, run
```
git fetch remote_name
```
![RemoteBranching2](../images/tech/using_git/remote_branching2.png "Remote Branching 2")

You can add multiple remotes and fetch.
![RemoteBranching3](../images/tech/using_git/remote_branching3.png "Remote Branching 3")



[gitkraken]: https://www.gitkraken.com/ "GitKraken"
[git]: https://git-scm.com/downloads "Git Download"