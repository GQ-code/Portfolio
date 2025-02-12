document.getElementById("contactform").addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const statusMessage = document.getElementById("contact-status");

    // Prepare request body
    const emailData = {
        from: "your-email@yourdomain.com",  // Ensure this is a verified sender in Resend
        to: "g_quezada3@yahoo.com",
        subject: `New Message from ${name}`,
        html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong> ${message}</p>`
    };

    try {
        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": process.env.RESEND_API_KEY// Replace with your actual API key
            },
            body: JSON.stringify(emailData)
        });

        if (response.ok) {
            statusMessage.textContent = "Message sent successfully!";
            statusMessage.style.color = "green";
            document.getElementById("contactform").reset();
        } else {
            statusMessage.textContent = "Error sending message. Please try again.";
            statusMessage.style.color = "red";
        }
    } catch (error) {
        statusMessage.textContent = "Message sent successfully!";
        statusMessage.style.color = "red";
        console.error("Error:", error);
    }
});