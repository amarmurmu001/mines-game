"use client"
import React, { useState, useEffect } from 'react';
import MinesGame from '../components/MinesGame';
import WalletModal from '../components/WalletModal';

export default function Home() {
    const [walletOpen, setWalletOpen] = useState(false);
    const [balance, setBalance] = useState(0.00);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Get the initial balance from local storage or default to 0.00
            const storedBalance = parseFloat(localStorage.getItem('wallet')) || 0.00;
            setBalance(storedBalance);
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Update local storage whenever the balance changes
            localStorage.setItem('wallet', balance.toFixed(2));
        }
    }, [balance]);

    const openWalletModal = () => setWalletOpen(true);
    const closeWalletModal = () => setWalletOpen(false);

    const addMoneyToWallet = (amount) => {
        setBalance(prevBalance => prevBalance + amount);
    };

    const updateWallet = (amount) => {
        setBalance(prevBalance => prevBalance + amount);
    };

    return (
        <div className="min-h-screen bg-[#13202C]">
            <header className="bg-[#1A2C38] py-2 px-4 md:px-[20.6vw] flex justify-between items-center">
                <h1 className="text-white text-xl font-bold">MinesGame</h1>
                <div className="flex items-center bg-[#13202C] rounded-md space-x-4">
                    <span className="text-white py-2 mx-8 text-sm">₹{balance.toFixed(2)}</span>
                    <button 
                        className="bg-blue-500 text-white rounded-bl-none rounded-tl-none px-3 py-2 rounded text-sm"
                        onClick={openWalletModal}
                    >
                        Wallet
                    </button>
                </div>
            </header>
            <main className="container mx-auto py-4 px-4">
                <MinesGame wallet={balance} updateWallet={updateWallet} />
            </main>
            <WalletModal 
                isOpen={walletOpen} 
                onRequestClose={closeWalletModal} 
                addMoney={addMoneyToWallet} 
            />
        </div>
    );
}
