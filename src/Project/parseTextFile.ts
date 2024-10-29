export async function parseTextFile(fileUrl:string):Promise<Array<Array<string>>> {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }
    const text = await response.text();
    const delimiters = /[\n\r]/;
    const lines = text.split(delimiters);
    
    const wordsArray = lines.map((line) => line.split(" "));
    return wordsArray;
  }
  