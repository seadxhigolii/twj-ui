export interface FilterResponse<TModel> {
    totalPages: number;
    totalItems: number;
    data: TModel[];
}
