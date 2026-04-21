# BACKLOG（後回しタスク・アイデア集）

他セッションでの評価・アドバイスで出てきた改善項目のメモ。
対応する順番は都度判断。

優先度の考え方：
- **最優先**: 低コスト & 影響大（SEO/LLMO/法務の土台）
- **高**: 今月中に着手したい構造系改善
- **中**: 収益化・回遊性の本格設計
- **低**: 世界観・ファン化の深掘り

---

## サイト評価マージ情報

最新評価: **2026-04-21（82.0 / 100、前回 +3.2）**
前回評価: 2026-04-20（78.8 / 100、初回基準値）
評価ファイル:
- `~/.claude/skills/site-evaluation/results/occult-wire/2026-04-21.md`
- `~/.claude/skills/site-evaluation/results/occult-wire/2026-04-20.md`

2026-04-21 で合格ライン昇格（20→24 / 33）: 11 セキュリティ / 16 ナビ / 17 エラーページ / 27 タイポ
残最大ボトルネック: **9. 収益動線 40/100（加重 -3.64）**

再評価由来の新規タスク: #51（関連記事拡張）/ #52（検索ハイライト）/ #53（利用規約独立）
既存 #49 #50 にも「再評価トップ2」注記あり。

---

## 優先度: 最優先

（現在なし。#39 は 2026-04-21 に完成判定クリア → 対応済みへ移動）

---

## 優先度: 高（今月中に着手）

（現在なし）

---

## 優先度: 中

### 15. AdSense審査対応（GRIMOIRE 20記事蓄積後）
- **NEWS欄の陰謀論/数秘術カテゴリは審査リスク高**
- 選択肢:
  - a) GRIMOIRE 主体の構成に寄せて審査（NEWSを `noindex` 一時退避も可）
  - b) AdSense 諦めて下記 #16〜#18 に集中
- 陰謀論系記事のトーンに注意
- ※ 2026-04-20 評価でも指摘あり（評価14 法令対応：広告・PR表記が計画段階）

### 16. キャラIP収益化先行（低リスク・高親和性）
- **LINEスタンプ**（シュナ・ライカのセリフ付き）
- **BOOTH デジタルグッズ**（壁紙、PDF、ボイス等）
- **FANBOX / Ci-en / Fantia**（限定考察、未公開記事）
- **note 有料マガジン**（深掘り考察シリーズ）
- **Kindle 電子書籍**（GRIMOIRE 第1集）
- AdSense よりも審査リスクが圧倒的に低く、キャラIPと親和性が高い

### 17. アフィリエイト設計（UI土台は対応済、ID設定待ち）
- 2026-04-21 **UI土台対応済**（下部参照）: GRIMOIRE 記事末尾に Amazon 検索リンク枠実装（カテゴリ別キーワード）
- 残り手順:
  1. Amazon アソシエイト申請（GRIMOIRE 20 記事到達後または今でも可）
  2. 取得したタグを Vercel に `NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG=xxxxx-22` として設定
  3. 自動デプロイで全リンクに tag 付与（既存コードで対応済、環境変数を読むだけ）
  4. 楽天・もしもアフィリエイト・A8.net は余裕が出たら追加
- ※ 2026-04-20 評価でも指摘あり（評価9 収益動線：アフィリエイト未実装）

### 18. NEWS軸の再設計（評価②の保守的提案）
- NEWSを「神話・歴史・文化史との連想」に寄せる（地震→古代地震神信仰、株高→バブル期民俗学）
- 数字遊びの数秘術を一歩引く
- → **コンセプトの核に関わるのでユーザー判断必要**。AdSense通すかどうかと連動
- 一次取材・一次資料入り記事も数本仕込むと E-E-A-T 的に強い
- **HCU直撃リスク**: Google の Helpful Content Update は「AI生成 × 外部ニュース転載」を最も厳しく扱う形式。現状のNEWS軸はこの構造に該当するため、中長期のオーガニック流入はGRIMOIRE側に依存する可能性が高い

### 35. 被リンク施策
- 別セッション評価指摘: 新規サイトのため被リンクがほぼなく、SEO的底上げが必要
- 候補:
  - note・はてなブログに派生記事を寄稿してリンクを戻す
  - オカルト系ディレクトリ・まとめサイトへの登録
  - 相互リンクの打診（オカルト系個人ブログ）
  - Xでの言及を拾ってくれる影響度の高いアカウントとの接点作り
- 黒帽子ツールは使わない（ペナルティリスク）

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

### 23. デザインの世界観強化
- ノイズテクスチャ、怪しげなタイポでオカルト感を控えめに
- ダークモード（OS追従）
- キャラ画像の見せ場拡大（ヒーロー画像、記事末尾立ち絵）
- NEWS一覧の視覚メリハリ（カテゴリ色分け、🔥マーク等）
- ※ 2026-04-20 評価でも指摘あり（評価30 ダークモード：OS追従・手動切替なし）

