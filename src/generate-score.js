const generateScore = () => {
  const filename = process.argv[2];
  console.log("filename", filename);
  if (!filename) {
    console.error("Please provide a filename as an argument");
    process.exit(1);
  }

  console.log("Test score");
};

export default generateScore;
