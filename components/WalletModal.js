"use client"
import React, { useState } from 'react';
import Modal from 'react-modal';

const WalletModal = ({ isOpen, onRequestClose, addMoney }) => {
    const [amount, setAmount] = useState('');

    const handleAddMoney = () => {
        if (amount && !isNaN(amount)) {
            addMoney(parseFloat(amount));
            setAmount('');
            onRequestClose();
        }
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onRequestClose}
            className="flex flex-col items-center justify-center bg-[#1A2C38] p-4 rounded-lg outline-none w-full max-w-md mx-auto"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
            <h2 className="text-white text-lg mb-4">Add Money to Wallet</h2>
            <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-[#243A4E] py-1 px-2 rounded-md focus:outline-none text-sm mb-4 text-white"
                placeholder="Enter amount"
            />
            <div className="flex justify-end space-x-4">
                <button 
                    onClick={onRequestClose} 
                    className="bg-gray-500 text-white px-3 py-1 rounded text-sm"
                >
                    Cancel
                </button>
                <button 
                    onClick={handleAddMoney} 
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                >
                    Add
                </button>
            </div>
        </Modal>
    );
};

export default WalletModal;
