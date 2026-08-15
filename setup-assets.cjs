const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\as\\.gemini\\antigravity-ide\\brain\\1bfaf9eb-916d-4604-a0bf-64d1d568ee13';
const targetDir = 'd:\\picture\\Luân\\trungluanmmo\\public\\images';

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const files = fs.readdirSync(brainDir);
const findLatest = (prefix) => {
  const match = files.filter(f => f.startsWith(prefix) && f.endsWith('.png')).sort().pop();
  return match ? path.join(brainDir, match) : null;
};

const portrait = findLatest('luan_portrait');
const hometown = findLatest('hometown_hero');
const dld = findLatest('project_dld_hero');
const auto = findLatest('project_auto_hero');
const lab = findLatest('project_lab_hero');
const moment = findLatest('moment_coastal');

console.log('Found assets:', { portrait, hometown, dld, auto, lab, moment });

if (portrait) fs.copyFileSync(portrait, path.join(targetDir, 'luan-portrait.png'));
if (hometown) fs.copyFileSync(hometown, path.join(targetDir, 'hometown-hero.jpg'));

if (dld) {
  fs.copyFileSync(dld, path.join(targetDir, 'project-dld-01.jpg'));
  fs.copyFileSync(dld, path.join(targetDir, 'project-dld-02.jpg'));
  fs.copyFileSync(dld, path.join(targetDir, 'project-dld-03.jpg'));
}
if (auto) {
  fs.copyFileSync(auto, path.join(targetDir, 'project-auto-01.jpg'));
  fs.copyFileSync(auto, path.join(targetDir, 'project-auto-02.jpg'));
  fs.copyFileSync(auto, path.join(targetDir, 'project-auto-03.jpg'));
}
if (lab) {
  fs.copyFileSync(lab, path.join(targetDir, 'project-lab-01.jpg'));
  fs.copyFileSync(lab, path.join(targetDir, 'project-lab-02.jpg'));
  fs.copyFileSync(lab, path.join(targetDir, 'project-lab-03.jpg'));
}

const pool = [moment, hometown, dld, auto, lab, portrait].filter(Boolean);

for (let i = 1; i <= 7; i++) {
  const src = pool[(i - 1) % pool.length];
  if (src) fs.copyFileSync(src, path.join(targetDir, `moment-0${i}.jpg`));
}

for (let i = 1; i <= 4; i++) {
  const src = pool[(i + 1) % pool.length];
  if (src) fs.copyFileSync(src, path.join(targetDir, `about-0${i}.jpg`));
}

for (let i = 1; i <= 12; i++) {
  const numStr = i < 10 ? `0${i}` : `${i}`;
  const src = pool[(i * 3) % pool.length];
  if (src) fs.copyFileSync(src, path.join(targetDir, `story-${numStr}.jpg`));
}

console.log('Successfully copied all assets into public/images!');
