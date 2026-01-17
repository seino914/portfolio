/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  // 注意: 静的エクスポート（output: "export"）の場合、headers()は動作しません
  // セキュリティヘッダーはホスティングサービスの設定ファイルで設定してください
  // - Vercel: vercel.json
  // - Netlify: public/_headers または netlify.toml
  // - その他: ホスティングサービスの設定でヘッダーを追加
};

module.exports = nextConfig;
