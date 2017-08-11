#Git vs SVN

In university and among peers, Git is the ultimate version control system (VCS) to use. So when I got my first internship and found out the company used SVN extensively over Git, I wasn't sure of the reason. I recently looked into the differences between Git and SVN and each of their pros and cons.

<table style="width: 100%;">
  <tr>
    <th></th>
    <th>Git</th>
    <th>SVN</th> 
  </tr>
  <tr>
    <th style="white-space: nowrap">Distributed vs Centralized</th>
    <td>Git is a <b>distributed</b> VCS. Every developer has their own local copy of the version history. Local operations are faster. Because everyone has a copy of the entire version history, everyone can see what changes others made. Collaborative work is enhanced.</td> 
    <td>SVN is a <b>centralized</b> VCS. Version history is stored on a remote server. To make changes, you need a constant connection to the server hosting the repository.</td>
  </tr>
  <tr>
    <th style="white-space: nowrap">Storing Binary Files</th>
    <td>Because every developer has the full version history, changes in large binary files cause Git repositories to grow by the size of the modified binary file every time a change is committed.</td> 
    <td>In SVN, only the latest changes are checked out so checkout times are faster for repos with a lot of binary files. This makes SVN more suitable for developers dealing with graphics.</td>
  </tr>
  <tr>
    <th style="white-space: nowrap">Learning Curve</th>
    <td>With large projects, the version history can get extremely complicated with numerous branches, which can be confusing for beginners. Initial learning curve is higher than other filesystem-like VCS.</td> 
    <td>In SVN, there is a single workflow, and everyone checks out and works from the latest changes. This resembles a filesystem, which every computer user is familiar with, so the learning curve is low.</td>
  </tr>
</table>