# Tunts.Rocks - Technical Challenge

## Description

An integral part of the Tunts.Rocks selection process, the programming challenge aims to main objective is to evaluate the candidate's programming skills. Taking in counts not only on the successful implementation of the desired functionality, but also on a analysis of the solution structurally, semantically and performatively.

## Technologies

- Node.js
- TypeScript
- Eslint + Prettier
- Jest
- Google Sheets API

## Rating Criteria

- [ ] Good understanding of the problem to be solved;
- [ ] Successful implementation of the functionality;
- [ ] Source code structure;
- [ ] Documentation and use of good practices;
- [ ] Use of basic development tools.

## Business Rules

### Student Situation Calculation

| Absences (%) | Average (avg) | Situation                                 |
| ------------ | ------------- | ----------------------------------------- |
| <= 25%       | avg < 5       | "Reprovado por Nota" (Failed by Grade)    |
| <= 25%       | 5 <= avg < 7  | "Exame Final" (Final Exam)                |
| <= 25%       | avg >= 7      | "Aprovado" (Approved)                     |
| > 25%        | any average   | "Reprovado por Falta" (Failed by Absence) |

### Final Exam Grade Calculation (naf)

> 5 <= (avg + naf) / 2

If the student is in the "Exame Final" (Final Exam) situation, their passing grade must be calculated following the formula above.

However, the value obtained must still be multiplied by 10 (as grades range from 0 to 100) and rounded up in the case of decimal numbers.
​

## Instructions for Running the App

### Google Auth and Google Sheets API

You must configure your authentication with OAuth2 and download your credentials in json format, placing the file (credentials.json) in the project's root folder.

Example file: [credentials](./credentials.example.json)

For security reasons, this file has been added to .gitignore.

The first time you run the command, a browser tab will open, asking for permission.

Remember to add your email address to your Google Auth credentials.

For more details, visite: [Configure OAuth](https://developers.google.com/workspace/guides/configure-oauth-consent?hl=pt-br)

### Scripts

```bash
# install dependencies
$ npm install

# build the project
$ npm run build

# start the already built project
$ npm run start

# development mode
$ npm run start:dev

# build and start the project
$ npm run start:prod

# format code style
$ npm run format

# apply the code lint check and fix
$ npm run lint

# run tests
$ npm run test
```

### Instalation

1. You must make sure you have node.js and npm installed on your machine.
2. Run the `npm install` command to install the project’s dependencies.
3. Run the `npm run start:prod` command to build the project build and start it.
4. Enjoy!!!

## Contact-me

- **Author**: Ícaro Bomfim Teles
- **LinkedIn**: [icarobteles](https://www.linkedin.com/in/icarobteles)
- **GitHub**: [icarobteles](https://www.github.com/icarobteles)
- **Email**: [odevicaroteles@gmail.com](mailto:odevicaroteles@gmail.com)
