import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

/**
 * Baseline intentionally empty: the schema has no domain tables yet.
 * Future changes must be added as new versioned migrations.
 */
export async function up(_pgm: MigrationBuilder): Promise<void> {}

/**
 * Nothing to reverse for the baseline.
 */
export async function down(_pgm: MigrationBuilder): Promise<void> {}
