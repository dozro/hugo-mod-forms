// proof-of-work.js
// Copyright 2025 by Rye (itsrye.dev)

async function proofOfWork() {
    const encoder = new TextEncoder();
    var complexity = 3; // Number of leading zeros required
    let nonce = 0;
    while (true) {
        const data = encoder.encode('rye-hugo-forms-proof-of-work-' + nonce);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        if (hashHex.startsWith('0'.repeat(complexity))) {
            return hashHex;
        }
        nonce++;
    }
}

function doProofOfWork(elIdFormElement, elIdSubmitButton) {
    const submitButton = document.getElementById(elIdSubmitButton);
    console.log("Starting Proof of Work...");
    submitButton.disabled = true;
    proofOfWork().then((hash) => {
        console.log("got proof of work hash");
        console.log("Proof of Work completed with hash:", hash);
        const formElement = document.getElementById(elIdFormElement);
        if (formElement && submitButton) {
            formElement.setAttribute("value", hash);
            submitButton.disabled = false;
        }
    });
}
