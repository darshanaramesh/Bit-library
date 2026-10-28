# Database

MySQL is the target database. **No tables have been created yet.**

## Files

| File | Purpose |
| --- | --- |
| `database/schema.sql` | Table definitions (placeholder) |
| `database/seed.sql` | Sample/reference data (placeholder) |

## Planned conventions

- Charset: `utf8mb4` / `utf8mb4_unicode_ci`
- Table and column names in `snake_case`
- `id` primary key, `created_at` / `updated_at` timestamps on every table
- Foreign keys named `fk_<table>_<referenced_table>`
- Access control modeled explicitly (access control matrix: resources × roles)

## Planned subject areas (not implemented)

1. Digital resources and their categories
2. Access control matrix (resource permissions per role/user)
3. Seats, seat zones, and reservations
4. Users, roles, and RBAC
5. Audit/activity logging

## Applying the files (future)

```bash
mysql -u <user> -p -e "CREATE DATABASE bit_central_library CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -u <user> -p bit_central_library < database/schema.sql
mysql -u <user> -p bit_central_library < database/seed.sql
```

The backend reads connection settings from `.env` (`DB_HOST`, `DB_PORT`,
`DB_NAME`, `DB_USER`, `DB_PASSWORD`); no database driver is installed yet.
