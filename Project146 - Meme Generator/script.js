// Constants for the Imgflip API
const IMGFLIP_API = 'https://api.imgflip.com';
let memeTemplates = [];

// Fetch meme templates when the page loads
window.onload = async function() {
    try {
        const response = await fetch(`${IMGFLIP_API}/get_memes`);
        const data = await response.json();
        memeTemplates = data.data.memes;
        
        // Populate the select dropdown with meme templates
        const imageSelect = document.getElementById("imageSelect");
        imageSelect.innerHTML = memeTemplates
            .map(template => `<option value="${template.id}">${template.name}</option>`)
            .join('');
            
        // Show the first meme template as preview
        if (memeTemplates.length > 0) {
            document.getElementById("meme-image").src = memeTemplates[0].url;
        }
    } catch (error) {
        console.error('Error fetching meme templates:', error);
    }
}

// Update preview when template is changed
document.getElementById("imageSelect").addEventListener('change', function() {
    const selectedTemplate = memeTemplates.find(template => template.id === this.value);
    if (selectedTemplate) {
        document.getElementById("meme-image").src = selectedTemplate.url;
    }
});

async function generateMeme() {
    const topText = document.getElementById("topText").value;
    const bottomText = document.getElementById("bottomText").value;
    const imageSelect = document.getElementById("imageSelect");
    const templateId = imageSelect.value;

    if (!templateId) {
        alert('Please select a meme template');
        return;
    }

    // Create form data for the API request
    const formData = new FormData();
    formData.append('template_id', templateId);
    formData.append('username', 'demo_user');  // Replace with your Imgflip username
    formData.append('password', 'demo_pass');  // Replace with your Imgflip password
    formData.append('text0', topText);
    formData.append('text1', bottomText);

    try {
        const response = await fetch(`${IMGFLIP_API}/caption_image`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        
        if (data.success) {
            // Show the generated meme
            const generatedMeme = document.getElementById("generated-meme");
            generatedMeme.src = data.data.url;
            generatedMeme.style.display = "block";
        } else {
            alert('Failed to generate meme: ' + data.error_message);
        }
    } catch (error) {
        console.error('Error generating meme:', error);
        alert('Failed to generate meme. Please try again.');
    }
}