# Portfolio_v2.0

## ディレクトリ構造

```
/
├── .next/              # Next.jsのビルド出力
├── node_modules/       # 依存パッケージ
├── public/             # 静的ファイル（画像など）
├── src/                # ソースコード
│   ├── app/            # Next.js App Router
│   │   ├── content/    # メインコンテンツコンポーネント
│   │   ├── section/    # 各セクションのコンポーネント
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   └── skills/
│   │   ├── globals.css # グローバルスタイル
│   │   ├── layout.tsx  # ルートレイアウト
│   │   └── page.tsx    # メインページエントリ
│   ├── components/     # 共通コンポーネント
│   │   ├── 3d/         # Three.js関連 (Canvas, Objects)
│   │   ├── ui/         # shadcn/ui コンポーネント
│   │   └── ...
│   ├── lib/            # ユーティリティ関数
│   └── store/          # 状態管理 (スクロール制御など)
├── .eslintrc.json      # ESLint設定
├── components.json     # shadcn/ui設定
├── next.config.js      # Next.js設定
├── package.json        # プロジェクト設定と依存関係
├── tailwind.config.ts  # Tailwind CSS設定
└── tsconfig.json       # TypeScript設定
```

## 技術スタック

### Core
- **Framework**: Next.js 13 (App Router)
- **Library**: React 18
- **Language**: TypeScript

### Styling & UI
- **CSS**: Tailwind CSS
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **Theme**: next-themes (Dark/Light mode)

### 3D & Animation
- **3D**: Three.js, @react-three/fiber, @react-three/drei
- **Animation**: Framer Motion

### Form & Validation
- **Form Management**: React Hook Form
- **Validation**: Zod
- **Backend Service**: Formspree

### Tools
- **Linter**: ESLint
- **Formatter**: Prettier

## 開発

### 開発サーバーの起動

```bash
npm run dev
```
http://localhost:3000
