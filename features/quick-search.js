// document.addEventListener('keydown', (e) => {
//   if (e.ctrlKey && e.code === 'Space') {
//     document.getElementById('search-modal').classList.toggle('active');
//   }
// });

// function searchContent(query) {
//   const notes = JSON.parse(localStorage.getItem('notes') || [];
//   const links = JSON.parse(localStorage.getItem('links') || [];
//   return [...notes, ...links].filter(item => 
//     item.content.toLowerCase().includes(query.toLowerCase())  
//   );
// }