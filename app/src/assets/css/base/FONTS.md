# Custom Fonts

This project includes two custom fonts that can be used throughout the application:

## Available Fonts

### 1. Stark
- **Font Family**: `Stark`
- **File**: `Stark.OTF`
- **Type**: OpenType
- **Usage**: Modern, clean display font

### 2. Rock Salt
- **Font Family**: `Rock Salt`
- **File**: `RockSalt-Regular.ttf`
- **Type**: TrueType
- **Usage**: Decorative, handwritten-style font

## Usage

### Using SCSS Variables
```scss
// In your SCSS files
.my-element {
  font-family: $font-family-stark;
}

.another-element {
  font-family: $font-family-rock-salt;
}
```

### Using CSS Classes
```html
<!-- In your HTML templates -->
<h1 class="font-stark">This text uses Stark font</h1>
<p class="font-rock-salt">This text uses Rock Salt font</p>
```

### Direct CSS
```css
/* Direct CSS usage */
.custom-element {
  font-family: 'Stark', sans-serif;
}

.decorative-text {
  font-family: 'Rock Salt', cursive;
}
```

### Using in SVG Files
```svg
<!-- SVG files need their own @font-face declarations -->
<defs>
  <style>
    @font-face {
      font-family: 'Stark';
      src: url('/assets/fonts/Stark.OTF') format('opentype');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }

    .text-element {
      font-family: "Stark", sans-serif;
    }
  </style>
</defs>
```

## Font Loading

The fonts are loaded using `@font-face` declarations with `font-display: swap` for optimal performance. This ensures text remains visible during font load and swaps to the custom font once it's available.

**Note for SVG files**: SVG files have their own isolated styling context, so they need their own `@font-face` declarations within the `<style>` block inside the `<defs>` section.

## Troubleshooting SVG Fonts

If fonts aren't displaying correctly in SVG files:

1. **Check font file exists**: Ensure the font file is in `src/assets/fonts/`
2. **Use multiple font formats**: Include both TTF and OTF formats in @font-face
3. **Add fallback fonts**: Include system fonts as fallbacks
4. **Test with font-test.html**: Use the test file at `src/assets/font-test.html`

### Common Issues:
- **Font not loading**: Check file path and format
- **Cursive fonts in SVG**: Add `text-rendering: optimizeLegibility` and `font-feature-settings: normal`
- **Dollar sign not displaying**: Ensure the specific font file contains the glyph

## File Locations

- Font files: `src/assets/fonts/`
- Font declarations: `src/assets/css/base/_fonts.scss`
- Font variables: `src/assets/css/abstracts/_variables.scss`
- SVG examples: `src/assets/svg/coin.svg`, `src/assets/svg/logo.svg`
- Font test page: `src/assets/font-test.html`
