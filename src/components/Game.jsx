import React, { useState, useEffect, useRef } from 'react';

const Game = () => {
    const canvasRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    // Game constants
    const GRAVITY = 0.6;
    const JUMP_FORCE = -10;
    const SPEED = 5;

    // Game state
    const player = useRef({ x: 50, y: 200, dy: 0, size: 30, grounded: false });
    const obstacles = useRef([]);
    const frameId = useRef(null);
    const scoreRef = useRef(0);

    useEffect(() => {
        const stored = localStorage.getItem('versa-high-score');
        if (stored) setHighScore(parseInt(stored));
    }, []);

    const startGame = () => {
        setIsPlaying(true);
        setGameOver(false);
        setScore(0);
        scoreRef.current = 0;
        player.current = { x: 50, y: 200, dy: 0, size: 30, grounded: false };
        obstacles.current = [];

        loop();

        // Add obstacles periodically (simplified for this demo)
        // Ideally handled in loop, but here we push initial and let loop handle spawning
        obstacles.current.push({ x: 600, y: 270, w: 20, h: 30 });
    };

    const handleJump = () => {
        if (!isPlaying && !gameOver) {
            startGame();
            return;
        }
        if (gameOver) {
            startGame();
            return;
        }

        if (player.current.grounded) {
            player.current.dy = JUMP_FORCE;
            player.current.grounded = false;
        }
    };

    const loop = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update Player
        player.current.dy += GRAVITY;
        player.current.y += player.current.dy;

        // Ground collision
        if (player.current.y + player.current.size > 300) {
            player.current.y = 300 - player.current.size;
            player.current.dy = 0;
            player.current.grounded = true;
        }

        // Update Obstacles
        if (Math.random() < 0.015) {
            // Spawn with minimum distance
            const last = obstacles.current[obstacles.current.length - 1];
            if (!last || (canvas.width - last.x > 250)) {
                obstacles.current.push({ x: canvas.width, y: 270, w: 20 + Math.random() * 20, h: 30 });
            }
        }

        obstacles.current.forEach(obs => {
            obs.x -= SPEED;
        });

        // Remove off-screen
        obstacles.current = obstacles.current.filter(obs => obs.x + obs.w > 0);

        // Collision Detection
        obstacles.current.forEach(obs => {
            if (
                player.current.x < obs.x + obs.w &&
                player.current.x + player.current.size > obs.x &&
                player.current.y < obs.y + obs.h &&
                player.current.y + player.current.size > obs.y
            ) {
                // Collision!
                endGame();
            }
        });

        if (!isPlaying) return; // If endGame set isPlaying false

        // Draw Player
        ctx.fillStyle = '#FA5F1A';
        ctx.fillRect(player.current.x, player.current.y, player.current.size, player.current.size);

        // Draw Obstacles
        ctx.fillStyle = '#22D3EE';
        obstacles.current.forEach(obs => {
            ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
        });

        // Draw Floor
        ctx.fillStyle = '#253041';
        ctx.fillRect(0, 300, canvas.width, 2);

        // Score
        scoreRef.current++;
        if (scoreRef.current % 10 === 0) setScore(Math.floor(scoreRef.current / 10));

        frameId.current = requestAnimationFrame(loop);
    };

    const endGame = () => {
        setIsPlaying(false);
        setGameOver(true);
        if (frameId.current) cancelAnimationFrame(frameId.current);

        const currentScore = Math.floor(scoreRef.current / 10);
        if (currentScore > highScore) {
            setHighScore(currentScore);
            localStorage.setItem('versa-high-score', currentScore.toString());
        }
    };

    useEffect(() => {
        return () => {
            if (frameId.current) cancelAnimationFrame(frameId.current);
        };
    }, []);

    return (
        <div className="w-full max-w-2xl mx-auto p-4 bg-card rounded-2xl border border-border text-center">
            <h2 className="text-2xl font-bold font-outfit text-white mb-2">Latency Runner</h2>
            <p className="text-muted mb-4 text-sm">Jump over the latency spikes! (Click or Space)</p>

            <div className="relative mx-auto" style={{ width: 600, height: 320 }}>
                <canvas
                    ref={canvasRef}
                    width={600}
                    height={320}
                    className="bg-background rounded-lg border border-border cursor-pointer select-none"
                    onClick={handleJump}
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.code === 'Space') handleJump(); }}
                />

                {!isPlaying && !gameOver && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg pointer-events-none">
                        <p className="text-white text-xl font-bold">Click to Start</p>
                    </div>
                )}

                {gameOver && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 rounded-lg pointer-events-none">
                        <p className="text-primary text-2xl font-bold mb-2">Connection Lost!</p>
                        <p className="text-white text-lg">Score: {score}</p>
                        <p className="text-muted mt-2">Click to Retry</p>
                    </div>
                )}
            </div>

            <div className="flex justify-between mt-4 px-4 text-sm font-mono">
                <span className="text-primary">Current: {score}ms</span>
                <span className="text-accent">Best: {highScore}ms</span>
            </div>
        </div>
    );
};

export default Game;
