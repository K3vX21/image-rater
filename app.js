const imageElement = document.getElementById("image");
const scoreButton = document.getElementById("score-button");

const csvURL = 'https://raw.githubusercontent.com/K3vX21/horizon/main/data/data.csv';
const csvPath = './local-scores.csv';

let data;

async function init() {
  data = await getCSV(csvPath);
  console.log(data);
}

async function getCSV(path) {
  try {
    const response = await fetch(path);
    const data = await response.text();
    // Parse the CSV data
    const rows = data.split('\n');
    const headers = rows[0].split(',');
    const results = rows.slice(1).map(row => {
      const values = row.split(',');
      // Skip over blank or incomplete rows
      if (values.length !== headers.length) {
        return null;
      }
      return headers.reduce((obj, header, i) => {
        obj[header.trim()] = values[i].trim();
        return obj;
      }, {});
    }).filter(row => row !== null);
    console.log(results);
    return results;
  } catch (error) {
    console.error('Error fetching CSV file:', error);
  }
}

init();

let imageScores = [];
let i = 0;

function updateScores() {
  const imageScore = parseFloat(document.getElementById("image-score").value);
  if (data) {
    imageScores[i] = imageScore;
    imageElement.src = data[i]["image_url"];
    i++;
  }
  document.getElementById("image-score").value = "";
}

scoreButton.addEventListener("click", updateScores);
