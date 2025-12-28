// Contact to Email JavaScript
// Copyright 2025 by Rye (itsrye.dev)

let formElement;

function initializeContactForm(formId, targetEmail) {
    formElement = document.getElementById(formId);

    if (!formElement) {
        console.error("Form not found:", formId);
        return;
    }

    formElement.addEventListener("submit", function (event) {
        event.preventDefault();
        sendFormData(targetEmail);
    });
}

function sendFormData(targetEmail) {
    const formData = new FormData(formElement);
    let emailBody = "";
    const subject = formData.get("subject") || "Contact Form Submission";
    const attachment = formData.get("attachment");

    formData.forEach((value, key) => {
        if (value instanceof File) return; // skip file here
        emailBody += `${key}: ${value}\n`;
    });

    if (attachment && attachment.size > 0) {
        alert("The mailto protocol does not support attachments. Please attach the file manually in your email client.");
        openMailClient(targetEmail, subject, emailBody);
    } else {
        openMailClient(targetEmail, subject, emailBody);
    }
}

function openMailClient(targetEmail, subject, body) {
    const mailtoLink =
        "mailto:" +
        encodeURIComponent(targetEmail) +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);

    console.log("Generated mailto link:", mailtoLink);
    window.location.href = mailtoLink;
}
