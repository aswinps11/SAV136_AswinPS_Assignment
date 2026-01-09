// ---------- NAVIGATION SYSTEM CLASS ----------
class NavigationSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");

        // Controls
        this.startBtn = document.getElementById("startBtn");
        this.pauseBtn = document.getElementById("pauseBtn");
        this.speedRange = document.getElementById("speedRange");
        this.speedValue = document.getElementById("speedValue");
        this.northUpBtn = document.getElementById("northUpBtn");
        this.headingUpBtn = document.getElementById("headingUpBtn");

        // Info panel
        this.posInfo = document.getElementById("pos");
        this.speedInfo = document.getElementById("speedInfo");
        this.headingInfo = document.getElementById("headingInfo");
        this.distanceInfo = document.getElementById("distanceInfo");
        this.etaInfo = document.getElementById("etaInfo");

        // View
        this.zoom = 0.8;
        this.panX = 0;
        this.panY = 0;
        this.isPanning = false;
        this.lastMouse = { x: 0, y: 0 };

        // Vessel
        this.vessel = {
            x: 100,
            y: 100,
            heading: 0,
            speed: parseFloat(this.speedRange.value)
        };

        // Route
        this.waypoints = [
            { x: 105, y: 100 },
            { x: 600, y: 200 },
            { x: 700, y: 500 },
            { x: 400, y: 400 },
            { x: 200, y: 550 }
        ];
        this.currentWaypointIndex = 0;

        // Interaction
        this.draggingWaypoint = null;
        this.WAYPOINT_RADIUS = 8;

        this.isRunning = false;
        this.orientation = "North-Up";

        // Bind event handlers
        this.initControls();
        this.initCanvasEvents();

        // Start rendering
        this.lastTime = null;
        this.draw();
        requestAnimationFrame(this.update.bind(this));
    }

    // ---------- CONTROLS ----------
    initControls() {
        this.startBtn.onclick = () => (this.isRunning = true);
        this.pauseBtn.onclick = () => (this.isRunning = false);

        this.speedRange.oninput = e => {
            this.vessel.speed = parseFloat(e.target.value);
            this.speedValue.textContent = this.vessel.speed; // Fix slider display
        };

        this.northUpBtn.onclick = () => (this.orientation = "North-Up");
        this.headingUpBtn.onclick = () => (this.orientation = "Heading-Up");
    }

    // ---------- CANVAS EVENTS ----------
    initCanvasEvents() {
        this.canvas.addEventListener("wheel", e => {
            e.preventDefault();
            this.zoom += e.deltaY * -0.001;
            this.zoom = Math.min(Math.max(0.5, this.zoom), 3);
        });

        this.canvas.addEventListener("mousedown", e => {
            const { x, y } = this.getWorldCoords(e);

            for (let wp of this.waypoints) {
                if (Math.hypot(wp.x - x, wp.y - y) < this.WAYPOINT_RADIUS) {
                    this.draggingWaypoint = wp;
                    return;
                }
            }

            this.isPanning = true;
            this.lastMouse = { x: e.clientX, y: e.clientY };
        });

        this.canvas.addEventListener("mousemove", e => {
            const { x, y } = this.getWorldCoords(e);

            // Cursor change
            if (this.isMouseOverWaypoint(x, y)) {
                this.canvas.style.cursor = "pointer";
            } else if (this.isPanning) {
                this.canvas.style.cursor = "grabbing";
            } else {
                this.canvas.style.cursor = "grab";
            }

            // Drag waypoint
            if (this.draggingWaypoint) {
                this.draggingWaypoint.x = x;
                this.draggingWaypoint.y = y;
            }
            // Pan view
            else if (this.isPanning) {
                this.panX += e.clientX - this.lastMouse.x;
                this.panY += e.clientY - this.lastMouse.y;
                this.lastMouse = { x: e.clientX, y: e.clientY };
            }
        });

        this.canvas.addEventListener("mouseup", () => {
            this.draggingWaypoint = null;
            this.isPanning = false;
        });

        this.canvas.addEventListener("mouseleave", () => {
            this.draggingWaypoint = null;
            this.isPanning = false;
        });

        this.canvas.addEventListener("click", e => {
            const { x, y } = this.getWorldCoords(e);
            this.waypoints.push({ x, y });
        });

        this.canvas.addEventListener("contextmenu", e => {
            e.preventDefault();
            const { x, y } = this.getWorldCoords(e);
            this.waypoints = this.waypoints.filter(
                wp => Math.hypot(wp.x - x, wp.y - y) > this.WAYPOINT_RADIUS
            );
        });
    }

    // ---------- DRAW ----------
    draw() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.save();
        ctx.translate(this.canvas.width / 2 + this.panX, this.canvas.height / 2 + this.panY);
        ctx.scale(this.zoom, this.zoom);

        if (this.orientation === "Heading-Up") {
            ctx.rotate(-this.vessel.heading * Math.PI / 180);
        }

        ctx.translate(-this.canvas.width / 2, -this.canvas.height / 2);

        // Draw route legs
        ctx.lineWidth = 2;
        for (let i = 0; i < this.waypoints.length - 1; i++) {
            ctx.strokeStyle = i === this.currentWaypointIndex - 1 ? "red" : "blue";
            ctx.beginPath();
            ctx.moveTo(this.waypoints[i].x, this.waypoints[i].y);
            ctx.lineTo(this.waypoints[i + 1].x, this.waypoints[i + 1].y);
            ctx.stroke();
        }

        // Draw waypoints
        this.waypoints.forEach((wp, idx) => {
            ctx.fillStyle = idx === this.currentWaypointIndex ? "red" : "green";
            ctx.beginPath();
            ctx.arc(wp.x, wp.y, this.WAYPOINT_RADIUS, 0, Math.PI * 2);
            ctx.fill();
        });

        // Draw vessel
        ctx.save();
        ctx.translate(this.vessel.x, this.vessel.y);
        ctx.rotate((this.vessel.heading * Math.PI) / 180);

        // Vessel body
        ctx.fillStyle = "orange";
        ctx.beginPath();
        ctx.moveTo(0, -10);
        ctx.lineTo(20, 0);
        ctx.lineTo(0, 10);
        ctx.closePath();
        ctx.fill();

        // Front indicator
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(20, 0, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
        ctx.restore();

        // Update info panel
        this.posInfo.textContent = `(${this.vessel.x.toFixed(1)}, ${this.vessel.y.toFixed(1)})`;
        this.speedInfo.textContent = this.vessel.speed.toFixed(1);
        this.headingInfo.textContent = this.vessel.heading.toFixed(1);

        if (this.currentWaypointIndex < this.waypoints.length) {
            const target = this.waypoints[this.currentWaypointIndex];
            const dx = target.x - this.vessel.x;
            const dy = target.y - this.vessel.y;
            const distance = Math.hypot(dx, dy);
            this.distanceInfo.textContent = distance.toFixed(1);

            this.etaInfo.textContent = this.vessel.speed > 0
                ? (distance / this.vessel.speed).toFixed(1) + " s"
                : "--";
        } else {
            this.distanceInfo.textContent = "0";
            this.etaInfo.textContent = "0";
        }
    }

    // ---------- UPDATE ----------
    update(timestamp) {
        if (!this.lastTime) this.lastTime = timestamp;
        const delta = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        if (this.isRunning && this.currentWaypointIndex < this.waypoints.length) {
            const target = this.waypoints[this.currentWaypointIndex];
            const dx = target.x - this.vessel.x;
            const dy = target.y - this.vessel.y;
            const dist = Math.hypot(dx, dy);

            if (dist < this.vessel.speed * delta) {
                this.vessel.x = target.x;
                this.vessel.y = target.y;
                this.currentWaypointIndex++;
            } else {
                this.vessel.x += (dx / dist) * this.vessel.speed * delta;
                this.vessel.y += (dy / dist) * this.vessel.speed * delta;
            }

            this.vessel.heading = (Math.atan2(dy, dx) * 180) / Math.PI;
        }

        this.draw();
        requestAnimationFrame(this.update.bind(this));
    }

    // ---------- HELPERS ----------
    getWorldCoords(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: (e.clientX - rect.left - this.canvas.width / 2 - this.panX) / this.zoom + this.canvas.width / 2,
            y: (e.clientY - rect.top - this.canvas.height / 2 - this.panY) / this.zoom + this.canvas.height / 2
        };
    }

    isMouseOverWaypoint(x, y) {
        return this.waypoints.some(wp => Math.hypot(wp.x - x, wp.y - y) < this.WAYPOINT_RADIUS);
    }
}

// ---------- INITIALIZE ----------
const navSystem = new NavigationSystem("navCanvas");
