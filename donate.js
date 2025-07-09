document.getElementById("donateForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const mobile = document.getElementById("mobile").value;
    const address = document.getElementById("address").value;
    let foodItem = document.getElementById("foodItem").value;
    const preparedTime = document.getElementById("preparedTime").value;
    const eventProof = document.getElementById("eventProof").files[0];

    if (foodItem === "Others") {
        foodItem = document.getElementById("otherFood").value;
    }

    if (!name || !mobile || !address || !foodItem || !preparedTime || !eventProof) {
        alert("All fields are required!");
        return;
    }

    // Convert file to Base64
    const reader = new FileReader();
    reader.readAsDataURL(eventProof);
    reader.onload = async function () {
        const eventProofBase64 = reader.result;

        const donationData = { 
            name, 
            mobile, 
            address, 
            foodItem, 
            preparedTime, 
            eventProof: eventProofBase64 
        };

        try {
            const response = await fetch("http://127.0.0.1:5000/donate_food", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(donationData)
            });

            const result = await response.json();

            if (response.status === 200) {
                alert("Food donation successful!");
                document.getElementById("donateForm").reset();
            } else {
                alert("Error: " + result.error);
            }
        } catch (error) {
            console.error("Submission failed:", error);
            alert("Failed to submit donation.");
        }
    };
});
