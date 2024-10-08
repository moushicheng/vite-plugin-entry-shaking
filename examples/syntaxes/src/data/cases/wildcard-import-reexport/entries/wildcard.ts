import * as NamedExports from '../../../modules/named-exports';
export { NamedExports };

/** Below content should not be removed from the transformed target. */
import '../../../modules/sideffect-module';
import { ConsumedExport } from '../../../modules/consumed-export';
export const ExportDefinedFromTarget = 'ExportDefinedFromTarget';
const CodeDefinedFromTarget = `CodeDefinedFromTarget: ${ConsumedExport}`;
console.info(
  'This is being printed from target, which means target was requested',
  CodeDefinedFromTarget,
);
