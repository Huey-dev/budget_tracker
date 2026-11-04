export interface SearchItem {
    id: string | number;
    title: string;
    category?: string;
  }
  
  /**
   * Pure function to filter items based on a case-insensitive query string matching title or category.
   */
  export const filterItems = <T extends SearchItem>(items: T[], query: string): T[] => {
    const sanitizedQuery = query.trim().toLowerCase();
    
    if (!sanitizedQuery) return items;
  
    return items.filter((item) => {
      const matchesTitle = item.title.toLowerCase().includes(sanitizedQuery);
      const matchesCategory = item.category?.toLowerCase().includes(sanitizedQuery);
      return matchesTitle || matchesCategory;
    });
  };
  