
<img src="https://raw.githubusercontent.com/AlphaByte-dev/alphabyte-website/main/src/images/AlphaByte_logo-only.png" alt="logo" width="100px" align="right" />

# AlphaByte Official Website
Official website of AlphaByte, Amity University Mumbai.

### Table of Contents

‒ [Tech Stack](#tech-stack)  
‒ [Environment Setup](#environment-setup)  
‒ [How It Works](#how-it-works)  
‒ [Contributing](#contributing)  
‒ [Discord](#discord)  
‒ [License](#license)  

<a id="tech-stack"></a>
## ⚙️ Tech Stack
* [Gulp](http://gulpjs.com) is a task runner to automate the development workflow.
* [Sass](https://sass-lang.com/) is a CSS preprocessor that gives CSS many superpowers.
* HTML, CSS, JavaScript

<a id="environment-setup"></a>
## 🔨 Environment Setup
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

<a id="how-it-works"></a>
## 🚀 How It Works
* `src/` folder contains all the source files.
* `dist/` folder contains generated build files which are to be deployed.
* `src/pages/` folder contains html files corresponding to the pages available on the website.
* `src/sections/` folder contains reusable html files that can be included inside pages. (nav, footer, etc.)
* `gulpfile.js` is the [Gulp](http://gulpjs.com) config file, in-charge of launching dev server, bulding project, minifying JS and CSS, compressing images, etc.
* `babel.config.json` is the [Babel](http://babeljs.com) config file. Babel allows us to use the latest JavaScript features that might not currently be supported in all browsers.

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