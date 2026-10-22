# Portfolio_1.0

## 概要

seino914 の個人ポートフォリオサイト。Home・About・Skills・Contact のページで構成し、Next.js の静的エクスポート（`output: "export"`）で `out/` に書き出す。

## ディレクトリ構造

```
/
├── .github/             　# Github Workflow・Dependabot設定
├── .next/              　 # Next.jsのビルド出力
├── out/                　 # 静的エクスポートの出力（npm run build で生成）
├── node_modules/       　 # 依存パッケージ（基本いじらない）
├── public/             　 # 静的ファイル（画像など）
├── src/                　 # ソースコード
│   ├── app/            　 # Next.js App Router
│   │   ├── about/      　 # Aboutページ
│   │   ├── contact/    　 # Contactページ
│   │   ├── skills/     　 # Skillsページ
│   │   ├── globals.css 　 # グローバルスタイル
│   │   ├── layout.tsx  　 # レイアウトコンポーネント
│   │   ├── not-found.tsx　# 404ページ
│   │   ├── page.tsx    　 # メインページ
│   │   ├── robots.ts   　 # robots.txt生成
│   │   └── sitemap.ts  　 # sitemap.xml生成
│   ├── components/     　 # 共通コンポーネント（ui/ に shadcn ui）
│   └── lib/            　 # ユーティリティ関数など
├── .env.example        　 # 環境変数のテンプレート
├── .env                　 # ローカル環境変数（Git管理外）
├── .gitignore          　 # Git除外設定
├── biome.json          　 # Biome設定（lint・整形）
├── components.json     　 # コンポーネント設定
├── next-env.d.ts       　 # Next.js型定義
├── next.config.js      　 # Next.js設定
├── package-lock.json   　 # 依存関係のロックファイル
├── package.json        　 # プロジェクト設定と依存関係
├── postcss.config.js   　 # PostCSS設定
├── tsconfig.json       　 # TypeScript設定
└── README.md           　 # プロジェクトの説明書
```

## 技術スタック

- TypeScript
- Next.js 16（React 19、App Router、静的エクスポート）
- Tailwind CSS 4
- shadcn ui（Radix UI ベースの UI コンポーネント）
- Framer Motion（アニメーション）
- next-themes（ダークモード）
- React Hook Form・Zod（フォーム・バリデーション）
- Formspree（フォーム送信）
- Biome（lint・整形）

## セットアップ

```
npm install
cp .env.example .env
```

`.env` の `NEXT_PUBLIC_FORMSPREE_ENDPOINT` に Formspree のエンドポイントを設定する（Contact ページのフォーム送信に使う）。

## コマンド

### 開発

```
npm run dev
```

### ビルド

静的エクスポートを `out/` に書き出す:

```
npm run build
```

### lint・整形

lint（Biome）:

```
npm run lint
```

整形（Biome。安全な修正も自動で適用する）:

```
npm run format
```
