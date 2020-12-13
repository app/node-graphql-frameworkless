## Drop-in template/boilerplate for plain/frameworkless Node.js+GraphQL server application start
Simple GraphQL API Node.js application — is the best usage case of the template.  

### How to install and use
To install  
```
git clone https://github.com/app/node.frameworkless.boilerplate.git my-best-app
cd my-best-app
rm -Rf .git && git init && git add . && git commit -m Import
npm i
```
To run
```
npm run dev
```
To use
```
curl -d '{hello}' http://localhost:3080
curl -d '{hello{myName:"User"}}' http://localhost:3080
# Schema introspection
./utils/graphql-schema.sh
```

### Main features
- Command line oriented development. No IDE, no framework, just your faivorite code editor and powerful set of tools 
- Hot page and resource reloading while code editing in development mode
- No paths in imports. Just dependency name for vendor libs as well as your modules located in 
 `app/node_modules` folder for Node’s dependencies resolution algorithm  

### Folders structure

- `/app` — server side application code folder
- `/app/node_modules` - place your server modules here
- `/deploy` — files and guides for server app deployment

### How to use in development
Add your code modules inside ```/app/node_modules/``` folder  
Import modules GraphQL types and resolvers in ./app/server.js  
Start you server app with
```
npm run dev
```
### How to use for production
If you planning docker deployment
```
npm start
```
Or setup and start ```systemd``` service with [this example](deploy/README.md)  

### Troubleshooting
#### Safe Write
Some text editors and IDE's have a feature called safe write that basically prevents data loss, by taking a copy of the file and renaming it when saved.  
  
This feature blocks the automatic detection of file updates. To disable safe write use the options provided below:  

- Sublime Text 3 add atomic_save: "false" to your user preferences.  
- IntelliJ use search in the preferences to find "safe write" and disable it.  
- Vim add :set backupcopy=yes to your settings.  
- WebStorm uncheck Use "safe write" in Preferences > Appearance & Behavior > System Settings.  

### References
- Node 8.x API Reference
- [plain vanilla node.js intro tutorial](https://gist.github.com/shimondoodkin/6213581)
- [Working without frameworks](https://medium.com/node-js-javascript/working-without-frameworks-part-1-b948f281f782)
- [Running Node.js on Linux with systemd](https://blog.codeship.com/running-node-js-linux-systemd/)
- [Parcel bundler](https://parceljs.org/)
