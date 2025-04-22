const stopWords: Set<string> = new Set([
    "i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your",
    "yours", "yourself", "yourselves", "he", "him", "his", "himself", "she",
    "her", "hers", "herself", "it", "its", "itself", "they", "them", "their",
    "theirs", "themselves", "what", "which", "who", "whom", "this", "that",
    "these", "those", "am", "is", "are", "was", "were", "be", "been", "being",
    "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an",
    "the", "and", "but", "if", "or", "because", "as", "until", "while", "of",
    "at", "by", "for", "with", "about", "against", "between", "into", "through",
    "during", "before", "after", "above", "below", "to", "from", "up", "down",
    "in", "out", "on", "off", "over", "under", "again", "further", "then",
    "once", "here", "there", "when", "where", "why", "how", "all", "any",
    "both", "each", "few", "more", "most", "other", "some", "such", "no",
    "nor", "not", "only", "own", "same", "so", "than", "too", "very", "can",
    "will", "just", "don", "should", "now"
  ]);
  
  /**
   * Generate SEO-friendly meta keywords from a text input
   * 
   * @param text - The content to extract keywords from
   * @param maxKeywords - Maximum number of keywords to return (default: 15)
   * @returns Array of keywords ranked by relevance
   */
  export function generateMetaKeywords(text: string, maxKeywords: number = 15): string[] {
    if (!text || typeof text !== "string") return [];
  
    const wordFrequency: Map<string, number> = new Map();
  
    const words: string[] = text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")   // remove punctuation
      .split(/\s+/)              // split by whitespace
      .filter(word => word.length > 2 && !stopWords.has(word));
  
    for (const word of words) {
      wordFrequency.set(word, (wordFrequency.get(word) || 0) + 1);
    }
  
    return [...wordFrequency.entries()]
      .sort((a, b) => b[1] - a[1])     // sort by frequency
      .slice(0, maxKeywords)
      .map(([word]) => word);         // return only the word
  }
  