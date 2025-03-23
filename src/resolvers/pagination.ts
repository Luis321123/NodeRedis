export const getPaginationParams = (query: any) => {
    let page = parseInt(query.page as string);
    let limit = parseInt(query.limit as string);

    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1 || limit > 20) limit = 10; // Max 20 items per page to optimize performance

    return { page, limit };
};