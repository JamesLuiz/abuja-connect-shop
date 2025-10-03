import { useState, useEffect } from 'react';

interface UserBehavior {
  productViews: Record<string, number>;
  categoryPreferences: Record<string, number>;
  searchHistory: string[];
  purchaseHistory: string[];
  wishlistItems: string[];
  timeSpentOnProducts: Record<string, number>;
}

interface PersonalizationData {
  recommendedProducts: any[];
  preferredCategories: string[];
  suggestedSearches: string[];
  personalizedDeals: any[];
}

export const usePersonalization = () => {
  const [behavior, setBehavior] = useState<UserBehavior>({
    productViews: {},
    categoryPreferences: {},
    searchHistory: [],
    purchaseHistory: [],
    wishlistItems: [],
    timeSpentOnProducts: {}
  });

  const [personalizationData, setPersonalizationData] = useState<PersonalizationData>({
    recommendedProducts: [],
    preferredCategories: [],
    suggestedSearches: [],
    personalizedDeals: []
  });

  // Load user behavior from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('userBehavior');
      if (stored) {
        setBehavior(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading user behavior:', error);
    }
  }, []);

  // Save behavior to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('userBehavior', JSON.stringify(behavior));
      generatePersonalizedContent(behavior);
    } catch (error) {
      console.error('Error saving user behavior:', error);
    }
  }, [behavior]);

  const trackProductView = (productId: string, category: string, timeSpent: number = 0) => {
    setBehavior(prev => ({
      ...prev,
      productViews: {
        ...prev.productViews,
        [productId]: (prev.productViews[productId] || 0) + 1
      },
      categoryPreferences: {
        ...prev.categoryPreferences,
        [category]: (prev.categoryPreferences[category] || 0) + 1
      },
      timeSpentOnProducts: {
        ...prev.timeSpentOnProducts,
        [productId]: (prev.timeSpentOnProducts[productId] || 0) + timeSpent
      }
    }));
  };

  const trackSearch = (query: string) => {
    setBehavior(prev => ({
      ...prev,
      searchHistory: [query, ...prev.searchHistory.filter(q => q !== query)].slice(0, 20)
    }));
  };

  const trackPurchase = (productId: string) => {
    setBehavior(prev => ({
      ...prev,
      purchaseHistory: [productId, ...prev.purchaseHistory.filter(id => id !== productId)].slice(0, 50)
    }));
  };

  const trackWishlistAdd = (productId: string) => {
    setBehavior(prev => ({
      ...prev,
      wishlistItems: [...prev.wishlistItems.filter(id => id !== productId), productId]
    }));
  };

  const trackWishlistRemove = (productId: string) => {
    setBehavior(prev => ({
      ...prev,
      wishlistItems: prev.wishlistItems.filter(id => id !== productId)
    }));
  };

  const generatePersonalizedContent = (userBehavior: UserBehavior) => {
    // Generate recommended products based on viewing history
    const topViewedProducts = Object.entries(userBehavior.productViews)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([productId]) => productId);

    // Get preferred categories
    const preferredCategories = Object.entries(userBehavior.categoryPreferences)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([category]) => category);

    // Generate suggested searches based on history
    const suggestedSearches = userBehavior.searchHistory.slice(0, 5);

    // Mock personalized deals (in real app, this would come from backend)
    const personalizedDeals = generateMockDeals(preferredCategories);

    setPersonalizationData({
      recommendedProducts: topViewedProducts,
      preferredCategories,
      suggestedSearches,
      personalizedDeals
    });
  };

  const generateMockDeals = (categories: string[]) => {
    const mockDeals = [
      {
        id: 'deal1',
        title: '20% off Electronics',
        description: 'Special discount on your favorite tech products',
        discount: 20,
        category: 'electronics',
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'deal2',
        title: 'Fashion Flash Sale',
        description: 'Up to 50% off trending fashion items',
        discount: 50,
        category: 'fashion',
        validUntil: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'deal3',
        title: 'Home & Garden Special',
        description: '15% off home improvement items',
        discount: 15,
        category: 'home',
        validUntil: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
      }
    ];

    return mockDeals.filter(deal => 
      categories.some(cat => cat.toLowerCase().includes(deal.category))
    );
  };

  const getRecommendations = (limit: number = 10) => {
    return personalizationData.recommendedProducts.slice(0, limit);
  };

  const getPersonalizedDeals = () => {
    return personalizationData.personalizedDeals.filter(
      deal => deal.validUntil > new Date()
    );
  };

  return {
    behavior,
    personalizationData,
    trackProductView,
    trackSearch,
    trackPurchase,
    trackWishlistAdd,
    trackWishlistRemove,
    getRecommendations,
    getPersonalizedDeals
  };
};