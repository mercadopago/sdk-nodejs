/** Pagination metadata returned by MercadoPago search endpoints. */
export interface Paging {
    total?: number;
    limit?: number;
    offset?: number;
}

/** Minimal interface for a paginated search result. */
export interface PageResult<T> {
    paging?: Paging;
    /** Pattern A — payments, customers, preapprovals, etc. */
    results?: T[];
    /** Pattern B — some Order patterns */
    elements?: T[];
    /** Pattern C — Orders v2 API (paging.total is a string in this API) */
    data?: T[];
    page?: number;
    page_size?: number;
    total?: number;
}