### 24. メルマガ・LINE購読モデル
- 「今週のオカルト速報」的な購読モデル
- ファン囲い込み用
- ※ 2026-04-20 評価でも指摘あり（評価9 収益動線 + 評価29 RSS/購読：メルマガ登録なし）

### 25. ショート動画・ボイスでキャラの「動く場」
- TikTok・YouTube Shorts
- シュナ/ライカのボイス（AI音声 or 声優）

### 26. E-E-A-T対応
- AI著者で権威性は構造的に不利
- 独自ドメイン + 継続実績 + 読者数 + 人間監修者表記 で補完
- 長期テーマ
- ※ 2026-04-20 評価でも指摘あり（評価10 信頼性・E-E-A-T：運営者情報・訂正ポリシー不足）

### 27. 「占いモード」「今日のオカルト度」（残：占い要素のみ）
- ~~ランダム記事表示~~ → 2026-04-20 実装済み（`/grimoire/random`）
- ~~日替わり（date-based seed）~~ → 2026-04-20 実装済み（`/grimoire/daily`）
- 残：「今日のオカルト度」ゲージ（装飾寄り、優先度低）

### 28. 読者投稿受付
- 「このニュースを2人に解釈してほしい」投稿フォーム
- コミュニティ化への布石
- ※ 2026-04-20 評価でも指摘あり（評価33 コメント・コミュニティ：機能なし）

### 29. GRIMOIRE の URL から日付除去
- 時事性の薄い考察記事は日付なしの方が息が長い（評価①指摘）
- 既存URLのリダイレクト設計が必要なので、早期にやるかは慎重判断


### 36. キャラ深掘りコンテンツ（残：小話・記念特集）
- ~~キャラページの拡張（口調例・好き嫌い・設定資料）~~ → 2026-04-21 対応済み
- 残候補:
  - キャラ小話（短編）を GRIMOIRE とは別枠で配置
  - 1周年・キャラ誕生日記念などの特集
- #23 の「キャラ画像の見せ場拡大」と同時進行で効く

### 46. フォーム・CV設計（将来検討）
- 2026-04-20 評価由来（評価側優先度:低）
- 現状: `/contact` は Google Forms 依存
- 候補: 収益規模が上がったら自前フォーム検討（現状は問題なしと評価）

### 48. 購読チャネルの拡張（PUSH通知）
- 2026-04-21 #48 JSON Feed 部分対応済（下部参照）、本項目は残の PUSH 通知
- 失点残: PUSH 通知なし／メルマガなし（#24重複）
- 候補:
  1. PWA Service Worker を拡張して Push Notification API 対応（VAPID キー生成 + 購読 UI + 通知送信サーバー）
  2. メルマガは #24 側で検討
- 注意: service worker の大改修 + 通知送信バックエンド構築が必要、工数大

### 49. CSP enforce 切替（Report-Only→enforce）
- 2026-04-21 Report-Only で導入済（下部参照）。本項目は **enforce モードへの昇格**
- 手順:
  1. 本番で Report-Only 数日運用して違反ログを観測
  2. 違反があれば許可リスト精査 or ソース側修正
  3. `Content-Security-Policy-Report-Only` を `Content-Security-Policy` にキー変更（`next.config.ts` 1行のみ）
- 2026-04-21 再評価でも**効率順 2位**指定（工数極小、+0.24）
- 注意: #50 の GA4 ホストは既に CSP 許可リストに追加済

### 50. 分析・計測の拡張（残: GA4 実運用化 + イベント計測 / ヒートマップ / GTM / Sentry）
- 2026-04-21 GA4 コード側土台は対応済（下部参照）、本項目は実運用化と拡張
- 2026-04-21 再評価で**効率順 1位**指定（工数極小、+0.24）
- **実運用化の手順**: 海斗さん側で GA4 プロパティ作成 → Vercel に環境変数 `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX` を設定 → 自動デプロイで有効化
- 失点残: GA4 ID 未設定／ヒートマップなし／主要イベント計測なし／GTM経由化なし／Sentry等なし
- 候補:
  1. GA4 プロパティ作成 + ID を Vercel 環境変数に設定（海斗さん作業）
  2. `gtag('event', ...)` でイベント計測（Xフォロークリック、スクロール深度等）
  3. GTM 経由化（GA4 を GTM タグとして管理）
  4. Microsoft Clarity 等でヒートマップ（無料 + Cookieless 選択肢あり）
  5. Sentry（ランタイムエラー計測）
- 注意: ヒートマップ/GTM 追加時は CSP 許可リスト拡張要

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

