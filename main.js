function findPath(
    grid,
    start,
    end
  ) {
    // initialize a queue to hold the coordinates we need to visit
    const queue = [start];
  
    // initialize a map to hold the previous coordinate for each coordinate
    const previous = new Map();
  
    // initialize a set to keep track of which coordinates we've visited
    const visited = new Set();
  
    // while there are coordinates in the queue
    while (queue.length > 0) {
      // dequeue the next coordinate
      const current = queue.shift();
  
      // if we've reached the end, construct the path and return it
      if (current[0] === end[0] && current[1] === end[1]) {
        return constructPath(previous, end);
      }
  
      // mark the current coordinate as visited
      visited.add(coordinateToString(current));
  
      // get the neighbors of the current coordinate
      const neighbors = getNeighbors(grid, current);
  
      // for each neighbor
      for (const neighbor of neighbors) {
        // if we've already visited the neighbor, skip it
        if (visited.has(coordinateToString(neighbor))) {
          continue;
        }
  
        // add the neighbor to the queue and the previous map
        queue.push(neighbor);
        previous.set(coordinateToString(neighbor), current);
      }
    }
  
    // if we've exhausted the queue and haven't found the end, there's no path
    return [];
}
  
function getNeighbors(grid, coord) {
    const neighbors = [];
    const [x, y] = coord;

    // check the top neighbor
    if (y > 0 && grid[y - 1][x] === "empty") {
        neighbors.push([x, y - 1]);
    }

    // check the right neighbor
    if (x < grid[0].length - 1 && grid[y][x + 1] === "empty") {
        neighbors.push([x + 1, y]);
    }

    // check the bottom neighbor
    if (y < grid.length - 1 && grid[y + 1][x] === "empty") {
        neighbors.push([x, y + 1]);
    }

    // check the left neighbor
    if (x > 0 && grid[y][x - 1] === "empty") {
        neighbors.push([x - 1, y]);
    }

    return neighbors;
}
  
function constructPath(previous, end) {
    const path = [];
    let current = end;
  
    while (current) {
      path.unshift(current);
      current = previous.get(coordinateToString(current));
    }
  
    return path;
}
  
function coordinateToString(coord) {
    return `${coord[0]},${coord[1]}`;
}

function createGridHTML(rows, columns) {
    // create the container element
    const container = document.createElement("div");
    container.id = "container";
    container.style.display = "flex";
    container.style.flexWrap = "wrap";
    container.style.width = `${columns * 52}px`;
    container.style.height = `${rows * 52}px`;

    // create the grid elements
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
        const gridElement = document.createElement("div");
        gridElement.style.backgroundColor = "gray";
        gridElement.style.width = "50px";
        gridElement.style.height = "50px";
        gridElement.style.border = "1px solid black";
        gridElement.className = "grid-element";
        container.appendChild(gridElement);
        }
    }

    // add the container to the DOM
    document.body.appendChild(container);
}

function createGrid(width, height) {
    var g = [];
    for (var x = 0; x < width; x++) {
        var r = [];
        for (var y = 0; y < height; y++) {
            r.push(Math.random() > 0.2 ? "empty" : "obstacle");
        }
        g.push(r);
    }
    return g;
}

function highlightPath(grid, path) {
    // get all the grid elements
    const gridElements = document.querySelectorAll(".grid-element");
    gridElements.forEach(el => el.style.backgroundColor = "gray");

    // convert the path coordinates to elements
    const pathElements = path.map(([x, y]) => gridElements[y * 10 + x]);

    // set the background color of the path elements to green
    pathElements.forEach(el => el.style.backgroundColor = "green");

    // convert the obstacle coordinates to elements
    const obstacleElements = grid
        .flat()
        .map((tile, index) => tile === "obstacle" ? gridElements[index] : null)
        .filter(Boolean);

    // set the background color of the obstacle elements to red
    obstacleElements.forEach(el => el.style.backgroundColor = "red");
}

// IMPORTANT
function test() {
    if (document.getElementById("container") != null) { 
        document.getElementById("container").remove();
    }
    createGridHTML(10, 10);
    const grid = createGrid(10, 10);
    const start = [0, 0];
    const end = [9, 9];

    const path = findPath(grid, start, end);
    if (path != []) {
        highlightPath(grid, path);
    }
}
