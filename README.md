# container
a div element that resizes on screen resize or rotate and maintains its aspect ratio

how I use it to centre a fixed aspect canvas on the screen in a simple games:

```css
html, body {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
}
body {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

```html
<div id = "container">
    <canvas id="viewport"></canvas>
    <div id="user-input"></div>
</div>
```

```typescript
new Container(1920, 1080).margin(0.05);

// or default margin and different element id
// new Container(1920, 1080, 'some-other-id');

```