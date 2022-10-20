
// https://storybook.js.org/docs/react/configure/overview#configure-story-rendering

console.log("preview.js loaded");

// Forcing usage of loaders as advised here:
// https://stackoverflow.com/a/70805809/1115128
import "!style-loader!css-loader!postcss-loader!ui/styles.css";
import '!style-loader!css-loader!postcss-loader!./globals.css';
