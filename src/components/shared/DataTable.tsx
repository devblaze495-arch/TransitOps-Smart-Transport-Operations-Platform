import { useMemo, useState } from 'react';
import { ChevronsUpDown, Search } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface DataTableColumn<T extends object> {
  key: string;
  header: string;
  accessor: (item: T) => React.ReactNode;
  sortable?: boolean;
  sortValue?: (item: T) => string | number;
  width?: string;
}

interface DataTableProps<T extends object> {
  data: T[];
  columns: DataTableColumn<T>[];
  onRowClick?: (item: T) => void;
  initialPageSize?: number;
  className?: string;
}

const pageSizeOptions = [10, 25, 50];

export function DataTable<T extends object>({
  data,
  columns,
  onRowClick,
  initialPageSize = 10,
  className,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [page, setPage] = useState(1);

  const filteredData = useMemo(() => {
    if (!search.trim()) return data;
    const lowerSearch = search.toLowerCase();
    return data.filter(item =>
      columns.some(column => {
        const content = column.accessor(item);
        const value = typeof content === 'string' || typeof content === 'number'
          ? String(content)
          : undefined;
        return value?.toLowerCase().includes(lowerSearch);
      })
    );
  }, [data, columns, search]);

  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;
    const column = columns.find(col => col.key === sortColumn);
    if (!column) return filteredData;
    const sortValue = column.sortValue ?? ((item: T) => {
      const content = column.accessor(item);
      return typeof content === 'string' || typeof content === 'number' ? content : '';
    });

    return [...filteredData].sort((a, b) => {
      const aValue = sortValue(a);
      const bValue = sortValue(b);
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      const aText = String(aValue).toLowerCase();
      const bText = String(bValue).toLowerCase();
      return sortDirection === 'asc' ? aText.localeCompare(bText) : bText.localeCompare(aText);
    });
  }, [filteredData, sortColumn, sortDirection, columns]);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const pageStart = (page - 1) * pageSize;
  const pageData = sortedData.slice(pageStart, pageStart + pageSize);

  const handleSort = (key: string) => {
    if (sortColumn === key) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
      return;
    }
    setSortColumn(key);
    setSortDirection('asc');
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setPage(1);
  };

  return (
    <div className={cn('space-y-4 overflow-hidden rounded-3xl border border-border bg-surface p-4', className)}>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-bg px-3 py-2">
          <Search className="h-4 w-4 text-text-secondary" />
          <input
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder="Search"
            className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-secondary focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3 text-sm text-text-secondary">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={event => handlePageSizeChange(Number(event.target.value))}
            className="rounded-lg border border-border bg-bg px-3 py-2 text-text-primary focus:outline-none"
          >
            {pageSizeOptions.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border text-left text-sm">
          <thead className="bg-bg-elevated">
            <tr>
              {columns.map(column => (
                <th
                  key={column.key}
                  scope="col"
                  className={cn(
                    'px-4 py-3 font-semibold text-text-secondary',
                    column.width ?? 'w-auto'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => column.sortable && handleSort(column.key)}
                    className={cn(
                      'inline-flex items-center gap-2',
                      column.sortable ? 'cursor-pointer hover:text-text-primary' : 'cursor-default'
                    )}
                  >
                    <span>{column.header}</span>
                    {column.sortable && <ChevronsUpDown className="h-4 w-4" />}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {pageData.map((item, index) => (
              <tr
                key={index}
                className={cn(
                  'transition hover:bg-surface-hover',
                  onRowClick ? 'cursor-pointer' : ''
                )}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map(column => (
                  <td key={column.key} className="whitespace-nowrap px-4 py-4 text-text-primary">
                    {column.accessor(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-sm text-text-secondary">
        <div>
          Showing <span className="font-semibold text-text-primary">{pageData.length}</span> of <span className="font-semibold text-text-primary">{filteredData.length}</span> entries
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handlePageChange(Math.max(1, page - 1))}
            disabled={page === 1}
            className="rounded-lg border border-border bg-bg px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page <span className="font-semibold text-text-primary">{page}</span> / <span className="font-semibold text-text-primary">{totalPages}</span>
          </span>
          <button
            type="button"
            onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="rounded-lg border border-border bg-bg px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
