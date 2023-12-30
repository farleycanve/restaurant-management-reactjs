const applyFilters = {
    filters: (data: any[], query: string, filters: any, properties = ['name']): any[] =>
        data.filter((item: any) => {
            let matches = true;

            if (query) {
                let containsQuery = false;

                properties.forEach((property) => {
                    if (item[property].toLowerCase().includes(query.toLowerCase())) {
                        containsQuery = true;
                    }
                });

                if (!containsQuery) {
                    matches = false;
                }
            }

            Object.keys(filters).forEach((key) => {
                const value = filters[key];

                if (value && item[key] !== value) {
                    matches = false;
                }
            });

            return matches;
        }),
    pagination: (data: any[], page: number, limit: number): any[] => (data.length ? data.slice(page * limit, page * limit + limit) : []),
    arrayIds: (ids: [], data: [], property: string) => data.filter(item => ids.find(id => id === item[property]))
};

export default applyFilters;
