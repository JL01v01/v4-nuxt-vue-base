# CLAUDE.md - AI Assistant Guide

This document provides comprehensive guidance for AI assistants working with this codebase.

## Project Overview

This is an **Internal Design System** built as a modern web application showcasing a complete component library. It demonstrates UI components, blocks, and patterns using the latest stable versions of:

- **Nuxt 4.2.1** - Vue meta-framework
- **Vue 3.5.25** - Progressive JavaScript framework
- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **reka-ui 2.6.1** - Unstyled, accessible component primitives
- **Deployed on Cloudflare** - Using Nitro preset for edge deployment

## Project Structure

```
/
├── app.vue                      # Root application component with theme setup
├── nuxt.config.ts               # Nuxt configuration
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── .gitignore                   # Git ignore rules
│
├── assets/
│   └── css/
│       ├── main.css             # Main stylesheet with Tailwind imports and theme vars
│       ├── themes.css           # Theme-specific CSS variables
│       └── fonts.css            # Font definitions
│
├── components/                  # Demo components showcasing the design system
│   ├── *Demo.vue                # Individual component demos (e.g., ButtonDemo.vue)
│   ├── ComponentWrapper.vue     # Wrapper for displaying demos
│   ├── AppSidebar.vue           # Application sidebar navigation
│   ├── NavHeader.vue            # Header navigation
│   ├── ModeSwitcher.vue         # Dark/light mode toggle
│   └── ThemeSelector.vue        # Theme selection dropdown
│
├── composables/                 # Vue composables
│   └── useThemeConfig.ts        # Theme configuration and management
│
├── layouts/
│   └── default.vue              # Default layout with sidebar, header, and slots
│
├── lib/                         # Utility libraries
│   ├── utils.ts                 # cn() function for class merging
│   └── themes.ts                # Available theme definitions
│
├── pages/                       # Application pages (file-based routing)
│   ├── index.vue                # Home page with all component demos
│   └── dashboard/
│       ├── index.vue            # Dashboard home
│       ├── charts.vue           # Charts page
│       └── forms.vue            # Forms page
│
├── public/                      # Static assets served as-is
│
├── registry/                    # Design system registry
│   └── new-york-v4/
│       ├── ui/                  # UI component library
│       │   ├── accordion/
│       │   ├── button/
│       │   ├── card/
│       │   └── ...              # 50+ components
│       ├── blocks/              # Pre-built component blocks
│       │   ├── Login01/
│       │   ├── Login02/
│       │   ├── Sidebar01/
│       │   └── ...
│       └── lib/
│           └── utils.ts         # Registry utility functions
│
├── __registry__/                # Auto-generated registry metadata
│   └── index.ts                 # Component registry index (DO NOT EDIT MANUALLY)
│
└── server/                      # Server-side code (API routes, middleware)
```

## Key Concepts & Conventions

### Component Architecture

1. **Registry Components** (`/registry/new-york-v4/ui/`)
   - Source of truth for all UI components
   - Each component has its own directory
   - Typically contains: `ComponentName.vue`, `index.ts`
   - Built on top of `reka-ui` primitives
   - Use Class Variance Authority (CVA) for variants

2. **Demo Components** (`/components/`)
   - Showcase how to use registry components
   - Named with `*Demo.vue` suffix
   - Lazy-loaded in pages with `Lazy` prefix

3. **Block Components** (`/registry/new-york-v4/blocks/`)
   - Pre-built compositions of UI components
   - Ready-to-use patterns (login forms, sidebars, tables)
   - Each block has its own directory with `page.vue` and `components/`

### Import Patterns

**Always use these import conventions:**

```vue
<!-- UI Components - Import from registry -->
import { Button } from '@/registry/new-york-v4/ui/button'
import { Card, CardContent, CardHeader } from '@/registry/new-york-v4/ui/card'

<!-- Utilities - Import from lib -->
import { cn } from '@/lib/utils'
import { THEMES } from '@/lib/themes'

<!-- Composables - Auto-imported, or explicit import -->
import { useThemeConfig } from '@/composables/useThemeConfig'
```

### Styling System

1. **Tailwind CSS 4**
   - Uses new Tailwind v4 syntax
   - CSS-first configuration in `assets/css/main.css`
   - Custom properties for theming

2. **CSS Custom Properties**
   - All colors defined as CSS variables in `main.css`
   - Two modes: light (`:root`) and dark (`.dark`)
   - Theme variants (default, neutral, stone, zinc, gray, slate, scaled)

3. **Class Merging**
   ```typescript
   // Always use cn() from lib/utils.ts for class merging
   import { cn } from '@/lib/utils'

   // Combines clsx and tailwind-merge
   <div :class="cn('base-class', props.class)" />
   ```

4. **Component Variants**
   ```typescript
   // Use Class Variance Authority (CVA) for component variants
   import { cva, type VariantProps } from 'class-variance-authority'

   const buttonVariants = cva('base-classes', {
     variants: {
       variant: { default: '...', destructive: '...' },
       size: { default: '...', sm: '...', lg: '...' }
     }
   })
   ```

