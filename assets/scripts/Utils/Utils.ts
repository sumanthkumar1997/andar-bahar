export function GenerateLaunchId() {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
      
        for (let i = 0; i < 10; i++) {
          const randomIndex = Math.floor(Math.random() * chars.length);
          result += chars.charAt(randomIndex);
        }
      
        return result;
}

export function shuffle(array: any) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index between 0 and i
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}