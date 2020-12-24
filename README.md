
<img src="https://raw.githubusercontent.com/AlphaByte-dev/alphabyte-website/main/src/images/AlphaByte_logo-only.png" alt="logo" width="100px" align="right" />

# AlphaByte Official Website
Official website of AlphaByte, Amity University Mumbai.

### Table of Contents

‒ [Hosting](#hosting)  
‒ [Tech Stack](#tech-stack)  
‒ [Dev Environment Setup](#environment-setup)  
‒ [Project Structure](#project-structure)  
‒ [Edit Data](#edit-data)  
‒ [Contributing](#contributing)  
‒ [Discord](#discord)  
‒ [License](#license)  

<a id="hosting"></a>
## 🚀 Hosting
Project is currently hosted on [Netlify](https://www.netlify.com/).

**Live URL:** https://alphabyte-aum.netlify.app/

<a id="tech-stack"></a>
## ⚙️ Tech Stack
* HTML, CSS, JavaScript
* [Gulp](http://gulpjs.com) - a task runner to automate the development workflow.
* [Sass](https://sass-lang.com/) - a CSS preprocessor that gives CSS many superpowers.

<a id="environment-setup"></a>
## 🔨 Dev Environment Setup
Let's get the website up the running on your local machine.

### 0. Prerequisites
* Install [Node.js](http://nodejs.org)

### 1. Fork repo
Fork this repo to your GitHub account  
![](https://i.ibb.co/rZSBzQ7/Capture.png)

### 2. Clone repo
Clone the forked repo to your local machine
```bash
git clone https://github.com/<YOUR-GITHUB-USERNAME>/alphabyte-website.git
```
Navigate to project directory
```bash
cd alphabyte-website
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start Dev Server
```bash
npm run start
```
A browser window will automatically open up with a live-reloading preview of the code.

<a id="project-structure"></a>
## 🗃 Project Structure
* `src/` folder contains all the source files.
* `dist/` folder contains generated build files which are to be deployed.
* `src/pages/` folder contains html files corresponding to the pages available on the website.
* `src/sections/` folder contains reusable html files that can be included inside pages. (nav, footer, etc.)
* `src/css/` folder contains page specific css files
* `src/css/all/` folder contains css files that are included in every html page on the website.
* `src/js/` folder contains page specific javascript files
* `src/js/all/` folder contains javascript files that are included in every html page on the website.
* `src/images/` folder contains all images on the website.
* `src/data/` folder contains data files for events and members.
* `src/copy/` folder contains files to be directly copied to root of website (dist/). Contains favicons.
* `gulpfile.js` is the [Gulp](http://gulpjs.com) config file, in-charge of launching dev server, bulding project, minifying JS and CSS, compressing images, etc.
* `babel.config.json` is the [Babel](http://babeljs.com) config file. Babel allows us to use the latest JavaScript features that might not currently be supported in all browsers.

<a id="edit-data"></a>
## 💾 Edit Data
All changing data is saved in separate javascript files as an object so that its easy to modify.
* **Events data**: Modify `src/data/data_events.js` file
* **Members data**: Modify `src/data/data_members.js` file

<a id="contributing"></a>
## 💻 Contributing
* Make sure you have correctly setup your environment by following the steps in [Environment Setup](#environment-setup).
* To work on an feature/issue, make sure to leave a comment under that [issue](https://github.com/AlphaByte-dev/alphabyte-website/issues) or open a [new issue](https://github.com/AlphaByte-dev/alphabyte-website/issues/new) if not already opened. This will make sure that multiple people are not working on the same issue.

<a id="discord"></a>
## 💬 Discord
Connect with us on [Discord](https://discord.gg/rRejGpe).

<a id="license"></a>
## 📜 Licence
This software is open source, licensed under the [MIT License](https://github.com/AlphaByte-dev/alphabyte-website/blob/master/LICENSE).