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

    formData.forEach(function(value, key) {
        emailBody += key + ': ' + value + '\n';
    });

    var mailtoLink = 'mailto:' + targetEmail + '?subject=Contact Form Submission&body=' + encodeURIComponent(emailBody);
    window.location.href = mailtoLink;
}