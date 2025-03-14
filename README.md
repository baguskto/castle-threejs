# Castle Three.js Viewer

A 3D castle viewer created with Blender and Three.js.

![Medieval Castle](./images/castle-preview.png)

## Overview

This project showcases a 3D castle model created in Blender and displayed on a web page using Three.js. The castle is inspired by a low-poly medieval castle design.

## Features

- Interactive 3D castle model
- Orbit controls for camera movement
- Toggle rotation of the castle
- Reset camera view
- Responsive design

## Getting Started

### Prerequisites

- Node.js (for running the local server)

### Installation

1. Clone this repository:
```
git clone https://github.com/yourusername/castle-threeJS.git
cd castle-threeJS
```

2. Make sure the castle model is in the models directory:
```
./copy_model.sh
```

3. Start the server:
```
node server.js
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Project Structure

- `index.html` - Main HTML file
- `js/main.js` - Three.js application code
- `models/` - Directory containing the 3D model
- `server.js` - Simple HTTP server

## Controls

- Left-click + drag: Rotate the camera
- Right-click + drag: Pan the camera
- Scroll: Zoom in/out
- "Reset View" button: Reset the camera to the initial position
- "Toggle Rotation" button: Start/stop automatic rotation of the castle

## Creating Your Own Castle

If you want to create your own castle:

1. Use Blender to create and export your model as a GLB file
2. Replace the `models/castle.glb` file with your own
3. Refresh the web page to see your model

## What's Next

Coming soon:
- Day/Night toggle for different lighting conditions
- Enhanced details toggle for model complexity
- Additional castle models and environments
- Animation sequences for drawbridge and flags
- Interactive elements within the castle
- Mobile touch controls optimization

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Three.js for the 3D rendering library
- Blender for 3D modeling 