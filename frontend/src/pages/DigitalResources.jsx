import { useMemo, useState } from 'react';
import ResourceCard from '../components/resource/ResourceCard';
import Icon from '../components/ui/Icon';
import { SearchBar, Select } from '../components/ui/Form';
import { EmptyState } from '../components/ui/Card';
import { resources, resourceCategories, resourceStats } from '../data/resources';

export default function DigitalResources() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('recent');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = resources.filter((r) => {
      const matchesCategory = category === 'All' || r.category === category;
      const matchesQuery =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.author.toLowerCase().includes(q) ||
        r.tags.join(' ').toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });

    if (sort === 'downloads') list = [...list].sort((a, b) => b.downloads - a.downloads);
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === 'recent') list = [...list].sort((a, b) => b.id.localeCompare(a.id));

    return list;
  }, [query, category, sort]);

  return (
    <div className="public-container public-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <span className="section-eyebrow">Digital library</span>
          <h1 className="page-title mt-8">
            Digital Resources
          </h1>
          <p className="page-sub">
            E-books, journals, research papers, question papers and study materials — search,
            filter and open any item for its details.
          </p>
        </div>
        <span className="chip gold">
          <Icon name="sparkles" size={14} />
          12,480 items in the catalogue
        </span>
      </div>

      {/* Stats */}
      <div className="strip-grid">
        {resourceStats.map((s) => (
          <div className="mini-stat" key={s.label}>
            <b>{s.value}</b>
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search title, author or tag…"
          ariaLabel="Search digital resources"
        />

        <div className="flex gap-8 wrap items-center">
          <Select
            className="select-auto"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort resources"
          >
            <option value="recent">Recently added</option>
            <option value="downloads">Most downloaded</option>
            <option value="rating">Highest rated</option>
          </Select>
        </div>
      </div>

      {/* Category filters */}
      <div className="filters mb-24">
        <button
          type="button"
          className={`filter-chip ${category === 'All' ? 'active' : ''}`}
          onClick={() => setCategory('All')}
        >
          All
        </button>
        {resourceCategories.map((c) => (
          <button
            key={c}
            type="button"
            className={`filter-chip ${category === c ? 'active' : ''}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="results-bar">
        <span>
          Showing <b>{filtered.length}</b> of {resources.length} sample resources
          {category !== 'All' ? ` in ${category}` : ''}
        </span>
        {query || category !== 'All' ? (
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => {
              setQuery('');
              setCategory('All');
            }}
          >
            <Icon name="x" size={15} />
            Clear filters
          </button>
        ) : null}
      </div>

      {filtered.length === 0 ? (
        <div className="card">
          <EmptyState
            icon="search"
            title="No resources match your search"
            text="Try a different keyword, or clear the category filter to see the full catalogue."
          />
        </div>
      ) : (
        <div className="resource-grid">
          {filtered.map((r) => (
            <ResourceCard key={r.id} resource={r} />
          ))}
        </div>
      )}
    </div>
  );
}