#Git

Git is a distributed version control system.

Git treats its data differently than other VCS. Most other systems store information as a set of files and the changes made to each file over time.

Git thinks of its data like a set of snapshots of a filesystem. Every time you save the state of your project, it takes a picture of what your files look like at that moment and stores a reference to those snapshots. If file has not changed, Git will just link the previous file. Git thinks about its data like a **stream of snapshots**.

With CVCS, every operation has network latency overhead, but most operations in Git is local. The entire history of your project is on your local disk so most operations are super-fast. This also means you can work offline! 

