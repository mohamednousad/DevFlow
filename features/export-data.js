function exportToJSON(data) {
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  chrome.downloads.download({ url, filename: 'export.json' });
}

function exportToPDF(content) {
  // Requires PDF library like jsPDF
  const doc = new jsPDF();
  doc.text(content, 10, 10);
  doc.save('export.pdf');
}