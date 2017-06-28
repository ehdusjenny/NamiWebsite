#Version Control System

Version control system records changes to a file or a set of files.

With this, you can revert your entire project or a set of files to a previous version, compare changes over time, see who modified which changes, when was an issue introduced, who caused it, and more. 

## Centralized Version Control Systems

This system provides a single server that contains all the versioned files, and clients checkout the latest snapshot from that central server. The **downside** to this is the centralized server is the single point of failure. If that server goes down, nobody can collaborate or save any changes. Without proper backups, if the hard disk of the central database is corrupted, you lose everything. 

Examples: CVS, SVN, Perforce

## Distributed Version Control Systems

This system solves the above issue with centralized VCS. Clients fully mirror the repository instead of a single snapshot. If any server dies, any of the client repositories can be copied back up to the server to restore it. Every client repository works as a full backup.

DVCS is also fast since diffs, commits and reverts are all done locally.

Examples: Git, Mercurial, Bazaar, Darcs