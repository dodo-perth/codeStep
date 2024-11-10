# Code Step Highlighter

A JavaScript library for step-by-step code highlighting and explanation, inspired by Apple's tutorial style.

## Installation

```bash
npm install code-step-highlighter
```

## Usage

Direct usage in HTML:

```html
<div class="code-highlighter" data-language="javascript" data-filename="Example.js">
  function example() {
    const a = 1; // [1] Initialize first variable
    const b = 2; // [2] Initialize second variable
    return a + b; // [3] Return the sum
  }
</div>

<script>
  const highlighter = new CodeHighlighter('.code-highlighter');
  highlighter.init();
</script>
```

Using as a module:

```javascript
import CodeHighlighter from 'code-step-highlighter';

const highlighter = new CodeHighlighter('#my-code');
highlighter.init();
```

## Configuration Options

```javascript
const options = {
  theme: 'light',          // Theme (light/dark)
  lineNumbers: true,       // Show line numbers
  highlightColor: '#007AFF', // Highlight color
  fileName: 'Example.js',  // File name to display
  layout: 'horizontal',    // Layout orientation (horizontal/vertical)
  explanationPosition: 'left' // Explanation panel position (left/right)
};

const highlighter = new CodeHighlighter('.code-highlighter', options);
```

## Features

- Apple-style tutorial layout
- Smooth scroll-based step navigation
- Syntax highlighting with Prism.js
- Customizable themes and styles
- Responsive design
- File name display
- Line numbers
- Step-by-step code explanation

## Customizing Styles

You can customize styles using CSS variables:

```css
.code-highlighter {
  --highlight-color: rgba(0, 122, 255, 0.1);
  --background-color: #ffffff;
  --text-color: #1d1d1f;
}
```

## Browser Support

Supports all modern browsers (Chrome, Firefox, Safari, Edge)

## License

MIT License