### Theme System

- **Color Modes**: Light, Dark, System (auto)
  - Managed by `@nuxtjs/color-mode` module
  - Accessed via `useColorMode()` composable
  - Class-based: `.dark` class applied to `<html>` or `<body>`

- **Theme Variants**: Default, Neutral, Stone, Zinc, Gray, Slate, Scaled
  - Managed by `useThemeConfig()` composable
  - Stored in cookie: `active_theme`
  - Applied as body class: `theme-{name}`

### Form Validation

```vue
<script setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

const formSchema = toTypedSchema(z.object({
  email: z.string().email(),
  password: z.string().min(8)
}))

const form = useForm({ validationSchema: formSchema })
</script>
```

- **Always use vee-validate + zod for forms**
- Define schema with Zod
- Convert to typed schema with `toTypedSchema()`
- Use `useForm()` composable

### TypeScript

- **Strict mode enabled**
- Use `vue-tsc` for type checking: `pnpm typecheck`
- Define prop types with interfaces:
  ```typescript
  interface Props extends PrimitiveProps {
    variant?: ButtonVariants['variant']
    size?: ButtonVariants['size']
    class?: HTMLAttributes['class']
  }
  ```

## Development Workflow

### Package Management

- **Use pnpm** (recommended) or npm/yarn/bun
- All dependencies are at latest stable versions
- **Exception**: `zod` pinned to v3.25.76 for `@vee-validate/zod` compatibility

### Available Scripts

```bash
# Development
pnpm dev              # Start dev server on http://localhost:3000

# Type Checking
pnpm typecheck        # Run TypeScript type checking

# Production
pnpm build            # Build for production
pnpm preview          # Preview production build locally
pnpm generate         # Generate static site

# Setup
pnpm install          # Install dependencies
```

### Development Notes

- **Font provider warnings**: Expected in restricted network environments, doesn't affect functionality
- **Dev server**: Runs on port 3000 by default
- **Hot Module Replacement**: Full HMR support for Vue components and styles

### Build & Deployment

1. **Static Site Generation**
   - All routes pre-rendered as static HTML
   - Configured in `nuxt.config.ts`: `routeRules: { '/**': { static: true } }`

2. **Cloudflare Deployment**
   ```bash
   pnpm build
   npx wrangler deploy .output/server/index.mjs --assets .output/public
   ```
   - Uses `nitro.preset: 'cloudflare_module'`
   - Edge-optimized for global performance

## Component Development Guidelines

### Creating New UI Components

1. **Location**: Create in `/registry/new-york-v4/ui/{component-name}/`

2. **File Structure**:
   ```
   /registry/new-york-v4/ui/my-component/
   ├── MyComponent.vue          # Main component
   ├── MyComponentItem.vue      # Sub-components (if needed)
   └── index.ts                 # Exports and variants
   ```

3. **Component Template**:
   ```vue
   <script setup lang="ts">
   import type { HTMLAttributes } from 'vue'
   import { Primitive, type PrimitiveProps } from 'reka-ui'
   import { cn } from '@/lib/utils'
   import { type ComponentVariants, componentVariants } from '.'

   interface Props extends PrimitiveProps {
     variant?: ComponentVariants['variant']
     class?: HTMLAttributes['class']
   }

   const props = withDefaults(defineProps<Props>(), {
     as: 'div',
   })
   </script>

   <template>
     <Primitive
       :as="as"
       :as-child="asChild"
       :class="cn(componentVariants({ variant }), props.class)"
     >
       <slot />
     </Primitive>
   </template>
   ```

4. **Index File** (`index.ts`):
   ```typescript
   import { cva, type VariantProps } from 'class-variance-authority'

   export { default as MyComponent } from './MyComponent.vue'

   export const myComponentVariants = cva(
     'base-classes',
     {
       variants: {
         variant: {
           default: 'variant-classes',
           secondary: 'variant-classes',
         },
       },
       defaultVariants: {
         variant: 'default',
       },
     },
   )

   export type MyComponentVariants = VariantProps<typeof myComponentVariants>
   ```

5. **Create Demo Component**: Add `/components/MyComponentDemo.vue`

6. **Add to Page**: Import and use in `/pages/index.vue` or appropriate page

### Creating Blocks

1. **Location**: `/registry/new-york-v4/blocks/{block-name}/`

2. **Structure**:
   ```
   /registry/new-york-v4/blocks/MyBlock01/
   ├── page.vue                 # Main page component
   └── components/              # Block-specific components
       ├── MyBlockComponent.vue
       └── ...
   ```

3. **Guidelines**:
   - Blocks are complete, ready-to-use patterns
   - Compose existing UI components
   - Can include custom sub-components
   - Should be fully self-contained

## Common Patterns

### Responsive Design

```vue
<!-- Use Tailwind responsive prefixes -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- Content -->
</div>

<!-- Container queries with @container -->
<div class="@container">
  <div class="@lg:grid-cols-2">
    <!-- Content -->
  </div>
</div>
```

