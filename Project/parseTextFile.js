export function parseTextFile(fileUrl) {
    // Fetch the file from the server
    console.log(`fetch ${fileUrl}`)
    const response = fetch(fileUrl);
    console.log(response);
    if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
    }
    console.log(response)
    const text = response.text();
    const lines = text.split('\n');
    console.log(lines[0]);
    // Split each line into words and store in a 2D array
    const wordsArray = lines.map(line => line.split(' '));

    // If you need to use the wordsArray further, you can do so here
    return wordsArray;
}