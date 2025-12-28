// Contact to Email JavaScript
// This script captures form submissions and sends the data to a specified email address.
// Copyright 2025 by Rye (itsrye.dev)

var formElement;

function initializeContactForm(formId, targetEmail, emailIsObfuscated) {
    formElement = document.getElementById(formId);

    formElement.addEventListener('submit', function(event) {
        event.preventDefault();
        sendFormData(targetEmail);
    });
}

function sendFormData(targetEmail) {
    var formData = new FormData(formElement);
    var emailBody = '';
    const subject = formData.get('subject') || 'Contact Form Submission';
    const attachment = formData.get('attachment');

    formData.forEach(function(value, key) {
        emailBody += "<strong>" + key + "</strong>: " + value + "\n";
    });

    if (attachment && attachment.size > 0) {
        emailBody += "Attachment included: " + attachment.name + "\n\n";
    }

    var mailtoLink = 'mailto:' + targetEmail + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(emailBody);
    window.location.href = mailtoLink;
}