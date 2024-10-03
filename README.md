# Multiplayer Grid Game

This project is a web-based multiplayer game where players can interact on a grid. Currently only client exists but planning to expand the project to include a server that uses socket.io to handle multiple clients.

## Features

- Grid translation relative to player (player is centered on screen)
- A* pathfinding algorithm implemented with corner cutting and tie breaking.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/multiplayer-grid-game.git
    ```
2. Navigate to the project directory:
    ```sh
    cd multiplayer-grid-game/client
    ```
3. Install dependencies:
    ```sh
    npm install
    ```

## Usage

1. Start the development server:
    ```sh
    npm run dev
    ```
2. Open your browser and navigate to `http://localhost:5173`.