### 2026-04-20 回遊性強化 + ランダム/日替わり機能
- [x] **#27 ランダム・日替わり記事**（オカルト度ゲージは装飾要素のみ残）
  - `src/app/grimoire/random/route.ts` 新設（Route Handler + dynamic redirect）
  - `src/app/grimoire/daily/route.ts` 新設（JST日付を FNV-1a 風 seed で固定、同日は同記事）
  - GRIMOIRE ヒーローは「今日の1冊」(紫) + 「ランダム」(シアン) の2ボタン構成
  - Footer にも両リンクを配置（`prefetch={false}` で毎回抽選/再評価）
- [x] **GRIMOIRE 一覧にカテゴリ・タグインデックス追加**
  - StoryFilter 下にカテゴリ一覧（紫）＋ 上位20タグ（シアン）を server-rendered
  - タグアーカイブの発見性を向上（ロングテールSEO経路を開く）

### 2026-04-20 見出しのキャラ視点サブタイトル（leadline）運用ルール化
- [x] **#22 leadline を全記事必須化**
  - `/occult-news投稿` スキルに leadline 必須ルールを追加：
    - 10〜35字、キャラ別スタイル（シュナ＝親しみ疑問形／ライカ＝端的な断言 or 短い問いかけ）
    - タイトル文言のコピー禁止（#8 引用ルールと整合）
    - 記事の核心を予告する一言（問いの形推奨）
  - Step 6-6 文字数バリデーションに `leadline` 範囲チェック追加（未達/超過は再生成）
  - 禁止事項セクションに leadline のコピー禁止を明記
  - データ補完: 2026-04-17（3記事）+ 2026-04-18/19（既に全件設定済み）

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

### 2026-04-20 他セッション評価マージ（X導線・可読性・参考文献）
- [x] **#37 X 導線強化**
  - Header に X アイコンリンクを追加（常時表示）
  - Footer に 世界観リード + キャラ紹介 + X フォローボタンを格上げ配置
  - GRIMOIRE 記事末尾に「Xでシェア」＋「@occult_wire をフォロー」CTA
- [x] **#32 フッター拡張**
  - 「毎日のニュースを、ふたりのAIがオカルト視点で読み解く」リード文追加
  - シュナ・ライカ のキャラアイコン + 著者ページへのリンク
  - X ボタンを RSS より目立つ位置に格上げ（丸枠ピル型 + 「更新はXで告知」コピー）
- [x] **#33 GRIMOIRE 長文の可読性微調整**
  - コントラスト比を計測: 本文 15.5:1（AAA クリア）、foreground/90 12.5:1、accent H2 4.7:1（大きいテキスト AA クリア）
  - 段落間 `mb-4` → `mb-5`、リスト行間 `leading-relaxed` → `leading-[1.85]` で段落と整合
- [x] **#34 GRIMOIRE 参考文献セクション**
  - Story 型に `references?: Reference[]` を追加（title / url / note、optional）
  - 個別ページ末尾に「参考にした一次資料・外部リソース」セクション新設（references があれば表示）
  - `/グリモワール投稿` スキルに references 収集・出力・バリデーションを組み込み
    - Step 4 調査時に references 配列を積む
    - Step 5 JSON 構造に references フィールド追加（歴史・科学・事件系は最低2件）
    - Step 6-2b に参考文献チェック（実在確認 + 捏造禁止）
    - 禁止事項に「実在しない references を書く」を追記

### 2026-04-20 GRIMOIRE に leadline（キャラ視点サブタイトル）を追加
- [x] **#38 GRIMOIRE leadline 追加**
  - `Story` 型に `leadline: string` を必須フィールドとして追加（`src/lib/stories.ts`）
  - 既存6記事（2026-04 分）に leadline をレトロフィット
  - UI 改修: StoryCard / LatestGrimoire / 個別ページ / OGP 画像でタイトル上に表示
  - キャラ別の色分け（シュナ=accent/80、ライカ=cyan/80、both=foreground/70）
  - `/グリモワール投稿` スキル改修:
    - フィールド生成順を明文化: title → summary → content → **leadline**（content 後に抽出）
    - Step 6-6 文字数バリデーションに leadline 範囲チェック（10〜35字）を追加
    - 禁止事項にタイトル文言コピー・content 前の leadline 決定を追記
  - ビルド検証: TypeScript + SSG 50ページ全生成OK

### 2026-04-20 GRIMOIRE 第6本目 + スキル微調整
- [x] **#10 GRIMOIRE 週2本ペース**: シュナ『顔のないT字の巨人たち──ギョベクリ・テペ』(ancient_civilization) 投稿
  - 今週（2026-04-20〜04-26）の1本目。あと1本で週2本ペース達成
  - 1万1500年前の巨大石造神殿、Klaus Schmidt の「宗教が農業を生んだ」仮説＋2020年代の住居跡発見という新しい揺らぎまで
  - references 3件（UNESCO / DAI Tepe Telegrams / Klaus Schmidt 2010 論文）
