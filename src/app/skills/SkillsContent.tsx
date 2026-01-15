"use client";

import { Card } from "@/src/components/ui/card";
import { motion } from "framer-motion";
import { Badge } from "@/src/components/ui/badge";

const skills = [
  {
    name: "TypeScript",
    years: 2.5,
    category: "Frontend",
    description: "型安全性、インターフェース、ジェネリクスなど",
  },
  {
    name: "JavaScript",
    years: 3.5,
    category: "Frontend",
    description: "ES6+、非同期処理、DOM操作、WebAPIなど",
  },
  {
    name: "React",
    years: 2.5,
    category: "Frontend",
    description: "Hooks、状態管理、カスタムフック、パフォーマンス最適化など",
  },
  {
    name: "Next.js",
    years: 2,
    category: "Frontend",
    description: "SSR/SSG/ISR/CSR、App Router、APIルート、Server Actionsなど",
  },
  {
    name: "Astro",
    years: 0.5,
    category: "Frontend",
    description:
      "SSG（静的サイト生成）、高速Webサイト開発、パフォーマンス最適化など",
  },
  {
    name: "HTML / CSS",
    years: 3.5,
    category: "Frontend",
    description:
      "モダンなレスポンシブデザイン、アニメーション、Tailwind CSS、Panda CSSなど",
  },
  {
    name: "NestJS",
    years: 0.5,
    category: "Backend",
    description: "DI、ORM、バリデーション、テストなど",
  },
  {
    name: "Node.js",
    years: 1.5,
    category: "Backend",
    description: "Express、REST API、非同期処理など",
  },
  {
    name: "Python",
    years: 1.5,
    category: "Backend",
    description: "データ処理、スクリプト自動化、スクレイピングなど",
  },
  {
    name: "FastAPI",
    years: 0.5,
    category: "Backend",
    description: "REST API、非同期処理、データベース連携、SQLAlchemyなど",
  },
  {
    name: "SQL",
    years: 1.5,
    category: "Backend",
    description:
      "PostgreSQL、MySQL、SQLite、Oracle、SQLAlchemy、Prisma、Drizzle ORMなど",
  },
  {
    name: "Git、GitHub",
    years: 3,
    category: "Tools",
    description: "CI/CD、バージョン管理、ブランチ戦略など",
  },
  {
    name: "VSCode（Cursor）",
    years: 3.5,
    category: "Tools",
    description: "コード補完、デバッグ、Git操作、ターミナル統合など",
  },
  {
    name: "Claude Code",
    years: 0.5,
    category: "Tools",
    description: "AI駆動開発、コンテキスト設計、MCPサーバーなど",
  },
  {
    name: "Figma",
    years: 1,
    category: "Tools",
    description: "UI/UXデザイン、プロトタイプ作成、デザインシステムなど",
  },
];

const categories = {
  Frontend: "フロントエンド技術",
  Backend: "バックエンド技術",
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
