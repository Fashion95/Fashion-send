// JavaScript for Money Transfer Service

document.addEventListener("DOMContentLoaded", () => {
    const transferForm = document.getElementById("transferForm");
    const calculateFeeButton = document.getElementById("calculateFee");
    const feeDisplay = document.getElementById("feeDisplay");
    const transactionList = document.getElementById("transactionList");

    // Fee calculation logic
    calculateFeeButton.addEventListener("click", () => {
        const amount = parseFloat(document.getElementById("amount").value);
        
        if (isNaN(amount) || amount <= 0) {
            feeDisplay.textContent = "Please enter a valid amount.";
            feeDisplay.style.color = "red";
        } else {
            const fee = calculateFee(amount);
            feeDisplay.textContent = `Transaction Fee: GHS ${fee.toFixed(2)}`;
            feeDisplay.style.color = "#333";
        }
    });

    // Function to calculate the fee (example logic: 2% of the amount)
    function calculateFee(amount) {
        return amount * 0.02;
    }

    // Handle form submission
    transferForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent actual form submission

        const senderName = document.getElementById("senderName").value;
        const receiverName = document.getElementById("receiverName").value;
        const amount = parseFloat(document.getElementById("amount").value);
        const paymentMethod = document.getElementById("paymentMethod").value;
        const fee = calculateFee(amount);

        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        // Display transaction in history
        addTransactionToHistory({
            senderName,
            receiverName,
            amount,
            fee,
            paymentMethod,
        });

        // Clear the form
        transferForm.reset();
        feeDisplay.textContent = "";
        alert("Transaction Successful!");
    });

    // Function to add a transaction to the history
    function addTransactionToHistory(transaction) {
        const { senderName, receiverName, amount, fee, paymentMethod } = transaction;

        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>Sender:</strong> ${senderName} <br>
            <strong>Receiver:</strong> ${receiverName} <br>
            <strong>Amount:</strong> GHS ${amount.toFixed(2)} <br>
            <strong>Fee:</strong> GHS ${fee.toFixed(2)} <br>
            <strong>Payment Method:</strong> ${paymentMethod}
        `;
        transactionList.appendChild(listItem);
    }
});
