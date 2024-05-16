export class FilteredResponseDTO<T> {
    data: T[];
    totalItems: number;
    totalPages: number;
}