- [x] **`/occult-news投稿` スキル微調整**
  - leadline を「occultComment 生成後に抽出するステップ」として明文化
  - フィールド順序: summary → leadline → occultComment から summary → occultComment → leadline に変更
  - 「先に leadline を決めて本文をこじつける」失敗パターンを防止

### 2026-04-21 GRIMOIRE 第7本目（今週2本目）
- [x] **#10 GRIMOIRE 週2本ペース**: ライカ『スターゲイト計画──CIAが20年、2000万ドルで続けた『念力スパイ』の全記録』(conspiracy) 投稿
  - 今週（2026-04-20〜04-26）の2本目達成（shuna:raika = 1:1 バランス維持）
  - SCANATE → GRILL FLAME → CENTER LANE → SUN STREAK → STAR GATE のコードネーム変遷
  - SRI（パソフ/ターグ/スワン）、フォート・ミード、ヴューアー#001 マクモネイグル、パット・プライス（セミパラチンスクのクレーン）、1995年 AIR 評価（Utts vs Hyman）、FOIA 公開 2000万ドル
  - references 4件（CIA FOIA Reading Room / FAS IRP / AIR 1995 PDF / Wikipedia）

### 2026-04-21 GRIMOIRE 分量規定の拡張（SEO対応）
- [x] **分量: 1500〜2500字 → 3500〜5000字に拡張**
  - 別セッションSEO評価で「読み応え・網羅性・滞在時間」の観点で指摘
  - `/グリモワール投稿` スキル6箇所更新（JSON構造例、content生成ルール、readingTimeMinutes換算、見出し数、Step 6-6 バリデーション）
    - 見出し（##）: 2〜4個 → **4〜6個**（章立てを豊かに、SEO網羅性を確保）
    - references: 最低2件 → **最低3件**（歴史・科学・事件系）
    - readingTime 目安: 6〜10分 → **9〜14分**
  - `CHARACTERS.md` の分量セクションも同期（長編記事: 1500〜2500字 → 3500〜5000字）
  - 既存記事のリライトは不要（新規記事から適用）

### 2026-04-21 #29 GRIMOIRE URL 日付除去 + 301 redirect
- [x] **GRIMOIRE URL から日付プレフィックスを除去**（SEO: 考察記事のURL永続化）
  - `/grimoire/YYYY-MM-DD-author-slug` → **`/grimoire/author-slug`** に刷新
  - 既存7記事の `id` フィールドを `{author}-{slug}` 形式に統一（ファイル名は `{YYYY-MM-DD}-{author}-{slug}.json` のまま＝時系列整理のため）
  - `data/stories-index.json` の 7 id を同期
  - `next.config.ts` に 301 permanent redirect を追加:
    - `source: "/grimoire/:year(\\d{4})-:month(\\d{2})-:day(\\d{2})-:rest"` → `destination: "/grimoire/:rest"`
    - path-to-regexp 名前付きパラメータで日付形式のみマッチ（`/grimoire/daily` `/grimoire/random` `/grimoire/category/*` `/grimoire/tag/*` `/grimoire/author/*` は影響なし）
  - `/グリモワール投稿` スキルの id 生成ルールを更新（「日付を含めない」理由を明記）
  - ビルド検証: SSG 全ページ生成OK（新URL 7件 + redirect で旧URLも到達可能）

### 2026-04-21 #31 NEWSカードのサムネイル画像
- [x] **カテゴリ別SVGプレースホルダー画像**（選択肢c、最小コスト・外部依存ゼロ）
  - `NewsThumbnail` コンポーネント新設（80x80 viewBox のインラインSVG）
  - シンボル15種: ufo（円盤）/ uma・cryptid（足跡）/ ghost（幽霊）/ urban_legend（目）/ paranormal（渦）/ mystery（？）/ science（原子）/ society（ビル）/ politics（天秤）/ economy（折れ線）/ tech（チップ）/ world（地球儀）/ sports（トロフィー）/ entertainment（星）/ default
  - オカルト系（ufo/uma/ghost/urban_legend/paranormal/mystery/cryptid + type=occult_news）は紫グラデ、一般ニュースはシアングラデ
  - `ArticleCard` のタイトル横に 64x64px で配置（flex、min-w-0 shrink-0）
  - 視覚的引きを底上げ、画像フェッチ不要

