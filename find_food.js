document.getElementById("locationForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const city = document.getElementById("city").value;

    try {
        const response = await fetch("http://127.0.0.1:5000/find_food", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ city })
        });

        const foodData = await response.json();
        displayFood(foodData);
    } catch (error) {
        console.error("Error fetching food data:", error);
        alert("Failed to fetch nearby food.");
    }
});

function displayFood(foodData) {
    const foodList = document.getElementById("foodList");
    foodList.innerHTML = "";

    if (foodData.length === 0) {
        foodList.innerHTML = "<p>No nearby food donations available.</p>";
        return;
    }

    foodData.forEach(donation => {
        const foodItem = document.createElement("div");
        foodItem.classList.add("food-box");
        foodItem.innerHTML = `
            <h4>${donation.foodItem}</h4>
            <p><strong>Donor:</strong> ${donation.name}</p>
            <p><strong>Contact:</strong> ${donation.mobile}</p>
            <p><strong>Address:</strong> ${donation.address}</p>
            <p><strong>Prepared:</strong> ${new Date(donation.preparedTime).toLocaleString()}</p>
            <p><strong>Expires At:</strong> ${donation.expiresAt}</p>
        `;
        foodList.appendChild(foodItem);
    });
}
