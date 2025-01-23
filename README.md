# Angular 19 Project

This project is built with Angular 19 and provides functionality for user registration and login entirely on the browser side. After logging in, users are redirected to a currency conversion page where they can save results in a table. The table remains accessible until the application is reloaded.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v22.x or higher recommended)
- npm (v10.x or higher recommended)
- Angular CLI (v19 or higher)

### Setting Up the Environment

To work with the currency converter API, you need to:

1. Rename the file `.env.dev.example` to `.env.dev`.
2. Open the `.env.dev` file and replace `YOUR_API_KEY` with your actual API key for the currency converter API.

```env
FREECURRENCY_API_KEY=your-api-key-here
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/alexdiesel/currency-converter.git
   ```
2. Navigate to the project directory:
   ```bash
   cd currency-converter
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the application in development mode:
```bash
npm start
```
This command sets up the development environment using the `.env.dev` file and launches the application.

## Scripts

The project includes several npm scripts for development and maintenance:

- **`npm run env:dev`**: Executes the `env.sh` script to load environment variables from `.env.dev`.
- **`npm run ng`**: Shortcut for running Angular CLI commands.
- **`npm start`**: Sets up the development environment using `.env.dev` and starts the application without live reload.
- **`npm run build`**: Compiles the application for production.
- **`npm run watch`**: Continuously builds the application in development mode.
- **`npm test`**: Runs unit tests for the application.
- **`npm run lint`**: Checks the code for linting issues.
- **`npm run lint:fix`**: Fixes linting issues automatically where possible.
- **`npm run stylelint`**: Checks SCSS files for linting issues.
- **`npm run stylelint:fix`**: Fixes SCSS linting issues automatically where possible.
- **`npm run prettier`**: Formats the codebase using Prettier.

## Code Quality

This project enforces code quality standards using:

- **ESLint**: For JavaScript/TypeScript linting.
- **Stylelint**: For SCSS linting.
- **Prettier**: For consistent code formatting.

Ensure you run the appropriate linting and formatting commands before committing your changes.

## Building for Production

To build the application for production:
```bash
npm run build
```
The output will be located in the `dist/` directory.

## Testing

To run unit tests:
```bash
npm test
```

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
---

For more information, refer to the [Angular documentation](https://angular.io/docs).

