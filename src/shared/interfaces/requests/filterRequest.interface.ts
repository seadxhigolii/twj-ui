export interface FilterRequest {
    search: string,
    pageSize: number,
    page: number,
    sortBy?: string; 
    sortDirection?: 'asc' | 'desc'; 
    }