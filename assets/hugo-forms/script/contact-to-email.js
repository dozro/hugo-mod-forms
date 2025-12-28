// Contact to Email JavaScript
// This script captures form submissions and sends the data to a specified email address.
// Copyright 2025 by Rye (itsrye.dev)

var formElement;

function initializeContactForm(formId, targetEmail, emailIsObfuscated) {
    formElement = document.getElementById(formId);

    formElement.addEventListener('submit', function (event) {
        event.preventDefault();
        sendFormData(targetEmail);
    });
}

function sendFormData(targetEmail) {
    var formData = new FormData(formElement);
    var emailBody = '';
    const subject = formData.get('subject') || 'Contact Form Submission';
    const attachment = formData.get('attachment');
    const output = document.createElement("div");

    formData.forEach(function (value, key) {
        emailBody += "<strong>" + key + "</strong>: " + value + "\n";
    });

    if (attachment && attachment.size > 0) {
        emailBody += "Attachment included: " + attachment.name + "\n\n";
    }

    const reader = new FileReader();
    reader.onload = function () {
        const base64Data = reader.result;
        if (attachment.type.startsWith("image/")) {
            const img = document.createElement("img");
            img.src = base64Data;
            img.style.maxWidth = "300px";
            img.alt = file.name;
            output.appendChild(img);
        } else {
            const link = document.createElement("a");
            link.href = base64Data;
            link.download = file.name;
            link.textContent = `Download ${file.name}`;
            link.style.display = "inline-block";
            link.style.marginTop = "10px";

            output.appendChild(link);
        }
    };
    reader.readAsDataURL(attachment);

    emailBody += "\n\n" + output.innerHTML;

    var mailtoLink = 'mailto:' + targetEmail + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(emailBody);
    window.location.href = mailtoLink;
}