### 2026-04-21 #40 グリモワール投稿スキルのカテゴリ名整合
- [x] **最小変更方針（案A）で実施**：`ufo` → `ufo_uap` を全体で統一、`unsolved_cases` をライカ得意分野に追加、`prophecy` / `uma` はジャンル別名として残しマッピング注記で knowledge 側と橋渡し
  - `src/lib/categories.ts`：`ufo` → `ufo_uap` にキー統一、`unsolved_cases` ラベル・説明追加
  - `data/stories/2026-04/2026-04-19-raika-rendlesham-ufo.json`：category を `ufo_uap` に書換
  - `data/stories-index.json`：`category_rotation_hint.raika_preferred` と該当 `published` の category を同期
  - `next.config.ts`：`/grimoire/category/ufo` → `/grimoire/category/ufo_uap` の 301 redirect 追加（旧URLのSEO温存）
  - `~/.claude/skills/グリモワール投稿/SKILL.md` Step 3：ライカ得意分野を knowledge と整合、`prophecy` → `mysticism` / `uma` → `mystery` のマッピング注記追加

### 2026-04-21 #39 knowledge ベース本格化（完成判定クリア）
- [x] **knowledge メンテスキル強化**（`index` / `stubs` モード新設、`full` モード順序更新）
- [x] **stub 15件を詳細化**（全件 WebSearch 裏取り + 一次資料URL付与、`stub: true` フラグ全削除）
  - ancient_civilization: atlantis, nazca_lines, stonehenge, gobekli_tepe（既存詳細版）
  - conspiracy: area_51, kennedy_assassination, mk_ultra, stargate_project（既存詳細版）
  - mystery: bermuda_triangle, eilean_mor_lighthouse, hinterkaifeck, dyatlov_pass（既存詳細版）
  - science_occult: deja_vu, near_death_experience, quantum_consciousness, mandela_effect（既存詳細版）
  - ufo_uap: nimitz_ufo, phoenix_lights, roswell_1947, rendlesham_ufo（既存詳細版）
- [x] **双方向リンク整備**（既存詳細5件の related 空配列を解消）
- [x] **`_index.json` 全面リビルド**（22トピックのメタデータを `.md` 真実に同期）
- [x] **`categories/` 5件の所属トピック索引補完**（index モードで自動抽出）
- **完成判定**:
  - [x] 全カテゴリに 3 件以上の詳細版トピック（記事あり5カテゴリで各4件、mysticism/numerology は単独だが詳細版）
  - [x] 全トピックに一次資料 URL 1 つ以上（22/22 達成）
  - [x] `_untrusted/` 0件
  - [x] 壊れたリンク 0件
- 今後は月次 `knowledge メンテ` で verified 再検証 + 新規追加トピック

### 2026-04-21 #36 キャラプロフィールページ拡張
- [x] **`/grimoire/author/[shuna|raika|both]` を公開向けプロフィール特化に刷新**
  - タグライン（キャラ一言紹介）
  - APPEARANCE: 外見チップ（シュナ=紫、ライカ=シアン）
  - PERSONALITY: 性格リスト
  - SPEECH: 一人称・語尾・サンプル台詞4件（吹き出し風カード）
  - EXPERTISE: 得意分野 × アプローチ説明（JSON-LD `knowsAbout` にも反映）
  - RELATIONSHIP: 双子関係 + 他キャラクロスリンク
  - ARCHIVE: 既存の記事一覧（StoryCard）は下部に維持
  - 構造化データ: `Person` JSON-LD（shuna/raika）+ `BreadcrumbList` JSON-LD
  - メタデータ: canonical / openGraph type=profile / twitter card
  - CHARACTERS.md の設定書を公開可能な形で抽出（NG例などは非公開のまま）
  - URL は従来通り（sitemap・Footer導線に影響なし）

### 2026-04-21 #50 GA4 コード側土台（Cookie consent 連動）
- [x] **`src/components/GoogleAnalytics.tsx` 新設（client component）**
  - `localStorage.occult-wire-cookie-consent === "accepted"` の場合のみ gtag.js を `<Script strategy="afterInteractive">` で挿入
  - `anonymize_ip: true` 付き（IP 匿名化）
  - `storage` event + カスタムイベント `occult-wire-consent-change` を listen して consent 変更に即応
- [x] **`CookieConsent.tsx`** で consent 変更時に `window.dispatchEvent(new Event("occult-wire-consent-change"))` を追加
- [x] **`layout.tsx`** で `process.env.NEXT_PUBLIC_GA_ID` が設定されていれば `<GoogleAnalytics>` を挿入（未設定なら何もしない）
- [x] **`next.config.ts` CSP 拡張**
  - script-src: `https://www.googletagmanager.com` 追加
  - connect-src: `https://www.google-analytics.com` + `https://region1.google-analytics.com` 追加
- [x] **`.env.example` 新設**（`NEXT_PUBLIC_GA_ID` の設定方法をドキュメント化）
- 実運用化には海斗さん側で GA4 プロパティ作成 + Measurement ID を Vercel 環境変数に設定が必要
- 評価スコア見込み: GA4 プロパティ稼働時、18. 分析・計測 55→75

