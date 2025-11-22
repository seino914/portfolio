"use client";

import Link from "next/link";
import { ProfileItem } from "@/src/app/section/about/ProfileInfo";
import { SkillCard } from "@/src/app/section/about/SkillCard";
import { Card, CardContent } from "@/src/components/ui/card";
import { motion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  Code2,
  Cpu,
  Globe,
  Lightbulb,
  Mail,
  MapPin,
  Rocket,
} from "lucide-react";

export default function AboutContent() {
  return (
    <section
      id="about"
      className="pointer-events-none flex min-h-screen w-full snap-start snap-always items-center justify-start py-20 md:h-screen md:py-0 md:p-20"
    >
      <div className="pointer-events-auto w-full md:w-1/2">
        {/* コンテンツのスタイル上書き用ラッパー */}
        <div className="[&>article]:container-none [&>article]:pt-0">
          <article className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto mb-16 max-w-3xl"
            >
              <Card className="border-purple-500/20 bg-card/50">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10">
                        <Code2 className="h-8 w-8 text-purple-500" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">
                          Tonosaki Seinosuke
                        </h2>
                      </div>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                      <ProfileItem icon={Calendar} label="年齢" value="25歳" />
                      <ProfileItem
                        icon={MapPin}
                        label="所在地"
                        value="千葉県"
                      />
                      <ProfileItem
                        icon={Briefcase}
                        label="職業"
                        value="ソフトウェアエンジニア"
                      />
                      <ProfileItem
                        icon={Mail}
                        label="Email"
                        value={
                          <Link
                            href="#contact"
                            className="transition-colors hover:text-purple-500"
                          >
                            tonosaki914@icloud.com
                          </Link>
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="mb-12 text-center text-3xl font-bold">専門分野</h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                <SkillCard
                  icon={Globe}
                  title="フロントエンド開発"
                  description="React、Next.js、TypeScriptを使用した最新のWeb開発技術でユーザー体験を向上"
                />
                <SkillCard
                  icon={Cpu}
                  title="バックエンド開発"
                  description="Node.js、TypeScript、Python、FastAPIを用いた堅牢なサーバーサイド開発"
                />
                <SkillCard
                  icon={Rocket}
                  title="高性能Web開発"
                  description="最適化された高速なWebアプリケーションの開発とパフォーマンスチューニング"
                />
                <SkillCard
                  icon={Lightbulb}
                  title="ソリューション設計"
                  description="要件定義から設計、実装まで、最適なデザインパターンを用いた開発支援"
                />
              </div>
            </motion.div>
          </article>
        </div>
      </div>
    </section>
  );
}
