import { readFileSync, existsSync, lstatSync, mkdirSync, symlinkSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';

const manifest = 'workspace.yaml';
const fail = (line, message) => { console.error(`${manifest}:${line}: ${message}`); process.exit(1); };
let text;
try { text = readFileSync(manifest, 'utf8'); }
catch (error) { console.error(`${manifest}: ${error.message}`); process.exit(1); }
const repos = [];
let section = false, current = null;
const seenTop = new Set();
for (const [index, original] of text.split(/\r?\n/).entries()) {
  const lineNo = index + 1;
  if (!original.trim() || original.trimStart().startsWith('#')) continue;
  if (/\t/.test(original)) fail(lineNo, 'tabs are not allowed');
  let m;
  if (!/^\s/.test(original)) {
    m = /^(schemaVersion|id|name):\s*(\S+)\s*$/.exec(original);
    if (m) {
      if (seenTop.has(m[1])) fail(lineNo, `duplicate key ${m[1]}`);
      seenTop.add(m[1]);
      if ((m[1] === 'schemaVersion' && m[2] !== '1') || (m[1] !== 'schemaVersion' && !/^[A-Za-z0-9._-]+$/.test(m[2]))) fail(lineNo, `invalid value for ${m[1]}`);
      continue;
    }
    if (original === 'repos:') { if (section) fail(lineNo, 'duplicate repos section'); section = true; continue; }
    fail(lineNo, 'malformed or unsupported top-level entry');
  }
  if (!section) fail(lineNo, 'entry before repos section');
  m = /^  - name: ([A-Za-z0-9._-]+)\s*$/.exec(original);
  if (m) {
    if (current && !current.url) fail(current.line, 'repository entry is missing url');
    if (repos.some(repo => repo.name === m[1])) fail(lineNo, `duplicate repository name ${m[1]}`);
    current = { name: m[1], line: lineNo }; repos.push(current); continue;
  }
  m = /^    url: (https?:\/\/[A-Za-z0-9._~:/?#\[\]@!$&'()*+,;=%-]+)\s*$/.exec(original);
  if (m && current && !current.url) { current.url = m[1]; continue; }
  fail(lineNo, 'malformed repository entry; expected "  - name: NAME" or "    url: URL"');
}
for (const key of ['schemaVersion', 'id', 'name', 'repos']) if (!seenTop.has(key) && !(key === 'repos' && section)) fail(Math.max(1, text.split(/\r?\n/).length), `missing ${key}`);
if (repos.length === 0) fail(1, 'repos must contain at least one repository');
for (const repo of repos) if (!repo.url) fail(repo.line, 'repository entry is missing url');

function git(args, cwd) {
  return spawnSync('git', args, { cwd, encoding: 'utf8' });
}
function originOf(path, expected, line) {
  const root = git(['rev-parse', '--show-toplevel'], path);
  if (root.status !== 0) {
    console.error(`make init: ${path} is not a git checkout (expected origin ${expected})`);
    console.error(root.stderr.trim()); process.exit(1);
  }
  const origin = git(['remote', 'get-url', 'origin'], path);
  if (origin.status !== 0) {
    console.error(`make init: ${path} has no origin; expected ${expected}`);
    process.exit(1);
  }
  const actual = origin.stdout.trim();
  if (actual !== expected) {
    console.error(`make init: refusing ${path}: origin mismatch\n  expected: ${expected}\n  actual:   ${actual}`);
    process.exit(1);
  }
}
for (const repo of repos) {
  const target = resolve('repos', repo.name);
  let exists = false;
  try { lstatSync(target); exists = true; } catch {}
  if (exists) { console.log(`repos/${repo.name} already exists; leaving it unchanged`); continue; }
  const envName = repo.name.toUpperCase().replace(/-/g, '_');
  const checkout = process.env[envName];
  if (checkout) {
    const source = resolve(checkout);
    originOf(source, repo.url, repo.line);
    mkdirSync(dirname(target), { recursive: true });
    symlinkSync(source, target, 'dir');
    console.log(`linked repos/${repo.name} -> ${source}`);
  } else {
    mkdirSync(dirname(target), { recursive: true });
    const result = git(['clone', repo.url, target], process.cwd());
    if (result.status !== 0) {
      console.error(`make init: clone failed for ${repo.url} into repos/${repo.name}`);
      console.error(result.stderr.trim()); process.exit(result.status ?? 1);
    }
    console.log(`cloned ${repo.url} into repos/${repo.name}`);
  }
}
