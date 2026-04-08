function openOfficialSite() {
    // Ye line aapki puri website ka purana content delete kar degi
    document.open();
    
    // Ye naya content (iframe) load karegi jo poori screen cover kar lega
    document.write(`
        <style>
            body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; }
            iframe { width: 100%; height: 100vh; border: none; }
        </style>
        <iframe src="https://8c8140sq3ljwet6b-82d35bxa0.hop.clickbank.net/?&campaign=ads&creative=graphics&ad=google"></iframe>
    `);
    
    document.close();
}