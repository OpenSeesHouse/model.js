export async function parseTextFile(fileUrl) {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }
    const text = await response.text();
    const lines = text.split("\n");
    const wordsArray = lines.map((line) => line.split(" "));
    return wordsArray;
  }
  