### 2026-04-21 #49 CSP 段階導入（Report-Only）
- [x] **`next.config.ts` の `headers()` に `Content-Security-Policy-Report-Only` を追加**
  - `default-src 'self'`
  - `script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com`（Next.js inline + Vercel Analytics）
  - `style-src 'self' 'unsafe-inline'`（Tailwind + inline style）
  - `img-src 'self' data: blob: https:`（OGP画像 + 将来の外部画像対応余地）
  - `font-src 'self' data:`
  - `connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com`
  - `frame-ancestors 'none'` / `base-uri 'self'` / `object-src 'none'` / `form-action 'self'` / `upgrade-insecure-requests`
- SSG 運用のため nonce ベース不使用、`'unsafe-inline'` 妥協形
- **Report-Only** なのでブロックはせず違反のみ検知、本番数日運用後に enforce へ切替（新規 #49 タスクに再設定）
- 評価スコア見込み: 11. セキュリティ 92→100（Report-Only で部分加点、enforce 昇格で満点）

### 2026-04-21 #48 JSON Feed 追加（#48 の一部対応）
- [x] **`src/app/feed.json/route.ts` 新設**（JSON Feed 1.1 仕様準拠）
  - `content-type: application/feed+json; charset=utf-8`
  - 30件の GRIMOIRE 記事、カテゴリラベル + タグをまとめて `tags`、author は日本語キャラ名
  - `summary` は leadline + summary を `｜` で連結（RSSより情報密度高）
  - キャッシュ戦略は feed.xml と同じ（`s-maxage=3600, stale-while-revalidate=86400`）
  - `force-static` + `revalidate: 3600`
- [x] **layout.tsx の alternates に追加**（`application/feed+json` type として発見可能化）
- [x] **HTMLサイトマップ `/sitemap` に JSON Feed 導線追加**
- PUSH 通知は #48 本体タスクに残置（工数大、service worker 大改修 + VAPID キー + 通知送信バックエンド）
- 評価スコア見込み: 29. RSS・購読チャネル 45→60（JSON feed -7 回収、PUSH -13 / メルマガ -18 は残）

### 2026-04-21 #45 サイト内検索
- [x] **`fuse.js` 導入**（ファジー検索、小サイト向けに最適）
- [x] **`src/lib/search-index.ts` 新設**（GRIMOIRE + NEWS 両方を統合した SearchItem 配列を build 時生成）
- [x] **`src/components/SearchClient.tsx` 新設（client component）**
  - Fuse.js の keys 重み付け（title:3 / leadline:2 / summary:1.5 / tags:1.5 / categoryLabel:1 / category:0.8）
  - threshold 0.4、ignoreLocation、minMatchCharLength 2
  - GRIMOIRE は内部リンク、NEWS は `sourceUrl` の外部リンク（`target=_blank`）
- [x] **`src/app/search/page.tsx` 新設**（server component で index を build、client component に initialQuery 渡し）
  - クエリパラメータ `?q=xxx` 対応
  - robots: noindex（検索結果ページをインデックス対象外に）
- [x] **導線追加**
  - Header: 検索アイコン（X アイコンの左）
  - Footer: ナビに「検索」追加
  - `/sitemap` HTML: メインページ一覧に追加
  - `sitemap.xml` (機械向け) にも追加（priority 0.4）
  - `not-found.tsx` に「サイト内検索」誘導を追加
- 評価スコア見込み: 24. サイト内検索 21→70 / 16. ナビゲーション 88→92

### 2026-04-21 #30 Cookie同意バナー
- [x] **`src/components/CookieConsent.tsx` 新設（client component）**
  - `role="dialog"` + `aria-labelledby` / `aria-describedby` でスクリーンリーダ対応
  - `localStorage` キー: `occult-wire-cookie-consent`（値: `accepted` / `rejected`）
  - 初回アクセスで画面下部に fixed 表示、ボタンクリック後は以降非表示
  - プライバシーモードで localStorage 不可時も安全フォールバック
- `layout.tsx` の body 末尾に配置（全ページ共通）
- 現状は Cookieless な Vercel Analytics のみ稼働のため、同意 UI は「将来の GA4 導入」への前段階
- 評価スコア見込み: 14. 法令対応 56→66（Cookie -10 回収、特商法・利用規約独立・GDPR等は別タスクで残）

### 2026-04-21 #47 タイポグラフィ強化（和文Webフォント導入）
- [x] **`next/font/google` で 2種類の和文フォントを導入**
  - `Noto Sans JP` (400/500/700) — 本文用、`--font-noto-jp` variable
  - `Zen Kaku Gothic New` (700/900) — 見出し用、`--font-zen-kaku` variable（重厚感のある丸ゴシック）
