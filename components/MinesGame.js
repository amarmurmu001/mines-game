"use client"
import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';

const MinesGame = ({ wallet, updateWallet }) => {
    const [mode, setMode] = useState('manual');
    const [betAmount, setBetAmount] = useState(0);
    const [mines, setMines] = useState(3);
    const [isGameActive, setIsGameActive] = useState(false);
    const [revealed, setRevealed] = useState([]);
    const [bombs, setBombs] = useState([]);
    const [multiplication, setMultiplication] = useState(1);
    const [isGameOver, setIsGameOver] = useState(false);

    const gridSize = 5; // 5x5 grid

    // Initialize the game
    useEffect(() => {
        if (isGameActive) {
            setRevealed([]);
            setIsGameOver(false);
            setMultiplication(1);
            generateBombs();
        }
    }, [isGameActive]);

    // Function to generate bomb locations
    const generateBombs = () => {
        const totalCells = gridSize * gridSize;
        let bombLocations = [];
        while (bombLocations.length < mines) {
            const rand = Math.floor(Math.random() * totalCells);
            if (!bombLocations.includes(rand)) {
                bombLocations.push(rand);
            }
        }
        setBombs(bombLocations);
    };

    // Handle cell click
    const handleCellClick = (index) => {
        if (isGameOver || revealed.includes(index)) return;
        if (bombs.includes(index)) {
            setIsGameOver(true);
            setRevealed([...revealed, index]);
            setIsGameActive(false);
        } else {
            setRevealed([...revealed, index]);
            setMultiplication(prev => prev * 1.5);
        }
    };

    // Handle betting
    const handleBet = () => {
        if (betAmount <= 0 || betAmount > wallet) return;
        updateWallet(-betAmount);
        setIsGameActive(true);
    };

    // Handle cash out
    const handleCashOut = () => {
        if (isGameActive && !isGameOver) {
            updateWallet(betAmount * multiplication);
            setIsGameActive(false);
            setRevealed([]); // Hide emojis after cashing out
        }
    };

    return (
        <div className="bg-[#1A2C38] text-white p-4 rounded-lg w-full max-w-3xl mx-auto">
            <div className="flex flex-col-reverse gap-6 md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="md:w-1/4 w-full">
                    <div className="flex mb-4 bg-[#243A4E] rounded-md overflow-hidden">
                        <button 
                            className={`flex-1 py-1 text-sm ${mode === 'manual' ? 'bg-[#2F4A63]' : ''}`}
                            onClick={() => setMode('manual')}
                        >
                            Manual
                        </button>
                        <button 
                            className={`flex-1 py-1 text-sm ${mode === 'auto' ? 'bg-[#2F4A63]' : ''}`}
                            onClick={() => setMode('auto')}
                        >
                            Auto
                        </button>
                    </div>

                    <div className="mb-3">
                        <label className="block mb-1 text-xs text-gray-400">Bet Amount</label>
                        <div className="flex items-center bg-[#243A4E] rounded-md">
                            <input 
                                type="number" 
                                value={betAmount}
                                onChange={(e) => setBetAmount(parseFloat(e.target.value) || 0)}
                                className="w-full bg-transparent py-1 px-2 text-sm focus:outline-none"
                            />
                            <button 
                                className="px-1 py-1 text-xs text-yellow-400"
                                onClick={() => setBetAmount(prev => prev / 2)}
                            >
                                ½
                            </button>
                            <button 
                                className="px-1 py-1 mr-1 text-xs"
                                onClick={() => setBetAmount(prev => prev * 2)}
                            >
                                2×
                            </button>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 text-xs text-gray-400">Mines</label>
                        <select 
                            value={mines}
                            onChange={(e) => setMines(parseInt(e.target.value))}
                            className="w-full bg-[#243A4E] py-1 px-2 rounded-md focus:outline-none text-sm"
                        >
                            {[...Array(24)].map((_, i) => (
                                <option key={i} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                    </div>

                    <button 
                        onClick={isGameActive ? handleCashOut : handleBet}
                        className={`w-full ${isGameActive ? 'bg-red-500' : 'bg-green-500'} text-white py-2 rounded-md font-bold text-sm`}
                    >
                        {isGameActive ? 'Cash Out' : 'Bet'}
                    </button>
                    {isGameActive && !isGameOver && (
                        <div className="text-center mt-2 text-yellow-400">
                            Multiplier: {multiplication.toFixed(2)}x<br />
                            Amount: {(betAmount * multiplication).toFixed(2)}
                        </div>
                    )}
                </div>

                <div className="md:w-3/4 w-full grid grid-cols-5 gap-2">
                    {[...Array(gridSize * gridSize)].map((_, index) => (
                        <animated.div 
                            key={index} 
                            className={`aspect-square bg-[#243A4E] rounded-md cursor-pointer hover:bg-[#2F4A63] transition-colors flex items-center justify-center text-2xl ${revealed.includes(index) ? 'opacity-100' : 'opacity-50'}`}
                            onClick={() => handleCellClick(index)}
                        >
                            {revealed.includes(index) ? (bombs.includes(index) ? '💣' : '💎') : ''}
                        </animated.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MinesGame;
