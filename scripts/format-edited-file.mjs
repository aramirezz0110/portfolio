#!/usr/bin/env node
// Hook de formato para Claude Code (PostToolUse) y Cursor (afterFileEdit).
// Lee el JSON del hook por stdin, toma la ruta del archivo editado y corre Prettier.
// Respeta .prettierignore (el legado no se toca). Nunca bloquea a la IA: siempre sale con 0.
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const prettierBin = join(root, 'node_modules', '.bin', 'prettier');

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => (input += chunk));
process.stdin.on('end', () => {
  try {
    const payload = JSON.parse(input || '{}');
    const filePath = payload.tool_input?.file_path ?? payload.file_path;
    if (!filePath || !existsSync(filePath) || !existsSync(prettierBin)) return;
    execFileSync(prettierBin, ['--write', '--ignore-unknown', '--log-level', 'warn', filePath], {
      cwd: root,
      stdio: ['ignore', 'ignore', 'inherit'],
    });
  } catch {
    // El formato es una ayuda, no un bloqueo: npm run format:check lo detecta igual.
  }
});