### Lazy Loading Components

```vue
<!-- In pages, use Lazy prefix for demo components -->
<template>
  <ComponentWrapper name="Button">
    <LazyButtonDemo />
  </ComponentWrapper>
</template>
```

### Accessing Color Mode

```vue
<script setup>
const colorMode = useColorMode()

// colorMode.preference: 'light' | 'dark' | 'system'
// colorMode.value: 'light' | 'dark' (resolved)
</script>

<template>
  <Button @click="colorMode.preference = 'dark'">
    Dark Mode
  </Button>
</template>
```

### Using Composables

```vue
<script setup>
// Auto-imported - no import statement needed
const { activeTheme } = useThemeConfig()

// Or explicit import
import { useThemeConfig } from '@/composables/useThemeConfig'
</script>
```

## Troubleshooting

### Type Errors

- Run `pnpm typecheck` to see all TypeScript errors
- Check that component props match expected types
- Ensure imports from registry use correct paths

### Styling Issues

- Verify Tailwind classes are valid for v4
- Check that custom properties are defined in `main.css`
- Use browser DevTools to inspect computed styles
- Remember: Tailwind v4 uses CSS-first config

### Build Errors

- Clear `.nuxt`, `.output` directories and rebuild
- Check for circular dependencies
- Verify all imports resolve correctly

### Component Not Found

- Registry components must be imported from `@/registry/new-york-v4/ui/`
- Check that component name matches directory name
- Ensure component is exported in `index.ts`

## Best Practices for AI Assistants

### When Modifying Components

1. **Always read existing component first** before suggesting changes
2. **Maintain consistency** with existing patterns and conventions
3. **Preserve accessibility** - reka-ui components are accessible by default
4. **Test responsive behavior** - consider mobile, tablet, desktop
5. **Follow TypeScript** - add proper type definitions

### When Creating New Features

1. **Check existing components** - avoid duplicating functionality
2. **Use registry components** - compose from existing UI components
3. **Follow naming conventions** - PascalCase for components, camelCase for utils
4. **Add proper documentation** - update CLAUDE.md if adding new patterns
5. **Consider theming** - ensure components work in all theme variants

### Code Quality

1. **Keep components focused** - single responsibility principle
2. **Avoid inline styles** - use Tailwind classes
3. **Don't add unnecessary complexity** - simplicity over cleverness
4. **Use semantic HTML** - proper elements for accessibility
5. **Leverage composition** - use slots and composables effectively

### File Organization

1. **Don't create files unnecessarily** - modify existing when possible
2. **Follow established structure** - don't introduce new patterns without reason
3. **Keep related code together** - component + variants + types in same directory
4. **Auto-generated files** - never edit `__registry__/index.ts` manually

## Dependencies Reference

### Core Framework
- `nuxt`: ^4.2.1 - Vue meta-framework
- `vue`: ^3.5.25 - JavaScript framework
- `vue-router`: ^4.6.3 - Routing (included with Nuxt)

### Styling
- `tailwindcss`: ^4.1.17 - Utility CSS
- `@tailwindcss/vite`: ^4.1.17 - Vite integration
- `tw-animate-css`: ^1.4.0 - Animation utilities
- `class-variance-authority`: ^0.7.1 - Variant management
- `clsx`: ^2.1.1 - Class concatenation
- `tailwind-merge`: ^3.4.0 - Tailwind class merging

### UI Components
- `reka-ui`: ^2.6.1 - Unstyled accessible primitives
- `lucide-vue-next`: ^0.555.0 - Icon library
- `@tanstack/vue-table`: ^8.21.3 - Table component
- `embla-carousel-vue`: ^8.6.0 - Carousel
- `vaul-vue`: ^0.4.1 - Drawer component
- `vue-sonner`: ^2.0.9 - Toast notifications

### Forms & Validation
- `vee-validate`: ^4.15.1 - Form validation
- `@vee-validate/zod`: ^4.15.1 - Zod integration
- `zod`: ^3.25.76 - Schema validation (pinned)

### Utilities
- `@vueuse/core`: ^14.1.0 - Vue composition utilities
- `@internationalized/date`: ^3.10.0 - Date handling
- `date-fns`: ^4.1.0 - Date utilities

### Development
- `@nuxtjs/color-mode`: ^4.0.0 - Color mode support
- `@nuxt/fonts`: ^0.12.1 - Font optimization
- `vue-tsc`: ^3.1.5 - TypeScript checking

## Additional Resources

- [Nuxt Documentation](https://nuxt.com/docs)
- [Vue 3 Documentation](https://vuejs.org/)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Reka UI Documentation](https://reka-ui.com/)
- [Vee-Validate Documentation](https://vee-validate.logaretm.com/)
- [Zod Documentation](https://zod.dev/)

---

**Last Updated**: 2025-12-03
**Nuxt Version**: 4.2.1
**Vue Version**: 3.5.25
**Tailwind Version**: 4.1.17
