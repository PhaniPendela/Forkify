console.log('🎯 Netlify Debug Script Loaded!');
console.log('📍 Location:', window.location.href);
console.log('📂 Base URL:', document.baseURI);

// Test fetching the JS file
fetch('./Forkify.e128409d.js')
  .then(response => {
    console.log('🔍 JS File Response Status:', response.status);
    console.log('🔍 JS File Response OK:', response.ok);
    console.log('🔍 JS File Response URL:', response.url);
    return response.text();
  })
  .then(text => {
    console.log('📝 JS File Content Length:', text.length);
    console.log('📝 First 100 chars:', text.substring(0, 100));
  })
  .catch(error => {
    console.error('❌ Error fetching JS file:', error);
  });

// List all script tags
const scripts = document.querySelectorAll('script');
console.log('🎬 All script tags:');
scripts.forEach((script, index) => {
  console.log(`Script ${index}:`, {
    src: script.src,
    type: script.type,
    textContent: script.textContent.substring(0, 50)
  });
});
