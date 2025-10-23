# TODO: Optimize FloatingBubbles and Make Bubbles Clickable to Pop

## Steps to Complete

- [x] Remove `pointer-events-none` from the canvas to enable interactions.
- [x] Add a click event listener to the canvas.
- [x] Implement click detection logic: Calculate distance from click point to bubble center and check if within radius.
- [x] Add popping state to Bubble interface: Include `isPopping` boolean and `popFrames` counter.
- [x] In the animation loop, handle popping animation: Shrink radius over a set number of frames when `isPopping` is true.
- [x] Remove bubble from array after popping animation completes (when popFrames reach 0).
- [x] Optimize gradient creation: Cache or pre-create gradients to avoid recreating them every frame.
- [x] Run development server and test clickable bubbles and popping animation.
- [x] Verify performance and adjust if needed.
- [x] Add new bubbles when one is popped to maintain the count.
