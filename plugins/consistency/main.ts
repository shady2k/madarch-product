/**
 * The consistency plugin (decision 0035, item 32; madarch-stm0.7.1): the graph's consistency is a plugin's work, run
 * once after every other plugin turn of a fill and on its own. It reads only through the host — one bounded page of the
 * writer's unresolved references and removed ends, and of the opinions whose contract requires evidence and states none —
 * and answers one finding per problem. The findings are opinions like any other producer's, of the product's findings
 * kind (`findings: true` in its manifest), which the Problems page reads.
 *
 * Four rules, one shape:
 *
 * - `dangling-reference`: an edge end names a key no vertex holds.
 * - `missing-reference`: a vertex's key field names a key no vertex holds.
 * - `removed-end`: an edge stands and one of the vertices it names is removed.
 * - `unevidenced-opinion`: an open opinion of a field whose contract requires evidence rests on none.
 *
 * A finding's key carries every value that tells it apart — the rule, the entity, the field, the opinion id, the edge's
 * discriminator and its ends — so two findings of one entity are two keys, never one key written twice.
 */
import { definePlugin, type ExtractContext, type GraphPage, type GraphPageQuery, type GraphRemovedEnd, type GraphUnevidencedOpinion, type GraphUnresolvedReference, type Unit, type UnitResult, type VertexResult } from 'madarch-plugin-sdk';

/** The kind the product's manifest declares as its findings kind. */
const FINDING_KIND = 'consistency.finding';

interface Finding {
  readonly rule: string;
  readonly subject: string;
  readonly target: string;
  readonly cause: string;
  readonly severity: 'blocker' | 'critical' | 'major' | 'minor' | 'info';
}

/** Every page of one read, walked by the cursor the host answers. */
async function every<T>(read: (query?: GraphPageQuery) => Promise<GraphPage<T>>): Promise<T[]> {
  const rows: T[] = [];
  let after: string | undefined;
  for (;;) {
    const page = await read(after === undefined ? { limit: 200 } : { after, limit: 200 });
    rows.push(...page.rows);
    if (page.next === undefined) return rows;
    after = page.next;
  }
}

/** Every value of a finding that tells it from another, joined into its stable key. */
const idOf = (...parts: readonly (string | undefined)[]): string => parts.map((one) => one ?? '').join('|');

function findingOf(finding: Finding): VertexResult {
  return { kind: FINDING_KIND, key: { id: idOf(finding.rule, finding.subject, finding.target, finding.cause) }, values: { ...finding } };
}

function unresolvedFindings(references: readonly GraphUnresolvedReference[]): Finding[] {
  return references.map((reference) => {
    if (reference.edge !== undefined) {
      return {
        rule: 'dangling-reference',
        subject: `${reference.edge.kind}:${reference.referrer?.kind ?? 'edge'}:${reference.referrer?.label ?? '?'}`,
        target: `${reference.target.kind}:${reference.target.label}:${reference.id}`,
        cause: `the ${reference.field} end of ${reference.edge.kind} names ${reference.target.kind} ${reference.target.label}, and no vertex holds that key`,
        severity: 'major' as const,
      };
    }
    return {
      rule: 'missing-reference',
      subject: `${reference.referrer?.kind ?? 'vertex'}:${reference.referrer?.label ?? '?'}`,
      target: `${reference.field}:${reference.target.kind}:${reference.target.label}:${reference.producer}:${reference.id}`,
      cause: `its key field "${reference.field}" names ${reference.target.kind} ${reference.target.label}, and no vertex holds that key`,
      severity: 'major' as const,
    };
  });
}

function removedEndFindings(ends: readonly GraphRemovedEnd[]): Finding[] {
  return ends.map((end) => ({
    rule: 'removed-end',
    subject: `${end.edge.kind}:${end.from.kind}:${end.from.label}->${end.to.kind}:${end.to.label}:${end.edge.discriminator ?? ''}`,
    target: end.removed.map((side) => (side === 'from' ? `${end.from.kind}:${end.from.label}` : `${end.to.kind}:${end.to.label}`)).join(', '),
    cause: `the ${end.removed.join(' and ')} end of ${end.edge.kind} is removed`,
    severity: 'major' as const,
  }));
}

function unevidencedFindings(opinions: readonly GraphUnevidencedOpinion[]): Finding[] {
  return opinions.map((opinion) => ({
    rule: 'unevidenced-opinion',
    subject: `${opinion.entity.kind}:${opinion.entity.label}`,
    target: `${opinion.producer}:${opinion.field}:${opinion.opinion}`,
    cause: `the opinion on "${opinion.field}" states no evidence, and its contract requires it`,
    severity: 'minor' as const,
  }));
}

async function extract(_unit: Unit, context: ExtractContext): Promise<UnitResult> {
  const [references, ends, opinions] = await Promise.all([
    every((query) => context.graph.unresolved(query)),
    every((query) => context.graph.removedEnds(query)),
    every((query) => context.graph.unevidenced(query)),
  ]);
  return { vertices: [...unresolvedFindings(references), ...removedEndFindings(ends), ...unevidencedFindings(opinions)].map(findingOf), end: { state: 'complete' } };
}

await definePlugin({
  name: 'consistency',
  version: '1.0.0',
  reads: 'whole-graph',
  graph: true,
  graphReads: ['unresolved', 'removedEnds', 'unevidenced'],
  contract: {
    vertices: [{
      kind: FINDING_KIND,
      key: ['id'],
      fields: [
        { name: 'id', type: 'text', meaning: "The finding's stable identity: its rule and every value that tells it apart.", example: 'removed-end|contains|src|a.ts|to', required: true },
        { name: 'rule', type: 'text', meaning: 'The rule that found it: dangling-reference, missing-reference, removed-end or unevidenced-opinion.', example: 'removed-end', required: true },
        { name: 'subject', type: 'text', meaning: 'The entity the finding is about, as a person reads it.', example: 'code.contains src → src/a.ts', required: true },
        { name: 'target', type: 'text', meaning: 'What the finding names beside its subject: the missing key, the removed end or the producer.', example: 'src/a.ts', required: false },
        { name: 'cause', type: 'text', meaning: 'Why the finding stands, in plain words.', example: 'the to end of code.contains is removed', required: true },
        { name: 'severity', type: 'text', meaning: 'How serious the finding is: blocker, critical, major, minor or info.', example: 'major', required: false },
      ],
    }],
    edges: [],
  },
  extract,
});
