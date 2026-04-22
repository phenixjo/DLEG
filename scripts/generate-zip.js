import fs from 'fs';
import archiver from 'archiver';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

// S'assurer que le dossier public existe
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

const outputPath = path.join(publicDir, 'projet-dleg.zip');
const output = fs.createWriteStream(outputPath);
const archive = archiver('zip', {
  zlib: { level: 9 } // Compression maximale
});

output.on('close', function() {
  console.log(`Archive créée avec succès dans public/projet-dleg.zip (${archive.pointer()} octets)`);
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);

// Ajouter tous les fichiers du projet, en ignorant les dossiers inutiles
archive.glob('**/*', {
  cwd: rootDir,
  dot: true,
  ignore: [
    'node_modules/**',
    'dist/**',
    '.git/**',
    'public/projet-dleg.zip'
  ]
});

archive.finalize();
