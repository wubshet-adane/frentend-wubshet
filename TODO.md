# TODO: Convert Frontend TypeScript to JavaScript

## Step 1: Rename and Convert .ts Files to .js
- [ ] Convert env.d.ts to env.d.js (remove TypeScript syntax)
- [ ] Convert eslint.config.ts to eslint.config.js
- [ ] Convert vite.config.ts to vite.config.js
- [ ] Convert vitest.config.ts to vitest.config.js
- [ ] Convert src/main.ts to src/main.js
- [ ] Convert src/router/index.ts to src/router/index.js
- [ ] Convert src/services/api.ts to src/services/api.js
- [ ] Convert src/stores/auth.ts to src/stores/auth.js
- [ ] Convert src/stores/business.ts to src/stores/business.js
- [ ] Convert src/stores/category.ts to src/stores/category.js
- [ ] Convert src/stores/menuItem.ts to src/stores/menuItem.js
- [ ] Convert src/composables/useFormValidation.ts to src/composables/useFormValidation.js

## Step 2: Update package.json
- [ ] Remove TypeScript dependencies (typescript, @types/*)
- [ ] Adjust scripts if needed for JavaScript

## Step 3: Remove TypeScript Config Files
- [ ] Remove or update tsconfig.json
- [ ] Remove tsconfig.app.json, tsconfig.node.json, tsconfig.vitest.json

## Step 4: Fix Import/Export Statements
- [ ] Ensure all imports/exports work in JavaScript

## Step 5: Test and Fix Errors
- [ ] Run npm install
- [ ] Run dev server
- [ ] Verify API calls and CORS
- [ ] Fix any runtime errors
