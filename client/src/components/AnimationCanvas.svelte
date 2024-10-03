<script>
    import { onMount } from 'svelte';
    import { initCanvas, resizeCanvas, getMousePosition } from '$lib/canvasHelpers';
    import { Grid } from '$lib/grid';
    import { Player } from '$lib/player';
    import { PlayerShape } from '$lib/shapes';
    import { PathManager } from '$lib/pathmanager';
    import { astar } from '$lib/astar';
    import { lerp } from '$lib/mathfn';


    
    let canvas;
    let animationFrameId;
    let lastTime = 0;
    let ctx;
    let mousePosition = { x: 0, y: 0 };
    let currentCell = { x: 0, y: 0 };
    let gridStart = { x: 0, y: 0 };
    let gridEnd = { x: 0, y: 0 };


    let t = 0;
    let pathIndex = 0;


    const grid = new Grid( 60, 60, 11, 11, 60);
    console.log(grid);

    const playerShape = new PlayerShape(25, 'orange');
    console.log(playerShape);

    const player = new Player(grid, 5, 5, playerShape);
    console.log(player);

    const pathManager = new PathManager(grid, player);
    console.log(pathManager);



    // Animation loop
    function animate(currentTime) {
        // Update and render
        update(currentTime);
        render();
        // Request next frame
        animationFrameId = requestAnimationFrame(animate);
    }

    function update(currentTime) {
        // Calculate deltaTime in seconds (time is in milliseconds)
        let deltaTime = (currentTime - lastTime) / 1000;
        lastTime = currentTime;

        player.calculateCellPosition();
        // Initalize start and target
        let start;
        let target;
        // If there is a path to follow
        if(pathManager.path.length > 1) {

            console.log('t: ',t.toFixed(2));   
            console.log('Path index: ',pathIndex);

            // Update the start and target cells
            start = pathManager.path[pathIndex];
            target = pathManager.path[pathIndex + 1];
            console.log('Start: ',start);
            console.log('Target: ',target);



            // When the timer is at 0, calculate the difference between the start and target, relative to the grid
            if(t === 0)
            {
                let dif = { x: (target.x - start.x) * -1, y: (target.y - start.y) * -1 };
                gridStart = { x: grid.position.x, y: grid.position.y};
                gridEnd = {x: dif.x + grid.position.x, y: dif.y + grid.position.y };
                console.log('Difference: ',dif);
            }
            console.log('Grid start: ',gridStart);
            console.log('Grid end: ',gridEnd);

            // Increment timer each frame
            if(deltaTime)
            {
                t += deltaTime * 3;
            }

            // Update position
            let pos;
            if (t < 1) {
                pos = lerp(gridStart, gridEnd, t);
            } else {
                // Snap to the final position
                pos = gridEnd;
                // Update the player's cell reference


                t = 0; // Reset t for the next segment
                pathIndex++; // Move to the next segment
                if (pathIndex >= pathManager.path.length - 1) {
                    pathManager.clearPath();
                    console.log('Path completed');
                }
            }
            console.log('Position: ',pos);

            grid.setPosition(pos);
        }
    }

    function render() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Reset canvas state
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'black';

        
        // Draw grid
        grid.draw(ctx);

        // Draw player
        player.draw(ctx);

        pathManager.draw(ctx);
    }

    function handleMouseMove(event) {
        mousePosition = getMousePosition(canvas, event);
        currentCell = grid.getCell(mousePosition.x, mousePosition.y);
    }

    function handleMouseClick(event) {
        // Get mouse position and calculate cell reference
        const clickPosition = getMousePosition(canvas, event);
        const clickedCell = grid.getCell(clickPosition.x, clickPosition.y);
        console.log('Clicked cell:', clickedCell.row, clickedCell.col);

        // Check if the clicked cell is within bounds
        if (clickedCell.row < 0 || clickedCell.row >= grid.rows || clickedCell.col < 0 || clickedCell.col >= grid.cols) {
            console.log('Clicked outside the grid');
            return;
        }

        // Check if the clicked cell is a closed cell
        if (grid.isClosedCell(clickedCell.row, clickedCell.col)) {
            console.log('Clicked on a closed cell');
            return;
        }

        // Calculate path from player to clicked cell
        pathIndex = 0;
        t = 0;
        pathManager.setPath(astar(grid, player.cell, clickedCell));
        console.log('Path from: ', player.cell, ' to ', clickedCell);
    }


    onMount(() => {
        console.log('Animation Canvas mounted');

        // Initialize canvas context
        ctx = initCanvas(canvas); 
        grid.draw(ctx);

        console.log(player);
        
        //Start animation loop
        animate();

        // Handle window resize event
        window.addEventListener('resize', () => { resizeCanvas(canvas) });
        console.log('Resize event listener added');

        // Cleanup on component destroy
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
            console.log('Event listeners removed');
        };

    })
</script>

<canvas bind:this={canvas} on:mousemove={handleMouseMove} on:click={handleMouseClick}></canvas>
<div class="overlay">
    <div class="grid-info infobox">
        <p>Mouse position: {mousePosition.x}, {mousePosition.y}</p>
        <p>Current cell: {currentCell.row}, {currentCell.col}</p>
    </div>
</div>

<style>
    canvas {
        width: 100%;
        height: 100%;
        background-color: white; /* Ensure the background color is set */
    }

    .infobox {
        color: white;
        padding: 10px 0px;
        margin: 5px 10px;
    }

    .overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
        flex-direction: row;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        padding: 10px;
    }
</style>