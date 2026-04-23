<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# AiNiwa ファミリーサイト

このリポジトリは **AiNiwa ファミリー**（ainiwa-portal / occult-news-app / scp-foundation-app）の一員です。
作業前に以下のグローバルルールを**必ず確認**してください：

- `~/.claude/rules/ainiwa_family.md` — ファミリー共通指針（必読）
- `~/.claude/rules/ainiwa_assets.md` — 共有画像・アセット管理ルール

画像参照は `ASSETS.*` 経由、新規画像は `shared-assets/image-tasks/` のキューから。
`public/` 配下のキャラ画像・バナーは順次 R2 へ移行予定（ainiwa-portal の前例参照）。