- [x] **`globals.css` 更新**
  - `--font-sans` 冒頭に `var(--font-noto-jp)` を追加（既存フォールバックは維持）
  - `--font-display` を新設（`Zen Kaku Gothic New` → `Noto Sans JP` → system）
  - `body` に `font-feature-settings: "palt" 1`（プロポーショナルメトリクスでカーニング改善）
  - `h1, h2, h3` を `--font-display` + `letter-spacing: 0.01em` に
- `layout.tsx` の html に両 variable を適用（Next.js 標準 SSR フォントロード、CLS なし）
- 既存デザインを壊さず、本文と見出しのメリハリを強化
- 評価スコア見込み: 27. タイポグラフィ 75→88

### 2026-04-21 #43 エラーページ（404/500）のキャラトーン化
- [x] **`src/app/not-found.tsx` 新設（404）**
  - シュナ × ライカの対話形式で「闇に呑まれたみたい」と案内
  - `robots: { index: false, follow: false }` でインデックス除外
  - CTA: トップ / GRIMOIRE / ランダム1冊
  - 最新 GRIMOIRE 3件リスト + サイトマップ導線
- [x] **`src/app/error.tsx` 新設（ランタイムエラー）**
  - client component、ライカ単独の冷静説明「呪文の詠唱が途切れた」
  - `reset` ボタンで再試行、トップ戻り動線
  - `error.digest` をモノスペースで表示（サポート用）
- 評価スコア見込み: 17. エラーページ品質 56→90

### 2026-04-21 #42 ナビゲーション設計の補強（a/b/c 完了）
- [x] **a. 視覚的パンくずUI**
  - `src/components/Breadcrumb.tsx` 新設（`nav[aria-label=パンくずリスト]` + `ol`、現在位置は `aria-current=page`、長いタイトルは truncate）
  - GRIMOIRE 系5ページに挿入: `/grimoire`, `/grimoire/[id]`, `/grimoire/author/[slug]`, `/grimoire/tag/[slug]`, `/grimoire/category/[slug]`
  - 既存の BreadcrumbList JSON-LD と視覚UIが整合
- [x] **b. スクロールトップボタン**
  - `src/components/ScrollToTop.tsx` 新設（client component、scrollY > 400px で fade-in、クリックで smooth scroll）
  - `layout.tsx` の body 末尾に配置（全ページ適用）
  - `aria-label="ページトップへ戻る"`、focus ring でキーボード操作対応
- [x] **c. HTMLサイトマップ `/sitemap`**
  - `src/app/sitemap/page.tsx` 新設（人間向け、メイン5 / キャラ3 / GRIMOIRE全記事 / カテゴリ全種 / タグ全種 / その他）
  - Footer に「サイトマップ」導線追加（管理人とRSSの間）
  - `sitemap.ts`（機械向け XML）にも `/sitemap` を追加（priority 0.4）
- サイト内検索は #45 で別タスク継続（今回の範囲外）
- 評価スコア見込み: 16. ナビゲーション 73→88（サイト内検索 -4 は残）

### 2026-04-21 サイト評価マージ対応（#41 + #44 Phase 1）
- [x] **#41 セキュリティヘッダ一括設定（CSP を除く4つ）**
  - `next.config.ts` の `headers()` に全パス `/:path*` で追加:
    - `X-Frame-Options: DENY`
    - `X-Content-Type-Options: nosniff`
    - `Referrer-Policy: strict-origin-when-cross-origin`
    - `Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()`
  - dev server で `/` と `/grimoire` の両方に適用されることを確認
  - CSP は SSG との相性で別タスク #49 に分離（Report-Only から段階導入予定）
  - 評価スコア見込み: 11. セキュリティ 72→92（-20点回収、CSP -8点は残）
- [x] **#44 分析・計測 Phase 1（Vercel Analytics）**
  - `@vercel/analytics` パッケージ追加
  - `src/app/layout.tsx` に `<Analytics />` を `@vercel/analytics/next` から import し `<body>` 末尾に配置
  - Cookieless tracking なので Cookie 同意バナー（#30）不要
  - GA4 / GTM / ヒートマップ / Sentry は別タスク #50 に分離（Cookie バナー実装後に対応）
  - ビルド検証: `npm run build` 全ルート（Static/SSG/Dynamic）正常生成

### 2026-04-21 収益動線の第一弾（離脱防止 CTA + アフィリエイト UI 土台）
- [x] **GRIMOIRE 記事末尾に「読み終えたら、次の扉へ」セクション新設**
  - ランダム1冊 / 今日の1冊 / RSS購読 / X フォロー の4ボタン（2x2 グリッド）
  - 記事読了後の離脱を、再訪動線4種で吸収
