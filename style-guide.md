**Variables:**

1. For constants and variables, use camelCase.

   - Example: `cartItems`, `htmlItems`, `newItem`

2. Constants or variables that represent a DOM element can start with 'el'.
   - Example: `elCartButton`, `elProductList`

**Functions:**

1. For function names, use camelCase.

   - Example: `renderCartContents`, `cartItemTemplate`

2. Function names that generate HTML templates can be named with a 'Template' suffix.
   - Example: `cartItemTemplate`

**Files and Modules:**

1. File names should be in kebab-case and have a descriptive name reflecting the module's purpose.

   - Example: `utils.mjs`

2. Use a `.mjs` extension for ES6 modules.

**Folders:**

1. Folder names should be in kebab-case and represent the category or type of content within the folder.
   - Example: If you have a folder for utilities, name it `utils`, and if you have a folder for components, name it `components`.

**Singular vs. Plural:**

- Use singular variable names for individual values or objects (e.g., `user`, `item`).
- Use plural variable names for collections or arrays (e.g., `users`, `items`).

**Verb Position in Function Names:**

- Function names an start with a verb to indicate their action ("verb-first" convention).
