# Youdera Commissioning App Frontend

This is the mono repo for the Youndera Commissioning app frontend and the Youdera UI library.

All styling is based on Tailwind.

Canonical repository is here:
https://gitlab.com/younergy/youdera-commissioning-app

## Requirements

- Node 16.14+
- Yarn 1.22+

This repo uses [Yarn](https://classic.yarnpkg.com/lang/en/) as a package manager,
and [Turborepo](https://turbo.build/repo) to manage the monorepo. 

It includes the following packages/apps:

## Apps and Packages

- `commissioning`: The Commissioning Frontend based on [Next.js](https://nextjs.org)
- `ui-docs`: a [Storybook](https://storybook.js.org/) app documenting ui components
- `ui`: a component library of React components consumed by both `commissioning` and `ui-docs` applications, and possibly third parties not hosted in this repo.
- `config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting
## Build

To build all apps and packages, run the following command:

```
cd [workspace]
yarn install
yarn run build
```

Build a single app

```
turbo run build --filter=commissioning...
```

or via yarn workspace commands
```
yarn workspace commissioning build
```

## Develop

To develop all apps and packages, run the following command:

```
cd [workspace]
yarn install
yarn run dev
```

## Commit Message Convention

This starter is using [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/), it is mandatory to use it to commit changes.

## Commisioning

### Docker build

Install Docker on your machine.

From the monorepo root.

Build your container: 
```
docker build -t commissioning-docker -f apps/commissioning/Dockerfile .
```

To see docker build output (useful when developing Dockerfile, buildkit supresses output by default):
```
docker build --progress=plain --no-cache -t commissioning-docker -f apps/commissioning/Dockerfile .
```

Run your container: 
```
docker run -it -p 3000:3000 commissioning-docker
```

You can view your images created with 
```
docker images
```