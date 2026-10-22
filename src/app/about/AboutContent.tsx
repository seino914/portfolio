"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaBrain,
  FaBriefcase,
  FaCalendar,
  FaChartLine,
  FaCode,
  FaEnvelope,
  FaGlobe,
  FaLightbulb,
  FaMapMarkerAlt,
  FaMicrochip,
  FaRobot,
} from "react-icons/fa";
import { ProfileItem } from "@/src/app/about/ProfileInfo";
import { SkillCard } from "@/src/app/about/SkillCard";
import { Card, CardContent } from "@/src/components/ui/card";

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
                  <div className="w-16 h-16 shrink-0 bg-purple-500/10 rounded-full flex items-center justify-center">
                    <FaCode className="h-8 w-8 text-purple-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Tonosaki Seinosuke</h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <ProfileItem icon={FaCalendar} label="年齢" value="26歳" />
                  <ProfileItem
                    icon={FaMapMarkerAlt}
                    label="所在地"
                    value="千葉県"
                  />
                  <ProfileItem
                    icon={FaBriefcase}
                    label="職業"
                    value="ソフトウェアエンジニア"
                  />
                  <ProfileItem
                    icon={FaEnvelope}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SkillCard
              icon={FaGlobe}
              title="フロントエンド開発"
              description="React・Next.js・TypeScriptで、使いやすさと表示速度を両立したUIを設計・実装。パフォーマンスを計測しながら改善します"
            />
            <SkillCard
              icon={FaMicrochip}
              title="バックエンド開発"
              description="Node.js（NestJS・Hono）やPython（FastAPI）で、変更に強いAPIとデータベースを設計・実装。テストとセキュリティ対策まで含めて開発します"
            />
            <SkillCard
              icon={FaRobot}
              title="AI駆動開発"
              description="Claude CodeなどのAIエージェントを開発に取り入れ、設計・レビュー・テストでAIの出力を品質に変えることで、速さと確かさを両立します"
            />
            <SkillCard
              icon={FaLightbulb}
              title="要件定義・技術選定"
              description="課題の整理から要件定義、技術選定、設計まで。作る前に「何を作るべきか」を一緒に言語化します"
            />
            <SkillCard
              icon={FaChartLine}
              title="DX支援"
              description="業務フローの整理と課題の洗い出しから、システム開発・ツール導入・自動化、現場への定着まで伴走し、デジタル技術で業務を改善します"
            />
            <SkillCard
              icon={FaBrain}
              title="AX（AIX）支援"
              description="DXの延長として、AIを前提に業務を見直します。AIを活かせる業務の洗い出しから、小さな検証（PoC）、導入、定着まで支援します"
            />
          </div>
        </motion.div>
      </section>
    </main>
  );
}
