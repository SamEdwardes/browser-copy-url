import { serve } from "bun";

// Simple static file server for testing
const server = serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);
    let filePath = url.pathname;
    
    // Default to index.html
    if (filePath === '/') {
      filePath = '/tests/example.html';
    }
    
    // Remove leading slash for file access
    filePath = filePath.startsWith('/') ? filePath.slice(1) : filePath;

    try {
      const file = Bun.file(filePath);
      const exists = file.size > 0;
      
      if (exists) {
        // Determine content type based on extension
        const ext = filePath.split('.').pop();
        let contentType = 'text/plain';
        
        switch (ext) {
          case 'html':
            contentType = 'text/html';
            break;
          case 'js':
            contentType = 'application/javascript';
            break;
          case 'css':
            contentType = 'text/css';
            break;
          case 'json':
            contentType = 'application/json';
            break;
          case 'png':
            contentType = 'image/png';
            break;
          case 'jpg':
          case 'jpeg':
            contentType = 'image/jpeg';
            break;
        }
        
        return new Response(file, {
          headers: {
            "Content-Type": contentType
          }
        });
      }
    } catch (err) {
      console.error(`Error serving ${filePath}:`, err);
    }
    
    return new Response("File not found", { status: 404 });
  }
});

console.log(`Server running at http://localhost:${server.port}`);