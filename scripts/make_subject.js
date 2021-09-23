const fs = require('fs');

// 참가자
const participants = ['bright', 'luka', 'negan', 'pepe', 'kei', 'raina'];

const directoryName = process.argv[2];

if (!directoryName) {
  return console.log('주제 명을 입력해주세요.(210915_subject');
}

if (!fs.existsSync(directoryName)) fs.mkdirSync(directoryName);

for (const name of participants) {
  const participantPath = `${directoryName}/${name}`;
  const readmePath = `${participantPath}/README.md`;
  if (!fs.existsSync(participantPath)) fs.mkdirSync(participantPath);
  if (!fs.existsSync(readmePath))
    fs.writeFile(readmePath, '', (err) => {
      if (err) console.error(err);
    });
}
