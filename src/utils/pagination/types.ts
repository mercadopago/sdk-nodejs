/** Pagination metadata returned by MercadoPago search endpoints. */
export interface Paging {
    total?: number;
    limit?: number;
    offset?: number;
}

/** Minimal interface for a paginated search result. */
export interface PageResult<T> {
    paging?: Paging;
    results?: T[];
    /** Order-style pagination (uses page/page_size instead of offset/limit). */
    elements?: T[];
    page?: number;
    page_size?: number;
    total?: number;
}
