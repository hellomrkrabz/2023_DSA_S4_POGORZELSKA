Required to install: npm, nodejs, yarn.

https://nodejs.org/en

https://www.npmjs.com/

https://yarnpkg.com/getting-started/install

Before launching, install the above, then enter the project directory and type the command `yarn install`. It should take care of setting up the project.

After new commits you have to create virtual environment and check for new dependencies:
1.    Open powershell and get to the Software-Project folder.
2.    Type the command `Set-ExecutionPolicy Unrestricted -Scope Process`.
3.    Create virtual environment `python -m venv .venv`.
4.    Enable virtual environment `.\.venv\Scripts\Activate.ps1`.
5.    Download dependencies `pip install -r backend\requirements.txt`.

Launching:

a) BACKEND
1.    Open powershell and get to the Software-Project folder.
2.    Type the command `Set-ExecutionPolicy Unrestricted -Scope Process`.
3.    Run with `yarn start-back`.

b) FRONTEND
1.    Open powershell and get to the Software-Project folder.
2.    Run the site with `yarn start`.

Adding custom styling to bootstrap:
1. It's best to use VS Code.
2. Install VS Code plugin called 'Live Sass Compiler'.
3. Be sure to change default location of compiled css files, on the left: 
    1. Extension, Extension settings (gear icon).
    2. change tab to Workspace.
    3. press 'Edit in settings.json' under 'Live Sass .Compiler>Setting: formats'.
    4. "savePath": "src/style/bootstrap/css".
4. If you open project with sass files you should have button 'Watch Sass' with eye icon.
5. After pressing it plugin will trigger sass compilation after every sass file save.

Email:
banana.books.exchange@gmail.com
SoftwareProject2137