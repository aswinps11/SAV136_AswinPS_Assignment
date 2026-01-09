# Navigation & Route Monitoring System

## Overview
This project implements a desktop navigation application that simulates the movement of a vessel along a planned route on a 2D chart. The system allows an operator to monitor the vessel in real-time, manage waypoints, and view navigation parameters such as position, speed, heading, distance to the next waypoint, and estimated time of arrival (ETA).  

The application is designed with future extensibility in mind, allowing easy additions such as multiple vessels, dynamic routes, or integration with real GPS data.

---

## Features

### Navigation Display
- 2D chart-like view with vessel symbol and heading.
- Zoom and pan support.
- North-Up and Heading-Up orientation modes.

### Route Management
- Create, modify, and remove waypoints.
- Visualize route legs connecting waypoints.
- Highlight the current active route leg.
- Allow route editing during simulation.

### Vessel Simulation
- Real-time simulated movement along the route.
- Adjustable speed via a slider.
- Smooth position updates using `requestAnimationFrame`.

### Information Panel
- Displays vessel's current position (x, y coordinates).
- Displays speed and heading.
- Displays distance to the next waypoint.
- Displays estimated time of arrival (ETA).

### Controls
- **Start / Pause:** Begin or stop vessel movement.
- **Speed Slider:** Adjust vessel speed dynamically.
- **Add Waypoint:** Left-click on the map.
- **Move Waypoint:** Drag a waypoint to a new location.
- **Remove Waypoint:** Right-click on a waypoint.
- **Zoom:** Scroll mouse wheel to zoom in/out.
- **Pan:** Click and drag empty map area to pan.
- **Orientation Modes:** Switch between North-Up and Heading-Up views.

---

## Setup Instructions
1. Download or clone the project folder.
2. Ensure the following files are in the folder:
   - `index.html`  
   - `style.css`  
   - `script.js`  
   - `README.md`  
3. Open `index.html` in a modern web browser (Chrome, Edge, or Firefox).
4. The application runs locally; no additional installation is required.

---

## How to Run
1. Open `index.html` in your browser.
2. Use the controls at the top to start or pause the vessel.
3. Adjust the speed slider to change vessel speed.
4. Switch orientation between North-Up and Heading-Up using the buttons.
5. Interact with the map to add, move, or remove waypoints.
6. Observe the vessel’s movement along the route and monitor navigation data in the info panel.

---

## Assumptions
- The simulation uses pixel-based coordinates for the vessel and waypoints.
- Only a single vessel is simulated in the current version.
- Vessel movement is linear between waypoints.
- ETA is calculated assuming constant speed.
- Zoom and pan affect the entire map and vessel view.

---

## Limitations
- No real-world GPS integration.
- No collision detection for multiple vessels.
- The route is manually defined; automated route optimization is not included.

---

## Extensibility
The code is structured to allow future enhancements:
- Support for multiple vessels and routes.
- Integration with real navigation data (e.g., GPS coordinates).
- Custom vessel symbols and map tiles.
- Advanced routing algorithms or path optimization.
- Adding additional panels for more navigation metrics.

---

## Dependencies
- Vanilla JavaScript, HTML, and CSS.
- No external libraries are required.

---

## Testing and Verification
- Verified vessel moves smoothly along all defined waypoints.
- Checked real-time updates of distance and ETA.
- Verified adding, dragging, and removing waypoints work correctly.
- Confirmed speed slider updates both vessel speed and displayed value.
- Verified zoom, pan, and orientation modes function as expected.
- Tested in multiple browsers for consistent behavior.

---
