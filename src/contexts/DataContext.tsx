import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ScrapedData } from '@/types';

interface DataContextType {
  scrapedData: ScrapedData | null;
  setScrapedData: (data: ScrapedData | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [scrapedData, setScrapedData] = useState<ScrapedData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Debug logging
  const setScrapedDataWithLog = (data: ScrapedData | null) => {
    console.log("DataContext: setScrapedData called with:", data);
    setScrapedData(data);
  };

  const setIsLoadingWithLog = (loading: boolean) => {
    console.log("DataContext: setIsLoading called with:", loading);
    setIsLoading(loading);
  };

  const value = {
    scrapedData,
    setScrapedData: setScrapedDataWithLog,
    isLoading,
    setIsLoading: setIsLoadingWithLog,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
