# Theming

This app uses [theme-ui](https://theme-ui.com) to manage and apply its theme and styles.

## How to Define/Update Default Styles for `theme-ui`'s Components

`theme-ui` does not seem to support applying base styles to all instances of their components. So I did it the old way using an object containing base styles for a component and then spreading it in each variant. See the `forms` section in the `theme.ts` for an example.

https://theme-ui.com/guides/variants

<details>
<summary>How I used to do it with `styled-system`: a.k.a the painfully manual way</summary>

I'm used to hand building my own base components and applying the default theme and styles to them using [styled-system](https://github.com/styled-system/styled-system/blob/master/docs/variants.md#variants). For example:

```javascript
// Button.tsx
import styled from "styled-components";
import { variant } from "styled-system";

const Button = styled("button")(
  {
    fontSize: "16px",
    // ...etc
  },
  variant({
    variants: {
      primary: {
        color: "white",
        bg: "primary",
      },
      secondary: {
        color: "white",
        bg: "secondary",
      },
    },
  })
);
```

But with `theme-ui`, you actually just specify these styles within the theme file and the pre-packaged components within the library recieve it!

```javascript
// theme.ts
const theme = {
    fontSizes: [8, 16, 24, ...], // in px
    colors: {...},
    spaces: [0, 8, 16, 24, ...], // in px
    button: {
        fontSize: 1 // index 1 of "fontSizes", so 16px
        padding: 1, // index 1 of "spaces", so 8px,
        primary: {
            backgroundColor: '...'
            color: '...'
        },
        secondary: {
            backgroundColor: '...'
            color: '...'
        }
    }
};

export default theme;
```

This is another convenienve of using `theme-ui` over `styled-system`. It's super nice!

</details>

## How to Make Tyscript Aware of the Theme's Values

Using `useTheme` right out of the box, it gives access to all the theme's values. However if you use Typescript, the compiler doesn't know what values exist or not and will error out!

To fix that, I followed theme-ui's docs which basically just does some simple Typescript one-liner to build the theme's type and export a custom `useTheme` hook type casted to it.

https://theme-ui.com/guides/typescript
