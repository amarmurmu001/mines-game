"use client"
import React, { useState } from 'react';
import MinesGame from '../components/MinesGame';
import WalletModal from '../components/WalletModal';

export default function Home() {
    const [walletOpen, setWalletOpen] = useState(false);
    const [balance, setBalance] = useState(0.62);

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
            <header className="bg-[#1A2C38] py-2 px-4 flex justify-between items-center">
                <h1 className="text-white text-xl font-bold">Stake</h1>
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
