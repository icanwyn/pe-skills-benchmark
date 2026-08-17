import type { BenchmarkTest, Question } from "./tests";

export type RatingLevel = "beginner" | "developing" | "confident";

function norm(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function isCorrect(question: Question, raw: string | undefined) {
  if (!raw) return false;
  if (question.kind === "mc") return raw.toUpperCase() === question.answer;
  const given = norm(raw);
  return question.accept.some((ok) => norm(ok) === given);
}

export function scoreAnswers(test: BenchmarkTest, answers: Record<string, string>) {
  let score = 0;
  const detail = test.questions.map((q) => {
    const given = answers[String(q.id)] ?? "";
    const correct = isCorrect(q, given);
    if (correct) score += 1;
    return { id: q.id, skill: q.skill, correct, given };
  });
  return { score, maxScore: test.questions.length, detail };
}

export function groupFromScore(score: number, maxScore: number) {
  const pct = maxScore === 0 ? 0 : score / maxScore;
  if (score <= 8 || pct <= 0.4) return "A";
  if (score <= 14 || pct <= 0.7) return "B";
  return "C";
}

export function groupLabel(group: string) {
  if (group === "A") return "Beginner";
  if (group === "B") return "Developing";
  return "Strong / peer helper";
}

export function skillBreakdown(
  test: BenchmarkTest,
  answers: Record<string, string>,
) {
  const buckets = new Map<string, { correct: number; total: number }>();
  for (const q of test.questions) {
    const bucket = buckets.get(q.skill) ?? { correct: 0, total: 0 };
    bucket.total += 1;
    if (isCorrect(q, answers[String(q.id)])) bucket.correct += 1;
    buckets.set(q.skill, bucket);
  }
  return [...buckets.entries()].map(([skill, v]) => ({ skill, ...v }));
}
