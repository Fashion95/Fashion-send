// Enhanced JavaScript for Money Transfer Service

document.addEventListener("DOMContentLoaded", () => {
    const transferForm = document.getElementById("transferForm");
    const calculateFeeButton = document.getElementById("calculateFee");
    const feeDisplay = document.getElementById("feeDisplay");
    const transactionList = document.getElementById("transactionList");

    // Add search bar for transaction history
    const searchInput = document.createElement("input");
    searchInput.setAttribute("type", "text");
    searchInput.setAttribute("placeholder", "Search transactions...");
    searchInput.id = "searchInput";

    const searchButton = document.createElement("button");
    searchButton.textContent = "Search";
    searchButton.id = "searchButton";

    document.querySelector(".transaction-history").prepend(searchInput, searchButton);

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

    // Search transactions
    searchButton.addEventListener("click", () => {
        const query = searchInput.value.toLowerCase();
        const transactions = transactionList.querySelectorAll("li");

        transactions.forEach(transaction => {
            if (transaction.textContent.toLowerCase().includes(query)) {
                transaction.style.display = "block";
            } else {
                transaction.style.display = "none";
            }
        });
    });

    // Add filter by payment method
    const filterSelect = document.createElement("select");
    filterSelect.innerHTML = `
        <option value="all">All Payment Methods</option>
        <option value="mobileMoney">Mobile Money</option>
        <option value="bankTransfer">Bank Transfer</option>
        <option value="creditCard">Credit/Debit Card</option>
    `;
    filterSelect.id = "filterSelect";
    document.querySelector(".transaction-history").prepend(filterSelect);

    filterSelect.addEventListener("change", () => {
        const filter = filterSelect.value;
        const transactions = transactionList.querySelectorAll("li");

        transactions.forEach(transaction => {
            if (filter === "all" || transaction.textContent.toLowerCase().includes(filter)) {
                transaction.style.display = "block";
            } else {
                transaction.style.display = "none";
            }
        });
    });

    // Add clear history feature
    const clearHistoryButton = document.createElement("button");
    clearHistoryButton.textContent = "Clear Transaction History";
    clearHistoryButton.id = "clearHistoryButton";
    document.querySelector(".transaction-history").appendChild(clearHistoryButton);

    clearHistoryButton.addEventListener("click", () => {
        if (confirm("Are you sure you want to clear all transaction history?")) {
            transactionList.innerHTML = "";
        }
    });

    // Ensure dynamic elements are styled correctly
    document.querySelectorAll("button, input, select").forEach(element => {
        element.style.margin = "5px";
        element.style.padding = "5px 10px";
    });
});
