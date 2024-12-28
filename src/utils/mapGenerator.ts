export function generateRandomMap(width: number, height: number, wallDensity: number): boolean[][] {
  const map: boolean[][] = Array(height).fill(null).map(() => 
    Array(width).fill(false)
  );
  
  // Add walls around the perimeter
  for (let x = 0; x < width; x++) {
    map[0][x] = true;
    map[height - 1][x] = true;
  }
  for (let y = 0; y < height; y++) {
    map[y][0] = true;
    map[y][width - 1] = true;
  }
  
  // Randomly place walls
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      if (Math.random() < wallDensity) {
        map[y][x] = true;
      }
    }
  }
  
  return map;
}

export function findValidStartPosition(map: boolean[][]): Point {
  const height = map.length;
  const width = map[0].length;
  
  while (true) {
    const x = Math.floor(Math.random() * (width - 2)) + 1;
    const y = Math.floor(Math.random() * (height - 2)) + 1;
    
    if (!map[y][x]) {
      return { x, y };
    }
  }
}