- [x] **`src/lib/affiliate.ts` 新設**
  - カテゴリ別 Amazon 検索キーワードマップ（11カテゴリ）
  - `buildAmazonSearchUrl(keyword)`: `NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG` 環境変数があれば tag 付与、なければ通常検索URL
  - `getAffiliateKeywords(category)`: 未定義カテゴリは汎用フォールバック
- [x] **GRIMOIRE 記事末尾に「{カテゴリ} をもっと深掘りするなら」セクション新設**
  - カテゴリ別3キーワードを Amazon 検索リンクで表示
  - `rel="sponsored nofollow"` + `target="_blank"` で透明性確保
  - 「将来アソシエイトタグ付与する」旨の注意書き
- [x] **`.env.example` に `NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG` 追加**
- 評価スコア見込み: 9. 収益動線 43→55（アフィリエイト -6 回収 + 離脱防止 -5 の半分 + 複数収益源の下地）

### 2026-04-21 #52 検索結果ハイライト
- [x] **`SearchClient.tsx` 強化**
  - Fuse.js options に `includeMatches: true` 追加
  - `highlight(text, matches, key)` ヘルパー関数でマッチ部分を `<mark>` で囲む
  - 対象フィールド: title / leadline / summary / categoryLabel
  - スタイル: `bg-accent/30` + rounded + px-0.5 で既存デザインと整合
- 動作確認: 「ギョベクリ」検索でタイトル・本文両方に `<mark>` 2箇所反映
- 評価スコア見込み: 24. サイト内検索 70→79（ハイライト -9 回収）

### 2026-04-21 #53 利用規約独立ページ `/terms` 新設 + 未成年対応
- [x] **`src/app/terms/page.tsx` 新設**（8条構成）
  - 第1条 目的 / 第2条 コンテンツの性質（AI創作・エンタメ明示、legal#disclaimer リンク）
  - 第3条 **未成年の利用について**（13歳未満は保護者同意、刺激的題材への注意）
  - 第4条 禁止事項（クローリング / 無断転載 / 投資・防災判断等への利用 / 中傷）
  - 第5条 知的財産権 / 第6条 サービス変更・停止 / 第7条 規約変更 / 第8条 準拠法・管轄
  - パンくず付き、施行日 2026-04-21 明記
- [x] **`/legal` 冒頭に `/terms` への誘導リード追加**
- [x] **Footer に「利用規約」リンク追加**（運営・プライバシーと免責事項の間）
- [x] **HTMLサイトマップ `/sitemap` に追加**
- [x] **`sitemap.xml` に追加**（priority 0.3）
- 評価スコア見込み: 14. 法令対応 66→77（独立規約 -8 + 未成年対応 -3 = -11 回収）

### 2026-04-21 #51 GRIMOIRE 関連記事をスコア順 + 8件に拡張
- [x] **`src/lib/stories.ts` の `getRelatedStories()` をスコア制に強化**
  - スコア: カテゴリ一致 +100 / 著者一致 +30 / タグ一致 +20 × 件数 / 新しさ補正 最大 +30
  - デフォルト件数 4 → 8
- [x] **`/grimoire/[id]` ページ更新**
  - 呼び出しを `getRelatedStories(story, 8)` に
  - セクション見出し「{カテゴリ} の他の考察」→「関連の考察」（カテゴリ外記事も含まれるため）
  - 「一覧 →」リンクは「{カテゴリ}一覧 →」に明示化
- 評価スコア見込み: 9. 収益動線（関連記事リンク） -6→-3 / 16. ナビ 92→95

### 2026-04-21 サイト再評価（2回目）
- [x] **site-evaluation スキル 2回目実施**
  - 評価ファイル: `~/.claude/skills/site-evaluation/results/occult-wire/2026-04-21.md`
  - 総合点 **82.0 / 100**（前回 78.8 → +3.2）
  - 合格項目 20→24 / 33（+4）: 11 セキュリティ / 16 ナビ / 17 エラーページ / 27 タイポが新規合格
  - 残最大ボトルネック: 9. 収益動線 40/100（加重 -3.64）
- 新規タスク #51〜#53 を追加（関連記事拡張 / 検索ハイライト / 利用規約独立）
- 実機未検証項目（Lighthouse/PageSpeed 未実施）: 4 パフォーマンス / 7 a11y / 27 タイポ実機

### 残タスク（2026-04-20 以降）
- [x] **#10 今週の GRIMOIRE 2本目**（2026-04-21 ライカ『スターゲイト計画』で達成）
- [ ] スケジュールタスク化（毎朝自動実行）— 自動化は後回し（X API有料化で代替案要検討）
- [ ] ainiwa-portal 側の Production Domain 確認（手動 alias set の記憶なし＝既に登録済みの可能性。次回 portal 更新時に挙動確認）
