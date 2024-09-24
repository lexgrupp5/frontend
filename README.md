# Frontend - Lexicon LMS

## Generate API

- Install NSwag.ConsoleCore: `dotnet tool install --global NSwag.ConsoleCore`

- Start backend

- Generate API by running one of the following commands from `frontend/src` root folder:
  - `nswag.exe run backend.nswag`, or
  - `npm run generate:api`

## Generate backend.nswag

If API endpoints have been updated, use `NSwagStudio` tool to generate a new `frontend/src/apiGenerated/index.ts` file and a new `backend.nswag`

- Install `NSwagStudio UI` https://github.com/RicoSuter/NSwag/wiki/NSwagStudio

- Start your backend

- Start `NSwagStudio.exe` and enter the URL to swagger.json, e.g., `http://localhost:5144/swagger/v1/swagger.json`

- In section *'Typescript Client, Settings'*, select options

  - Typescript version `4.3`

  - Inline named dictionaries

  - Inline named any schemas

  - Generate Client Classes

  - Template Axios

  - Use the AbortSignal

  - Operation Generation Mode: `MultipleClientsFromPathSegment`

  - Class name: `{controller}Client`

  - Export types (classes interfaces and enums)

  - Generate interfaces from client classes

  - Generate optional parameters (reorder parameters (required first, optional at the end) and generate optional parameters)

  - Exception class name: `ApiException`

  - Generate DTO types

  - Type Style: `Class`

  - Enum Style: `Enum`

  - Null value used in object initializers: `Undefined`

  - Generate default values for properties

  - Mark optional properties with ?

  - Import required types

  - Generate constructor interface which is used to initialize the class

  - Output file path to point to your `frontend/src/apiGenerated/index.ts` path

  - New Line Behavior: `Auto`

- **Generate Code**: Use *'Generate Outputs'* and copy and paste content to `frontend/src/apiGenerated/index.ts` or use *'Generate Files'* to generate new file to your `frontend/src/apiGenerated/index.ts` path.

- **Generate backend.swag** Select `file` in the left corner and select `save as` to point to your `frontend/src/backend.swag` path 
