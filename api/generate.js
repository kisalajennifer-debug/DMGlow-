// api/generate.js

function randomize(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function expand(arr) {
  let result = [];
  arr.forEach(item => {
    result.push(item);
    result.push(item + " Intentionally.");
    result.push(item + " With precision.");
  });
  return result;
}

const clusters = {
  attraction: {
    keywords: /love|miss|sweetheart|baby|chemistry|desire/i,
    lines: expand([
      "There’s warmth in that energy.",
      "Attraction grows where calm lives.",
      "Connection deepens when confidence stays steady."
    ])
  },

  authority: {
    keywords: /respect|business|standard|serious|boundary/i,
    lines: expand([
      "Position remains composed.",
      "Standards define the frame.",
      "Structure creates influence."
    ])
  },

  emotional: {
    keywords: /sad|hurt|confused|tired|down/i,
    lines: expand([
      "Emotion deserves acknowledgment.",
      "Strength survives pressure.",
      "Clarity comes after pause."
    ])
  }
};

function detectCluster(text) {
  for (let key in clusters) {
    if (clusters[key].keywords.test(text)) {
      return clusters[key];
    }
  }
  return clusters.attraction;
}

module.exports = function (req, res) {

  const { message, intensity } = req.body;

  if (!message) {
    return res.status(400).json({ error: "No message provided" });
  }

  const cluster = detectCluster(message);

  let replies = [];

  for (let i = 0; i < 5; i++) {

    let base = randomize(cluster.lines);

    let reply = `${base}

"${message}"

— Refined at intensity level ${intensity}`;

    replies.push(reply);
  }

  res.json({ replies });

};
