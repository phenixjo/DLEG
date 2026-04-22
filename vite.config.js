import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [
    {
      name: 'zip-serve',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const urlPath = req.url ? req.url.split('?')[0] : '';
          if (urlPath === '/api/download-zip') {
            const zipPath = path.resolve(process.cwd(), 'public/projet-dleg.zip');
            if (fs.existsSync(zipPath)) {
              const stat = fs.statSync(zipPath);
              res.writeHead(200, {
                'Content-Type': 'application/zip',
                'Content-Length': stat.size,
                'Content-Disposition': 'attachment; filename="projet-dleg.zip"'
              });
              const readStream = fs.createReadStream(zipPath);
              readStream.pipe(res);
              return;
            } else {
              res.statusCode = 404;
              res.end('File not found');
              return;
            }
          }
          next();
        });
      }
    }
  ]
});
