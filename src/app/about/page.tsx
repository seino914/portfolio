"use client";

import { Card, CardContent } from "@/src/components/ui/card";
import {
  Code2,
  Cpu,
  Globe,
  Rocket,
  Lightbulb,
  Mail,
  MapPin,
  Briefcase,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ProfileItem } from "@/src/app/about/ProfileInfo";
import { SkillCard } from "@/src/app/about/SkillCard";

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 pt-20">
      <section className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl font-bold mb-8 text-center">About Me</h1>
          <Card className="bg-card/50 border-purple-500/20">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center">
                    <Code2 className="h-8 w-8 text-purple-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Tonosaki Seinosuke</h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <ProfileItem icon={Calendar} label="年齢" value="24歳" />
                  <ProfileItem icon={MapPin} label="所在地" value="千葉県" />
                  <ProfileItem
                    icon={Briefcase}
                    label="職業"
                    value="Webエンジニア"
                  />
                  <ProfileItem
                    icon={Mail}
                    label="Email"
                    value={
                      <Link
                        href="/contact"
                        className="hover:text-purple-500 transition-colors"
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
          <h2 className="text-3xl font-bold text-center mb-12">専門分野</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
      </section>
    </main>
  );
}
