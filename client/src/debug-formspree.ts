// Quick test to verify Formspree endpoint
console.log('Environment variables check:');
console.log('VITE_FORMSPREE_ENDPOINT:', import.meta.env.VITE_FORMSPREE_ENDPOINT);
console.log('Expected:', 'meopyozj');
console.log('Match:', import.meta.env.VITE_FORMSPREE_ENDPOINT === 'meopyozj');

// Test the actual endpoint
async function testFormspree() {
  const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
  if (!endpoint) {
    console.error('❌ VITE_FORMSPREE_ENDPOINT is not set!');
    return;
  }

  console.log(`\nTesting endpoint: https://formspree.io/f/${endpoint}`);
  
  const formData = new FormData();
  formData.append('name', 'Test User');
  formData.append('email', 'test@example.com');
  formData.append('message', 'This is a test message from the debug script');
  formData.append('_subject', 'Test submission');

  try {
    const response = await fetch(`https://formspree.io/f/${endpoint}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: formData,
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    
    const data = await response.json();
    console.log('Response data:', data);

    if (response.ok) {
      console.log('✅ Formspree is working correctly!');
    } else {
      console.error('❌ Formspree returned an error:', data);
    }
  } catch (error) {
    console.error('❌ Network error:', error);
  }
}

// Run test
testFormspree();
