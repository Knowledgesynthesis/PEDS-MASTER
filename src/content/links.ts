/** Link helpers: DOI where deterministic, otherwise a PubMed search that always resolves. */
export const doi = (id: string) => `https://doi.org/${id}`;
export const pm = (query: string) => `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(query)}`;
