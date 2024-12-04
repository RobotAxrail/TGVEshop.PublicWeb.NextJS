# Getting Started with ECOM Public Web

## Project Information

1. 2 CSS systems - SCSS & Material UI, to change the theme color need to go 2 places (styles/index.js & styles/index.scss)
   - (index.js) Change the color hex code in the variable defined at the top of the file
2. Every text should use Typography from MUI so that can be customize in createMuiTheme
   - Use default variant if no customization needed (https://v4.mui.com/customization/typography/#responsive-font-sizes)
3. All Components should go to “components” folder. While pages stay at “pages” folder
4. Husky is used to maintain the same format of the code applied to all files.
5. Definition of different breakpoints
   - sm-down = phone
   - md-down = tablet (portrait)
   - lg-down = tablet (landscape), small laptop
   - xl-down = laptop, desktop
6. Padding of page in different breakpoints
   - sm = 10px
   - md = 50px
   - lg = 90px
   - xl = 150px
7. To change the global font type, go to styles/index.js.
   - List of web safe CSS font: https://www.cssfontstack.com/
   - Reference: https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Fundamentals
8. Always consider UI in different breakpoints.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run codegen`

Runs the codegen command to keep the graphql schema up-to-date.\


## Semantic commits

Please use `Semantic Commits` while you commit your code changes. It helps reviewers to review the code and makes you a **better coder**.

```feat: (new feature for the user, not a new feature for build script)
feat: (adding new feature)
fix: (bug fix for the user, not a fix to a build script)
docs: (changes to the documentation)
style: (formatting, missing semi colons, etc; no production code change)
refactor: (refactoring production code, eg. renaming a variable)
test: (adding missing tests, refactoring tests; no production code change)
dx: (dev experience; anything that helps to improve developers' experience)
chore: (updating grunt tasks etc; no production code change)
```

#### Example

```bash
feat: added authentication using Cognito auth
```

[learn more about semantic commits](https://www.conventionalcommits.org/en/v1.0.0/)
