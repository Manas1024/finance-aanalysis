document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('queryForm');
    const responseOutput = document.getElementById('responseOutput');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const queryInput = document.getElementById('queryInput').value;
        
        try {
            const response = await fetch('/api/query', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                responseOutput.textContent = JSON.stringify(data, null, 2);
            } else {
                responseOutput.textContent = 'Error fetching data';
            }
        } catch (error) {
            responseOutput.textContent = 'Error: ' + error.message;
        }
    });
});