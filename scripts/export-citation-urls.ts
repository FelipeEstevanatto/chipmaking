#!/usr/bin/env bun
/**
 * Prints every URL the citation registry points at, one per line.
 *
 * The scheduled link check feeds this list to lychee instead of crawling the built site: an internal
 * link is already covered by `audit-links.py`, and handing lychee the HTML would make it fetch every
 * `/chipmaking/...` path as though the site were a host. Checking the citations alone is also the
 * point, since a citation that stops resolving is the failure that matters on a page like this.
 *
 * Usage:
 *     bun run scripts/export-citation-urls.ts
 */
import { allCitations, USGS_MCS_YEARS, usgsMcsUrl } from '../docs/.vitepress/theme/citations'

const urls = new Set<string>()
for (const citation of allCitations) if (citation.url) urls.add(citation.url)
for (const year of USGS_MCS_YEARS) urls.add(usgsMcsUrl(year))

console.log([...urls].sort().join('\n'))
