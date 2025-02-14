document.addEventListener("DOMContentLoaded", function () {
    // Admin Login Form Handling
    const adminLoginForm = document.getElementById("adminLoginForm");
    if (adminLoginForm) {
        adminLoginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const adminUserId = document.getElementById("adminUserId").value;
            const adminPassword = document.getElementById("adminPassword").value;
            
            if (adminUserId === "adm" && adminPassword === "adm") {
                alert("Admin login successful!");
                window.location.href = "admin_home.html";
            } else {
                alert("Invalid Admin Credentials");
            }
        });
    }

    // User Login Form Handling
    const userLoginForm = document.getElementById("userLoginForm");
    if (userLoginForm) {
        userLoginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const userId = document.getElementById("userId").value;
            const userPassword = document.getElementById("userPassword").value;
            
            if (userId === "user1" && userPassword === "user1") {
                alert("User login successful!");
                window.location.href = "user_home.html";
            } else {
                alert("Invalid User Credentials");
            }
        });
    }

    // Book Availability Form Handling
    const bookAvailabilityForm = document.getElementById("bookAvailabilityForm");
    if (bookAvailabilityForm) {
        bookAvailabilityForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const bookName = document.getElementById("bookName").value;
            const authorName = document.getElementById("authorName").value;
            
            document.getElementById("searchResults").innerHTML = `Searching for book: ${bookName} by ${authorName}...`;
        });
    }

    // Book Issue Form Handling
    const bookIssueForm = document.getElementById("bookIssueForm");
    if (bookIssueForm) {
        bookIssueForm.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Book issued successfully!");
        });
    }

    // Update Book Form Handling
    const updateBookForm = document.getElementById("updateBookForm");
    if (updateBookForm) {
        updateBookForm.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Book details updated successfully!");
        });
    }

    // Pay Fine Form Handling
    const payFineForm = document.getElementById("payFineForm");
    if (payFineForm) {
        payFineForm.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Fine payment processed successfully!");
        });
    }

    // Overdue Returns Table Handling
    const overdueTable = document.querySelector("#overdueTable tbody");
    if (overdueTable) {
        console.log("Overdue returns table loaded.");
    }

    // Active Issues Table Handling
    const activeIssuesTable = document.querySelector("#activeIssuesTable tbody");
    if (activeIssuesTable) {
        console.log("Active issues table loaded.");
    }

    // Add Book Form Handling
    const addBookForm = document.getElementById("addBookForm");
    if (addBookForm) {
        addBookForm.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Book added successfully!");
        });
    }

    // Add Membership Form Handling
    const addMembershipForm = document.getElementById("addMembershipForm");
    if (addMembershipForm) {
        addMembershipForm.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Membership added successfully!");
        });
    }

    // Transaction Canceled Handling
    const cancelTransactionLink = document.getElementById("cancelTransaction");
    if (cancelTransactionLink) {
        cancelTransactionLink.addEventListener("click", function () {
            alert("Transaction has been canceled.");
            window.location.href = "transactions.html";
        });
    }

    // Logout Handling
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            alert("You have been logged out.");
            window.location.href = "index.html";
        });
    }
});



document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("adminLoginForm")?.addEventListener("submit", async function (event) {
        event.preventDefault();
        const adminUserId = document.getElementById("adminUserId").value;
        const adminPassword = document.getElementById("adminPassword").value;

        const response = await fetch('/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ adminUserId, adminPassword })
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message);
            localStorage.setItem("token", data.token);
            window.location.href = "admin_home.html";
        } else {
            alert(data.message);
        }
    });

    document.getElementById("updateMembershipForm")?.addEventListener("submit", async function (event) {
        event.preventDefault();
        const membershipId = document.getElementById("membershipId").value;
        const startDate = document.getElementById("startDate").value;
        const endDate = document.getElementById("endDate").value;
        const membershipType = document.getElementById("membershipType").value;
        const removeMembership = document.getElementById("removeMembership").checked;

        if (removeMembership) {
            await fetch('/membership/remove', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ membershipId })
            });
            alert("Membership removed successfully!");
        } else {
            await fetch('/membership/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ membershipId, startDate, endDate, type: membershipType })
            });
            alert("Membership updated successfully!");
        }
    });
});
