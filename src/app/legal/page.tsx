import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "運営者情報・プライバシー・免責 | OCCULT WIRE",
  description: "OCCULT WIRE の運営者情報、プライバシーポリシー、免責事項。",
};

export default function LegalPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-8 text-sm leading-relaxed">
        <h1 className="text-xl font-bold mb-6 text-accent">運営・プライバシー・免責</h1>

        {/* 運営者情報 */}
        <section id="operator" className="mb-10">
          <h2 className="text-lg font-bold mb-3 border-l-2 border-accent pl-3">運営者情報</h2>
          <dl className="space-y-2 text-foreground/80">
            <div className="flex">
              <dt className="w-24 shrink-0 text-muted">サイト名</dt>
              <dd>OCCULT WIRE</dd>
            </div>
            <div className="flex">
              <dt className="w-24 shrink-0 text-muted">運営元</dt>
              <dd>AiNiwa（個人運営）</dd>
            </div>
            <div className="flex">
              <dt className="w-24 shrink-0 text-muted">お問い合わせ</dt>
              <dd>
                <a
                  href="mailto:shunaraika@gmail.com"
                  className="text-cyan underline underline-offset-2"
                >
                  shunaraika@gmail.com
                </a>
              </dd>
            </div>
            <div className="flex">
              <dt className="w-24 shrink-0 text-muted">公開日</dt>
              <dd>2026年4月17日</dd>
            </div>
          </dl>
        </section>

        {/* プライバシーポリシー */}
        <section id="privacy" className="mb-10">
          <h2 className="text-lg font-bold mb-3 border-l-2 border-accent pl-3">プライバシーポリシー</h2>

          <h3 className="font-bold text-foreground/90 mt-4 mb-1.5">収集する情報</h3>
          <p className="text-foreground/80 mb-3">
            本サイトは、サービス向上のため以下の情報を収集する場合があります。
          </p>
          <ul className="list-disc pl-5 space-y-1 text-foreground/80 mb-4">
            <li>アクセス解析ツール（Google Analytics等）によるアクセス情報</li>
            <li>Cookieを用いた閲覧履歴・設定情報</li>
            <li>お問い合わせ時にご記入いただいた情報（メール等）</li>
          </ul>

          <h3 className="font-bold text-foreground/90 mt-4 mb-1.5">広告について</h3>
          <p className="text-foreground/80 mb-3">
            本サイトは将来的に第三者配信の広告サービス（Google AdSense等）を利用する予定です。
            広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookieを使用することがあります。
            Cookieの使用を希望しない場合は、ブラウザの設定で無効化できます。
          </p>

          <h3 className="font-bold text-foreground/90 mt-4 mb-1.5">アフィリエイトについて</h3>
          <p className="text-foreground/80 mb-3">
            本サイトは将来的にAmazonアソシエイト・その他アフィリエイトプログラムに参加する可能性があります。
            該当商品を紹介する際には、その旨を明記します。
          </p>

          <h3 className="font-bold text-foreground/90 mt-4 mb-1.5">情報の第三者提供</h3>
          <p className="text-foreground/80">
            法令に基づく場合を除き、ユーザーの個人情報を第三者に提供することはありません。
          </p>
        </section>

        {/* 免責事項 */}
        <section id="disclaimer" className="mb-10">
          <h2 className="text-lg font-bold mb-3 border-l-2 border-accent pl-3">免責事項</h2>

          <h3 className="font-bold text-foreground/90 mt-4 mb-1.5">AI生成コンテンツについて</h3>
          <p className="text-foreground/80 mb-3">
            本サイトに掲載されているAIキャラクター「シュナ」「ライカ」のコメント・考察・読み物は、
            <strong className="text-accent">すべてAIによる創作・エンタメ目的のコンテンツ</strong>
            です。史実・科学的事実・断定的な予言としての性質を持つものではありません。
          </p>
          <p className="text-foreground/80 mb-3">
            数秘術・陰謀論・都市伝説などの題材は「読み物」として扱っており、
            これらを真実として信じる・広める意図はありません。
          </p>

          <h3 className="font-bold text-foreground/90 mt-4 mb-1.5">ニュース記事の取り扱い</h3>
          <p className="text-foreground/80 mb-3">
            本サイトで言及しているニュースは、ユーザーを元の報道機関のページへ誘導する目的で
            見出し・概要のみを掲載しています。本文の全文転載は行いません。
            元記事の内容は、必ず各報道機関の公式ページでご確認ください。
          </p>
          <p className="text-foreground/80 mb-3">
            記事に対するAI考察は独自の創作物であり、元記事の報道機関・記者の見解とは
            一切関係ありません。
          </p>

          <h3 className="font-bold text-foreground/90 mt-4 mb-1.5">情報の正確性</h3>
          <p className="text-foreground/80 mb-3">
            掲載情報について正確性を期すよう努めていますが、内容の完全性・正確性・有用性について
            いかなる保証もいたしません。本サイトの情報を利用したことによる損害について、
            運営者は一切の責任を負いません。
          </p>

          <h3 className="font-bold text-foreground/90 mt-4 mb-1.5">判断材料としての利用について</h3>
          <p className="text-foreground/80 mb-3">
            本サイトの記事・考察は以下の判断の根拠としないでください。
          </p>
          <ul className="list-disc pl-5 space-y-1 text-foreground/80 mb-3">
            <li><strong className="text-accent">投資判断</strong>（株価・経済・金融商品に関する考察）</li>
            <li><strong className="text-accent">防災・避難・健康に関する判断</strong>（地震・災害・感染症・医療に関する考察）</li>
            <li><strong className="text-accent">法的・社会的判断</strong>（特定の人物・団体・政策への評価）</li>
          </ul>
          <p className="text-foreground/80 mb-3">
            数秘術・陰謀論・予言といった題材を扱う性質上、本サイトの記事が
            実際の事件・人物・団体を連想させる場合がありますが、
            <strong>特定個人・団体への中傷を意図するものではありません</strong>。
          </p>

          <h3 className="font-bold text-foreground/90 mt-4 mb-1.5">著作権について</h3>
          <p className="text-foreground/80 mb-3">
            本サイト内のAI考察・読み物・デザイン・キャラクターの著作権は運営者に帰属します。
            ニュース見出し等の引用は、著作権法第32条の引用の要件を満たす範囲で行っています。
            掲載内容に権利侵害等の問題がある場合は、お問い合わせ先までご連絡ください。
          </p>
        </section>

        <section className="mt-8 text-xs text-muted">
          <p>最終更新日: 2026年4月19日</p>
        </section>
      </main>

      <Footer />
    </>
  );
}
