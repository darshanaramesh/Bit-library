import { useMemo, useState } from 'react';
import Icon from '../../components/ui/Icon';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import PageHeader from '../../components/ui/PageHeader';
import DataTable from '../../components/ui/DataTable';
import { Card, CardHeader } from '../../components/ui/Card';
import { SearchBar, Field, Input, Select, Textarea } from '../../components/ui/Form';
import { resources, resourceCategories, categoryTheme } from '../../data/resources';

export default function ResourceManagement() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [modal, setModal] = useState(null); // 'add' | 'view' | null
  const [active, setActive] = useState(null);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resources.filter((r) => {
      const matchCat = category === 'All' || r.category === category;
      const matchQuery = !q || r.title.toLowerCase().includes(q) || r.author.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [query, category]);

  return (
    <>
      <PageHeader
        title="Resource Management"
        sub="Catalogue entries for e-books, journals, research papers, question papers and study materials."
        actions={
          <>
            <Button variant="outline" icon="upload">
              Bulk upload
            </Button>
            <Button variant="primary" icon="plus" onClick={() => setModal('add')}>
              Add resource
            </Button>
          </>
        }
      />

      <div className="strip-grid">
        {[
          { b: '12,480', s: 'Catalogue items' },
          { b: '37', s: 'Added this month' },
          { b: '5', s: 'Processing' },
          { b: '148', s: 'Restricted items' },
        ].map((x) => (
          <div className="mini-stat" key={x.s}>
            <b>{x.b}</b>
            <span>{x.s}</span>
          </div>
        ))}
      </div>

      <div className="toolbar">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search title or author…"
          ariaLabel="Search resources"
        />
        <Select
          className="select-auto"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter by category"
        >
          <option value="All">All categories</option>
          {resourceCategories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </Select>
      </div>

      <DataTable
        columns={[
          {
            key: 'title',
            label: 'Resource',
            wrap: true,
            render: (r) => (
              <div className="cell-user">
                <span className={`icon-tile ${categoryTheme[r.category]?.tone || ''}`}>
                  <Icon name={categoryTheme[r.category]?.icon || 'file'} size={17} />
                </span>
                <span>
                  <b>{r.title}</b>
                  <span>
                    {r.id} · {r.author}
                  </span>
                </span>
              </div>
            ),
          },
          { key: 'category', label: 'Category', render: (r) => <Badge tone="primary" plain>{r.category}</Badge> },
          { key: 'year', label: 'Year', num: true },
          { key: 'format', label: 'Format', render: (r) => `${r.format} · ${r.size}` },
          {
            key: 'downloads',
            label: 'Downloads',
            num: true,
            render: (r) => r.downloads.toLocaleString('en-IN'),
          },
          { key: 'access', label: 'Access', render: (r) => <Badge tone={r.access === 'Open Access' ? 'success' : 'warning'}>{r.access}</Badge> },
          { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
          {
            key: 'actions',
            label: '',
            render: (r) => (
              <span className="table-actions">
                <button
                  type="button"
                  className="icon-btn"
                  aria-label={`View ${r.title}`}
                  onClick={() => {
                    setActive(r);
                    setModal('view');
                  }}
                >
                  <Icon name="eye" size={16} />
                </button>
                <button type="button" className="icon-btn" aria-label={`Edit ${r.title}`}>
                  <Icon name="edit" size={16} />
                </button>
                <button type="button" className="icon-btn" aria-label={`Archive ${r.title}`}>
                  <Icon name="trash" size={16} />
                </button>
              </span>
            ),
          },
        ]}
        rows={rows}
        emptyTitle="No resources match"
        emptyText="Adjust the search or category filter to see more catalogue entries."
      />

      <p className="small dim mt-16">
        Showing {rows.length} of {resources.length} sample records · uploads are simulated until
        object storage is connected.
      </p>

      {/* Add resource modal */}
      <Modal
        open={modal === 'add'}
        title="Add catalogue resource"
        sub="Metadata for a new digital item"
        wide
        onClose={() => setModal(null)}
        footer={
          <>
            <Button variant="outline" onClick={() => setModal(null)}>
              Cancel
            </Button>
            <Button variant="primary" icon="check" onClick={() => setModal(null)}>
              Save resource (demo)
            </Button>
          </>
        }
      >
        <div className="form-grid">
          <div className="span-2">
            <Field label="Title" htmlFor="nr-title">
              <Input id="nr-title" placeholder="Resource title" />
            </Field>
          </div>
          <Field label="Category" htmlFor="nr-cat">
            <Select id="nr-cat" defaultValue="E-Books">
              {resourceCategories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Select>
          </Field>
          <Field label="Access level" htmlFor="nr-access">
            <Select id="nr-access" defaultValue="Open Access">
              <option>Open Access</option>
              <option>Restricted</option>
            </Select>
          </Field>
          <Field label="Author / Creator" htmlFor="nr-author">
            <Input id="nr-author" placeholder="Author or organisation" />
          </Field>
          <Field label="Publisher" htmlFor="nr-pub">
            <Input id="nr-pub" placeholder="Publisher / source" />
          </Field>
          <Field label="Year" htmlFor="nr-year">
            <Input id="nr-year" type="number" placeholder="2026" />
          </Field>
          <Field label="Format" htmlFor="nr-format">
            <Select id="nr-format" defaultValue="PDF">
              <option>PDF</option>
              <option>ePub</option>
              <option>Audio</option>
            </Select>
          </Field>
          <div className="span-2">
            <Field label="Summary" htmlFor="nr-summary">
              <Textarea id="nr-summary" placeholder="Short description shown on the resource card…" />
            </Field>
          </div>
        </div>

        <Field label="File" htmlFor="nr-file" hint="UI placeholder — real uploads are disabled in this build">
          <div className="dropzone">
            <Icon name="upload" size={26} />
            <p className="mt-8">Drag a file here, or click to browse</p>
            <button type="button" className="btn btn-outline btn-sm" disabled>
              Choose file
            </button>
          </div>
        </Field>
      </Modal>

      {/* View resource modal */}
      <Modal
        open={modal === 'view'}
        title={active ? active.title : ''}
        sub={active ? `${active.id} · ${active.category}` : ''}
        onClose={() => setModal(null)}
        footer={
          <>
            <Button variant="outline" onClick={() => setModal(null)}>
              Close
            </Button>
            <Button variant="primary" icon="edit">
              Edit metadata
            </Button>
          </>
        }
      >
        {active ? (
          <>
            <div className="kv-list">
              <div className="kv-row">
                <span className="k">Author</span>
                <span className="v">{active.author}</span>
              </div>
              <div className="kv-row">
                <span className="k">Publisher</span>
                <span className="v">{active.publisher}</span>
              </div>
              <div className="kv-row">
                <span className="k">File</span>
                <span className="v">
                  {active.format} · {active.size}
                </span>
              </div>
              <div className="kv-row">
                <span className="k">Downloads</span>
                <span className="v">{active.downloads.toLocaleString('en-IN')}</span>
              </div>
              <div className="kv-row">
                <span className="k">Access</span>
                <span className="v">{active.access}</span>
              </div>
            </div>
            <div className="mt-16">
              <Badge tone={active.access === 'Open Access' ? 'success' : 'warning'}>
                {active.access}
              </Badge>
            </div>
          </>
        ) : null}
      </Modal>

      <Card className="mt-24">
        <CardHeader title="Catalogue maintenance" sub="Housekeeping actions for the resource library" />
        <div className="flex gap-8 wrap">
          <Button variant="outline" size="sm" icon="refresh">
            Re-run metadata extraction
          </Button>
          <Button variant="outline" size="sm" icon="download">
            Export catalogue
          </Button>
          <Button variant="outline" size="sm" icon="shield">
            Review restricted items
          </Button>
        </div>
      </Card>
    </>
  );
}