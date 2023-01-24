# Full Stack Application Group Project

## Snack-a-log

Create an app that allows users to log their favorite snacks. Add functionality that will enable users to see whether or not their snack is healthy based on a simple algorithm.

For this project, there are 40 features or functionality to build. You are required to successfully build a minimum of 28 features to pass this project.

## Overview

> **Note**: You should start with the back-end.
- You will be working in groups of 4 for this 4 day Sprint.
- You will be given 4 tokens. These tokens represent the number of debugging questions **per team** you are allowed to ask an instructor during this complete sprint. (clarifying questions about the instructions are not included)
- Using the [`project-snack-a-log-frontend`](https://github.com/9-1-pursuit/project-snack-a-log-frontend) and [`project-snack-a-log-backend`](https://github.com/9-1-pursuit/project-snack-a-log-backend) repos, create a full-stack web application by building the two applications and having them interact.
- Use Express to build a complete CRUD back-end application that adheres to RESTful routes.
- Use back-end unit tests to guide the building process.
- Deploy the applications separately so that anyone can see them online and the two online applications can interact.

## User Stories, Acceptance Criteria, and Code Quality Rubric

### Back-end

1. Basic root route that returns a string
1. Snacks resource
1. Get one (with the correct id)
1. Get one (non-matching id, sends 404)
1. Delete (with a valid id)
1. Delete (handles invalid id)
1. Get all snacks
1. Create a snack with all fields completed
1. If no image is provided, create a snack and set a default image.
1. Correctly capitalize snack name - for snack names with two or more letters
1. Correctly capitalize snack name with multiple words
1. Correctly fix capitalization, regardless if the input is lowercase or uppercase
1. Snack Health Check logic
1. Checks if the snack has enough fiber
1. Checks if the snack has enough protein
1. Checks if the snack has enough fiber and protein
1. Checks if the snack has enough fiber but too much sugar
1. Checks if the snack has enough protein but too much sugar
1. Checks if the snack has enough fiber and protein, but too much sugar
1. Checks if the snack does not have enough protein or fiber and has too much sugar
1. Checks if the snack has invalid or missing information
1. Back-end hosted and accessible online

> **Total**: 22 points

> **Note**: There are no back-end tests; your hosted application's functionality and code quality will be used to evaluate you.


### Snack Schema
- id: serial, should be primary key
- name: string, name value is required
- fiber: number, default 0, fiber value is required
- protein: number, default 0, protein value is required
- added_sugar: number, default 0
- isHealthy: boolean
- image: string, default `https://dummyimage.com/400x400/6e6c6e/e9e9f5.png&text=No+Image`


### Seed Data

```sql
INSERT INTO snacks (name, fiber, protein, added_sugar, is_healthy, image) VALUES
('Strawberries', 20, 10, 0, true, 'https://picsum.photos/id/1080/300/300'),
('Raspberries', 16, 4, 0, true, 'https://picsum.photos/id/102/300/300'),
('Honey Covered Granola',  30, 12, 22, false, 'https://picsum.photos/id/312/300/300'),
('New Wave Nuts', 11, 55, 9, true, 'https://picsum.photos/id/139/300/300'),
('Raw Onions & Turnips', 11, 9, 9, true, 'https://picsum.photos/id/292/300/300'),
('Healthy Birthday Cake Square', 4, 8, 19, false, 'https://content.nutrisystem.com/images/products/alc/large/BirthdayCakeSquare_L.jpg');

```

### Additional points:

- Completed front-end (see [project-snack-a-log-front-end](https://github.com/9-1-pursuit/project-snack-a-log-frontend) for more details)

> **Grand total**: 45 points

## Getting Started

Create a top-level folder that will contain both your back-end and front-end applications:

1. Create a directory called `project-snack-a-log`.
1. `cd` into the directory.
1. Fork and clone the [`project-snack-a-log-back-end`](https://github.com/9-1-pursuit/project-snack-a-log-backend) repo into your `project-snack-a-log` directory.
1. Change the name of your `project-snack-a-log-backend` directory to `back-end`.

### Back-end setup

It would be best to open a new terminal tab dedicated to running and developing your back-end.

- `cd back-end`
- `touch .env`

**.env**

```
PORT=3333
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=snack_a_log
```

- `npm install` - install npm packages listed in `package.json`.
- `npm run db:init` - initialize a new database and create tables.
- `npm run db:seed` - seed the table(s) with some data.
- `nodemon` - confirm that this is running on port 3333.
- Visit http://localhost:3333/snacks/ and make sure you see some snack data in the form of an array of objects.
- `npm run test` - to run the back-end tests.

### Front-end setup

When you are ready (discuss with your collaborators), move on to the front-end part of the project. Be prepared to explain how you organized your time and work for this project.

## Resources

Use the resources below to deploy your application.

### Back-end Deployment

1. [Render.com Deployment Instructions](https://github.com/9-1-pursuit/guide-deployment/tree/main/render-express-postgres)
2. [Render.com Deployment Video Part 1, Express](https://drive.google.com/file/d/1JefmByjhsh8zoLwzpwdv-Hn9Wg4ezaOB/view?usp=sharing)
3. [Render.com Deployment Video Part 2, Postgresql](https://tobecreated)
