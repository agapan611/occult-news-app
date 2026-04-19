# BACKLOG（後回しタスク・アイデア集）

他セッションでの評価・アドバイスで出てきた改善項目のメモ。
対応する順番は都度判断。

優先度の考え方：
- **最優先**: 低コスト & 影響大（SEO/LLMO/法務の土台）
- **高**: 今月中に着手したい構造系改善
- **中**: 収益化・回遊性の本格設計
- **低**: 世界観・ファン化の深掘り

---

## 優先度: 高（今月中に着手）

### 10. GRIMOIRE の週2本ペース蓄積（SEO資産化）
- 狙いクエリ例: 「ディアトロフ峠事件 真相」「数秘術 7 意味」「アトランティス 正体」
- 週2本ペースで積み上げ → 半年〜1年で化ける可能性
- 20本蓄積で AdSense 審査対応 #15 の前提が整う

---

## 優先度: 中

### 15. AdSense審査対応（GRIMOIRE 20記事蓄積後）
- **NEWS欄の陰謀論/数秘術カテゴリは審査リスク高**
- 選択肢:
  - a) GRIMOIRE 主体の構成に寄せて審査（NEWSを `noindex` 一時退避も可）
  - b) AdSense 諦めて下記 #16〜#18 に集中
- 陰謀論系記事のトーンに注意

### 16. キャラIP収益化先行（低リスク・高親和性）
- **LINEスタンプ**（シュナ・ライカのセリフ付き）
- **BOOTH デジタルグッズ**（壁紙、PDF、ボイス等）
- **FANBOX / Ci-en / Fantia**（限定考察、未公開記事）
- **note 有料マガジン**（深掘り考察シリーズ）
- **Kindle 電子書籍**（GRIMOIRE 第1集）
- AdSense よりも審査リスクが圧倒的に低く、キャラIPと親和性が高い

### 17. アフィリエイト設計
- タロット、パワーストーン、ムー等書籍、占い鑑定、UFO観測機器、ホラーゲーム
- Amazonアソシエイト、楽天、もしもアフィリエイト、A8.net
- GRIMOIRE記事末尾に関連商品リンク枠
- 審査は AdSense より緩い

### 18. NEWS軸の再設計（評価②の保守的提案）
- NEWSを「神話・歴史・文化史との連想」に寄せる（地震→古代地震神信仰、株高→バブル期民俗学）
- 数字遊びの数秘術を一歩引く
- → **コンセプトの核に関わるのでユーザー判断必要**。AdSense通すかどうかと連動
- 一次取材・一次資料入り記事も数本仕込むと E-E-A-T 的に強い

### 21. 攻撃的ボット防御の強化（Vercel Firewall / Cloudflare）
- `robots.txt` はお行儀のよいクローラーにしか効かない
  - → 無視して帯域を食い潰す悪質スクレイパーへの対策が必要
