"use client";

import { motion } from "framer-motion";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";

const skills = [
  {
    name: "TypeScript",
    years: 3,
    category: "Frontend",
    description: "型設計、ジェネリクス、型によるAI生成コードの検証など",
  },
  {
    name: "JavaScript",
    years: 4,
    category: "Frontend",
    description: "ES6+、非同期処理、DOM操作、Web APIなど",
  },
  {
    name: "React",
    years: 3,
    category: "Frontend",
    description:
      "コンポーネント設計、Hooks、状態管理、パフォーマンス最適化など",
  },
  {
    name: "Next.js",
    years: 3,
    category: "Frontend",
    description:
      "App Router、Server Actions、要件に応じたレンダリング方式（SSR/SSG/ISR/CSR）の選定など",
  },
  {
    name: "Astro",
    years: 1.5,
    category: "Frontend",
    description:
      "SSG（静的サイト生成）、高速なWebサイト開発、パフォーマンス最適化など",
  },
  {
    name: "HTML / CSS",
    years: 4,
    category: "Frontend",
    description:
      "レスポンシブデザイン、アニメーション、Tailwind CSS、Panda CSSなど",
  },
  {
    name: "Hono",
    years: 0.5,
    category: "Backend",
    description: "軽量なWeb API、ミドルウェア、バリデーションなど",
  },
  {
    name: "NestJS",
    years: 1,
    category: "Backend",
    description: "モジュール設計、DI、ORM、バリデーション、テストなど",
  },
  {
    name: "Node.js",
    years: 2.5,
    category: "Backend",
    description: "Express、REST API、非同期処理など",
  },
  {
    name: "Python",
    years: 2,
    category: "Backend",
    description: "データ処理、自動化スクリプト、スクレイピングなど",
  },
  {
    name: "FastAPI",
    years: 1,
    category: "Backend",
    description: "REST API、非同期処理、データベース連携、SQLAlchemyなど",
  },
  {
    name: "SQL",
    years: 2,
    category: "Backend",
    description:
      "PostgreSQL、MySQL、SQLite、Oracle、SQLAlchemy、Prisma、Drizzle ORMなど",
  },
  {
    name: "Claude Code",
    years: 1,
    category: "AI",
    description:
      "タスクの分解とサブエージェントへの委譲、CLAUDE.md・フック・スキルによるハーネス設計、AIによるコードレビューなど",
  },
  {
    name: "Codex",
    years: 1,
    category: "AI",
    description: "AIエージェントによる実装・コードレビュー、ハーネス設計など",
  },
  {
    name: "OpenCode",
    years: 0.5,
    category: "AI",
    description: "複数のLLMを使い分けたAI駆動開発、ハーネス設計など",
  },
  {
    name: "Cursor",
    years: 1,
    category: "AI",
    description:
      "エディタに統合されたAI補完・エージェント、クラウドエージェントによる並行開発など",
  },
  {
    name: "Devin",
    years: 1,
    category: "AI",
    description:
      "自律型AIエージェントへのタスク委譲、クラウド上での並行開発など",
  },
  {
    name: "Git、GitHub",
    years: 4,
    category: "Tools",
    description:
      "PRベースの開発フロー、GitHub Actions、ブランチ保護、Dependabotによる依存管理など",
  },
  {
    name: "VSCode",
    years: 4,
    category: "Tools",
    description:
      "AIエージェントと組み合わせた開発環境、デバッグ、ターミナル統合など",
  },
  {
    name: "Figma",
    years: 1.5,
    category: "Tools",
    description: "UI/UXデザイン、プロトタイプ作成、デザインシステムなど",
  },
];

const categories = {
  Frontend: "フロントエンド技術",
  Backend: "バックエンド技術",
  AI: "AIエージェント",
  Tools: "開発ツール",
};

export default function SkillsContent() {
  // 最大経験年数を取得（ゲージの100%基準）
  const maxYears = Math.max(...skills.map((skill) => skill.years));

  return (
    <main className="container mx-auto px-4 pt-20">
      <section className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-center mb-12">Skills</h1>
          <div className="grid gap-8">
            {Object.entries(categories).map(([category, title]) => (
              <div key={category}>
                <h2 className="text-2xl font-semibold mb-6">{title}</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {skills
                    .filter((skill) => skill.category === category)
                    .map((skill) => {
                      // 経験年数からパーセンテージを計算（最大年数を100%とする）
                      const percentage = (skill.years / maxYears) * 100;
                      // 経験年数の表示用テキスト（整数の場合は小数点なし、それ以外は小数点以下1桁）
                      const yearsText =
                        skill.years % 1 === 0
                          ? `${skill.years}年`
                          : `${skill.years.toFixed(1)}年`;

                      return (
                        <Card
                          key={skill.name}
                          className="p-6 bg-card/50 border-purple-500/20"
                        >
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <h3 className="text-xl font-semibold">
                                {skill.name}
                              </h3>
                              <Badge
                                variant="secondary"
                                className="bg-purple-500/10 text-purple-500"
                              >
                                {yearsText}
                              </Badge>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="h-full bg-purple-500 rounded-full"
                              />
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {skill.description}
                            </p>
                          </div>
                        </Card>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
