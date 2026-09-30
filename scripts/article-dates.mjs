// The editorial byline shows one original publication date and, after a
// meaningful edit, one latest update date. Historical edits belong in Git.
export function articleDateErrors(html, article) {
    return pageDateErrors(html, article, { requirePublication: true });
}

// Applied to every published page, independently of its route or template.
// Undated pages remain valid; dates that are displayed must be unambiguous.
export function pageDateErrors(html, entity, { requirePublication = false } = {}) {
    const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? html;
    const dates = [...body.matchAll(/\b(Published|Updated)\s*:?\s*<time\b[^>]*datetime="([^"]+)"[^>]*>\s*([^<]+?)\s*<\/time>/g)];
    const errors = [];
    const published = dates.filter(date => date[1] === 'Published');
    const updated = dates.filter(date => date[1] === 'Updated');
    if ((requirePublication ? published.length !== 1 : published.length > 1) ||
        (published.length && entity?.datePublished && published[0][2] !== entity.datePublished))
        errors.push('expected exactly one visible original publication date matching datePublished');
    const hasUpdate = entity?.dateModified > entity?.datePublished;
    if (updated.length > 1 || (requirePublication && updated.length !== (hasUpdate ? 1 : 0)) ||
        (updated.length && entity?.dateModified && updated[0][2] !== entity.dateModified) ||
        (updated.length && entity?.datePublished && entity?.dateModified === entity.datePublished))
        errors.push('expected only the latest visible update date matching dateModified; omit it on first publication');
    if (entity?.dateModified < entity?.datePublished ||
        (published.length && updated.length && updated[0][2] < published[0][2]))
        errors.push('modification predates publication');
    for (const date of dates) {
        const parsed = new Date(date[2] + 'T00:00:00Z');
        if (Number.isNaN(parsed.getTime()) ||
            new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(parsed) !== date[3])
            errors.push('visible date text does not match its datetime: ' + date[2]);
    }
    return errors;
}