- **Vercel 側の選択肢**:
  - Hobby プランでも `vercel.json` の `headers` で User-Agent ベースのルーティング制御は可能
  - Pro 以上なら「[Vercel Firewall](https://vercel.com/docs/security/vercel-firewall)」で Bot Challenge / Rate Limit / Attack Challenge Mode
  - Attack Challenge Mode はDDoS検知時に自動で入る
- **Cloudflare を前段に置く選択肢**:
  - 無料枠で Bot Fight Mode、Rate Limiting、WAF ルールが使える
  - Vercel と併用可能（Vercel の CNAME 先に Cloudflare をかます）
  - ただしCDNが二重になるのでキャッシュ戦略に注意
- **トリガー**: 実際にアクセスログで不審なUA・帯域スパイクが観測されたら着手
- 現状: アクセス少・立ち上げ直後なので様子見

---

## 優先度: 低

### 22. 見出しのキャラ視点サブタイトル
- 「タイトルは事実ベース、サブタイトルでキャラの一言」折衷案
- `leadline` フィールドは追加済み、各記事に設定していくかは要判断

### 23. デザインの世界観強化
- ノイズテクスチャ、怪しげなタイポでオカルト感を控えめに
- ダークモード（OS追従）
- キャラ画像の見せ場拡大（ヒーロー画像、記事末尾立ち絵）
- NEWS一覧の視覚メリハリ（カテゴリ色分け、🔥マーク等）

### 24. メルマガ・LINE購読モデル
- 「今週のオカルト速報」的な購読モデル
- ファン囲い込み用

### 25. ショート動画・ボイスでキャラの「動く場」
- TikTok・YouTube Shorts
- シュナ/ライカのボイス（AI音声 or 声優）

### 26. E-E-A-T対応
- AI著者で権威性は構造的に不利
- 独自ドメイン + 継続実績 + 読者数 + 人間監修者表記 で補完
- 長期テーマ

### 27. 「占いモード」「今日のオカルト度」（残り：日替わり/占い要素）
- ~~ランダム記事表示~~ → 2026-04-20 実装済み（`/grimoire/random`）
- 残：日替わり（date-based seed）、「今日のオカルト度」ゲージ
- 軽いインタラクティブ要素

### 28. 読者投稿受付
- 「このニュースを2人に解釈してほしい」投稿フォーム
- コミュニティ化への布石

### 29. GRIMOIRE の URL から日付除去
- 時事性の薄い考察記事は日付なしの方が息が長い（評価①指摘）
- 既存URLのリダイレクト設計が必要なので、早期にやるかは慎重判断

### 30. Cookie同意バナー
- Google Analytics 導入時に必要
- APPI改正 + EU アクセス対応

---

## 見送り

### 親スキル（3スキル統合、一発出力）
- `/occult-wire全更新` で ニュース+GRIMOIRE+X を順次実行する構想
- **見送り理由**: 個別スキルが成熟しているため統合のメリットが薄い。段階実行の方がエラー制御しやすい

---

## 対応済み

### 〜 2026-04-17 初期構築
- [x] OCCULT WIRE 本体アプリ構築（Next.js 16 + Vercel）
- [x] AiNiwa ポータル新設（ainiwa.jp）+ 旧AiNiwa解体
- [x] 独自ドメイン取得（ainiwa.jp + occult.ainiwa.jp）
- [x] ダーク系UI、スマホファースト
- [x] シュナ&ライカ キャラ導入
- [x] 管理人紹介ページ `/about`
- [x] オカルトニュースまとめ機能（タブUI）
- [x] 運営者情報・プライバシー・免責（`/legal`）
- [x] 元記事リンクの冒頭表示
- [x] 要約の短縮（line-clamp-2）
- [x] キャラ別アーカイブ（/grimoire/author/[slug]）
- [x] ヘッダーナビの目立たせ（2段化）
- [x] 読み物 → GRIMOIRE リブランド
- [x] 最新GRIMOIREの横スクロール
- [x] GRIMOIRE（長編読み物）機能の基盤 + サンプル2件（シュナ/ライカ各1）

### 2026-04-17 スキル・ルール整備
- [x] CHARACTERS.md 詳細化（口調OK/NG例、切り口辞書、割当ルール）
- [x] data/articles-index.json 作成（記事インデックス）
- [x] data/stories-index.json 強化（GRIMOIRE インデックス）
- [x] `/occult-news投稿` スキル作成（自己チェック + URL検証 + タイトル一致度）
- [x] `/グリモワール投稿` スキル作成（ハルシネーション対策込み）
- [x] 人の死を直接茶化さないガイドライン（CHARACTERS.md + 両スキル）
- [x] リンク事故記事のクリーンアップ（404/トップページURL除去）
- [x] スキルを「文脈参照型」に統一（全スキルから disable-model-invocation 削除）
- [x] workflow.md に「スキルは文脈参照型」ルール追加
- [x] スキル作成MAX/改善/診断 の方針も文脈参照型に統一

### 2026-04-17 運用テスト
- [x] `/occult-news投稿` スキル初稼働（今日のニュース4件追加、合計7件）
  - ペンタゴンUAP機密解除・アルテミスII月最遠記録・ウシクウイルス発見・S&P500最高値
- [x] Vercel alias を最新デプロイに再設定（本番反映）

### 2026-04-18 追加対応
- [x] 2ショット画像 PIL合成版 採用（ComfyUI v4まで試行したが元画像品質を上回れず）
- [x] Xヘッダー画像（1500x500、左シュナ右ライカ＋中央サイト名）
- [x] Xアカウント取得（`@occult_wire`）
- [x] `/x投稿` スキル作成 + 初投稿テスト成功
- [x] 運営者情報のメアド非公開化 → 問い合わせ用に `shunaraika@gmail.com` を設定

### 2026-04-19 追加対応
- [x] **Vercel Production Domain 設定見直し**（alias 自動更新問題を根本解決）
  - `vercel domains add occult.ainiwa.jp` で Production Domain として正式登録
  - 空コミット push で自動 alias 張り替えを実テスト → OK
  - `/occult-news投稿` と `/グリモワール投稿` スキルから手動 `vercel alias set` 記述を削除
  - 原因は「親ドメイン衝突」ではなく、単にプロジェクトの Production Domain として未登録だったため
- [x] 4月19日 daily X投稿（シュナ数秘術5、Playwright MCP経由）
- [x] 災害・死亡ニュースのガイドライン自主設定（CHARACTERS.md・両スキルに反映）

### 2026-04-19 SEO/LLMO/法務対応（BACKLOG 最優先消化）
- [x] **#1 Search Console 登録・サイトマップ送信**（HTMLタグ方式で所有権確認→sitemap送信完了）
- [x] **#2 robots.ts / sitemap.ts 設置**（Next.js 16 標準の MetadataRoute で自動生成）
  - AIクローラー許可リスト27種（Googlebot/GPTBot/ClaudeBot/PerplexityBot/Google-Extended 等）
  - 攻撃的ボット拒否リスト14種（Bytespider/SemrushBot/AhrefsBot/DotBot 等）
- [x] **#3 llms.txt 設置**（英語サマリー、キャラ設定、AI考察はエンタメ明記）
- [x] **#4 お問い合わせフォーム開設**（Googleフォーム経由 + `/contact` ページ新設 + Footer導線）
- [x] **#5 各ページ メタ監査**（layout.tsx 共通OGP/Twitter/Verification、about/legal/contact 個別メタ設定）
- [x] **#6 免責文の追記**（投資判断・防災避難判断・中傷意図なしの3項目を `/legal` に追加）

### 2026-04-19 SEO/LLMO 構造化対応（BACKLOG 高優先消化）
- [x] **#7 構造化データ（JSON-LD）実装**
  - 共通 `JsonLd` コンポーネント新設（XSS対策付き）
  - layout.tsx に `WebSite` + `Organization` 挿入
  - GRIMOIRE個別ページに `Article` + `BreadcrumbList` + `Person(author)` 挿入
  - GRIMOIRE一覧ページに `BreadcrumbList` 挿入
  - generateMetadata を拡張（canonical、openGraph type=article、twitter、authors、keywords、publishedTime/modifiedTime）
- [x] **#8 NEWS引用の主従関係ルール化（`occult-news投稿` スキル改修）**
  - summary: 60〜120字（短い導入）／occultComment: 400〜700字（記事本体）に引き上げ
  - 禁止事項を強化：見出し・summary の文言コピー禁止を明記
  - 考察の構成例を追加（つかみ → 独自視点 3〜4 段階 → 問いかけ）
- [x] **#9 NEWS考察の最低文字数ルール（`occult-news投稿` スキル改修）**
  - Step 6-6 に文字数バリデーションを追加
  - `occultComment >= 400字` 必須 + `occultComment.length >= summary.length * 3`（主従関係担保）
  - 未達なら加筆、超過なら要点抽出、修正不能なら除外
- [x] **#11 OGP画像の動的生成**
  - `src/app/grimoire/[id]/opengraph-image.tsx` 新設（`next/og` の `ImageResponse`）
  - `public/fonts/NotoSansJP-Bold.ttf` を同梱して `readFile` で注入（satori は TTF/OTF のみ対応）
  - キャラ別アクセント色（シュナ=#ef4444、ライカ=#38bdf8）、タイトル文字数で自動サイズ調整
  - 罫線系文字（U+2500等）はサブセット欠落するため描画時のみ長音記号に置換
  - 装飾星（U+2726）も CSS描画の色付きドット＋glow に置換
- [x] **#12 RSS / ATOM フィード**
  - `src/app/feed.xml/route.ts` 新設（RSS 2.0、dc:creator、category、atom:link）
  - 最新30件、`revalidate: 3600` + `stale-while-revalidate: 86400`
  - layout.tsx の `alternates.types["application/rss+xml"]` で発見可能化
  - Footer に RSS リンク導線追加

### 2026-04-20 回遊性強化 + ランダム機能
- [x] **#27 ランダム記事表示**（日替わり/オカルト度ゲージは残タスク）
  - `src/app/grimoire/random/route.ts` 新設（Route Handler + dynamic redirect）
  - GRIMOIRE ヒーロー下に丸型ボタン配置（`prefetch={false}` で毎回抽選）
  - Footer にも同リンク追加（全ページから利用可）
- [x] **GRIMOIRE 一覧にカテゴリ・タグインデックス追加**
  - StoryFilter 下にカテゴリ一覧（紫）＋ 上位20タグ（シアン）を server-rendered
  - タグアーカイブの発見性を向上（ロングテールSEO経路を開く）

### 2026-04-20 タグアーカイブ追加
- [x] **#20 タグアーカイブページ `/grimoire/tag/[slug]` 新設**
  - `src/lib/stories.ts` に `getAllTags()`（件数付き、降順）と `getStoriesByTag()` を追加
  - `generateStaticParams` で全21タグSSG
  - `BreadcrumbList` + `CollectionPage` JSON-LD を挿入
  - タグ別記事一覧 + 上位20タグへの導線（件数表示付き）
  - GRIMOIRE 個別ページのタグ chip を Link 化
  - 日本語タグは `encodeURIComponent` で URL-safe 化、受け取り側で `decodeURIComponent`
  - sitemap.xml に全タグページ自動追加（priority 0.6）

### 2026-04-19 回遊性・視認性対応（BACKLOG 中優先消化）
- [x] **#13 内部リンク設計の強化**
  - GRIMOIRE 個別ページ末尾に同カテゴリ関連記事ブロック（4件まで）を追加
  - カテゴリバッジをリンク化（個別ページ → `/grimoire/category/[slug]`）
  - `getRelatedStories()` 関数を `src/lib/stories.ts` に追加
- [x] **#14 カテゴリページ `/grimoire/category/[slug]` 新設**
  - `generateStaticParams` で全カテゴリSSG
  - `BreadcrumbList` + `CollectionPage` JSON-LD 挿入
  - カテゴリ説明文 + 記事一覧 + 他カテゴリ導線
  - `src/lib/categories.ts` に `grimoireCategoryLabels` / `grimoireCategoryDescriptions` を集約（StoryCard/個別ページ/カテゴリページで共有）
  - sitemap.xml にカテゴリページ自動追加（priority 0.7）
- [x] **#19 キャラ別アクセントカラー（カードUI反映）**
  - StoryCard / ArticleCard の左端に著者別の極細アクセントストライプを追加
  - シュナ=`bg-accent`（紫）、ライカ=`bg-cyan`、both=グラデーション
  - 一覧スキャン時に執筆者を直感的に識別できる視覚的手がかり
  - LatestGrimoire（横スクロール bordered card）は既に著者アイコン+名前が表示されているため見送り

### 残タスク（2026-04-20 以降）
- [ ] スケジュールタスク化（毎朝自動実行）— 自動化は後回し（X API有料化で代替案要検討）
- [ ] ainiwa-portal 側の Production Domain 確認（手動 alias set の記憶なし＝既に登録済みの可能性。次回 portal 更新時に挙動確認）
