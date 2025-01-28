# Mobile III Final Project

Build a capstone project that uses all that you have learned in Mobile Development. 

## Project Idea

Come up with an idea for your project. 
Do not build a simple TODO list come up with something creative. 
Make sure it has enough project scope to challenge all team members **AND** still be able to complete the project before the due date. 
You are required to present a wireframe and design docs in a pitch meeting before starting full development.

## Requirements

- Build a back end in any language/framework you like. 
  - Use validation
  - Use an `.env` file 
  - Use a Database
  - Use with automated tests
- Frontend should be built (see [Frontend](#frontend))
- Use Git
- Each team member needs to pull their own weight in the project. 
- Demo finished project.

## Frontend

You need to speed most of your time building an Expo app that does the following. 

- Consume all the backend API
- Have a good UI/UX
- Use [Router](https://docs.expo.dev/router/introduction/). 
- Use [Color Themes](https://docs.expo.dev/develop/user-interface/color-themes/).

## Project Management 

### Development Cycle

This project is large. 
You need to start small and build up. 
Do not silo different parts of the team into "backend", "database" or "frontend".

This is how I recommend you build this project:

1. One person initializes the frontend and one person initializes the backend
2. Make a branch in git named after a new **small** feature i.e. "seeding the database"
3. Add the **small** feature to the backend. Consume it in the front end. **Do not continue** until the feature works across the two apps.
4. Build tests for the feature (frontend and backend)
5. Mirage into `main` git branch
6. Go back to step 2. 

### Communication 

You will need to work with your team via several means of communication.
Talk to your team though the communication channels given to you to collaborate.
You should often meet to keep every member of the team busy and informed on press. 
Use Git effectively with [proper commit messages](https://www.freecodecamp.org/news/how-to-write-better-git-commit-messages/).

### Docs

Your project needs to be well-documented thought. 
This means comments though out the code should explain why code was written in the way it was **NOT** how it works.
Build a `README.md` file written in [Markdown](https://commonmark.org/help/) and replace this document with it (you can move this file to `/instructions`). 

In this `README.md` should include the following: 
- Who worked on the project.
- What the project does/is. 
- The tech stack of frontend and backend
- The DB used and now to build/seed it.
- How to run the project

## Deploying

You need to deploy your frontend and backend. 

- Frontend, should be build using [EAS](https://docs.expo.dev/build/eas-json/). Please build an Android APK.
- Backend, should be able to be run in docker. 

## Rubric

This project is graded based on execution and quality of the code submitted. 
Each feature is evaluated individually. 
It is assumed that all work is done by the student that submitted the work unless otherwise cited.

[//]: # (| Topic                       | Task                                                                                                                                                                                     | Points |)

[//]: # (|-----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------|)

[//]: # (| **Model**                   | Project's Model is build out in a logical manner to support the rest of the project                                                                                                      | 3pts   |)

[//]: # (| **Repository and Services** | Project has repositories for each model.                                                                                                                                                 | 2pts   |)

[//]: # (|                             | Project has services layer. These classes should hold logic for database actions not covered by Repository. Service layer **includes validation** and throws errors.                     | 6pts   |)

[//]: # (| **Controller**              | Users Controller: holds all necessary end points to handle creating users and keeping there scores.                                                                                      | 2pts   |)

[//]: # (|                             | Test Controller: holds all necessary end points to have users take test.                                                                                                                 | 2pts   |)

[//]: # (| **Frontend**                | Web pages are stylized to look and feel like modern web pages                                                                                                                            | 2pts   |)

[//]: # (|                             | Web UI is able to perform all tasks in a user friendlily manner.                                                                                                                         | 5pts   |)

[//]: # (| **Project Management**      | Project is stored and managed with Git. Team member has a rich commit history with well defined commit/pull comments.                                                                    | 3pts   |)

[//]: # (|                             | Project is well documented using `README.md`. Project has comments and JavaDocs throughout.                                                                                              | 1pt    |)

[//]: # (|                             | Participation and attendance. Team member communicated well with there team. Team member pulled there weight on the project without this you are disqualified on the rest of the rubric. | 5pts   |)

[//]: # (|                             | Presentation is given. Team is prepared to demonstrate the project they have built.                                                                                                      | 3pts   |)

[//]: # (| **Total**                   |                                                                                                                                                                                          | 40pts  |)