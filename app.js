const surveyForm = document.getElementById("surveyForm");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");

surveyForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    message.textContent = "";
    message.className = "";

    // Checks Top 5 feature selection
    const topFeatures = document.querySelectorAll('input[name="top_features[]"]:checked');

    if (topFeatures.length !== 5) {
        message.textContent = "Please select exactly 5 top features.";
        message.className = "error-message";
        return;
    }

    // Checks Engage options
    const engageOptions = document.querySelectorAll('input[name="engage_options[]"]:checked');

    if (engageOptions.length === 0) {
        message.textContent = "Please select at least one engagement option.";
        message.className = "error-message";
        return;
    }

    // Checks Category preference
    const categories = document.querySelectorAll('input[name="category_preference[]"]:checked');

    if (categories.length === 0) {
        message.textContent = "Please select at least one content category.";
        message.className = "error-message";
        return;
    }

    // Checks Trust labels
    const trustLabels = document.querySelectorAll('input[name="trust_labels[]"]:checked');

    if (trustLabels.length === 0) {
        message.textContent = "Please select at least one trust/credibility option.";
        message.className = "error-message";
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    const formData = new FormData(surveyForm);

    try {
        const response = await fetch(surveyForm.action, {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        });

        if (response.ok) {
            message.textContent = "Thank you! Your feature ranking survey was submitted.";
            message.className = "success-message";
            surveyForm.reset();
        } else {
            message.textContent = "Something went wrong. Please try submitting again.";
            message.className = "error-message";
        }
    } catch (error) {
        message.textContent = "Network error. Please check your connection and try again.";
        message.className = "error-message";
    }

    submitBtn.disabled = false;
    submitBtn.textContent = "Submit Survey";
});