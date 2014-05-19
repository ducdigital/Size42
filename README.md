Size42
======
[![Build Status](https://travis-ci.org/ducdigital/Size42.svg?branch=develop)](https://travis-ci.org/ducdigital/Size42)
_____

Coding Instructions
--------------------
To generate a new Meteor Collections:
```shell
yo meteor:collection yourCollectionName
```

To generate a new Meteor View:
```shell
yo meteor:view viewName to generate a view
```

To install project dependencies:
```shell
mrt install
```

To run tests:
```shell
laika
```

Git Cheatsheet
---------------
**Pull newest version from Github:**
```shell
git pull
```

**Commit changes:**
```shell
git add . (to check for all files and directories for change, can replace "." to filename or directory)
git commit -m "Your commit description"
git push
```

**Remove all changes:**
```shell
git reset --hard
```

**Change to develop branch:**
```shell
git checkout develop
```

Pre-start
---------
Run the ff. code before develop:
```shell
 npm install -g meteorite
 npm install -g laika 
 npm install -g yo
 npm install -g generator-meteor
```

Changes
-------

__2014-05-20__
- Introduce new folder structure
- Introduce Laika testing suite
- Added authentication with Facebook, Google and Twitter.
