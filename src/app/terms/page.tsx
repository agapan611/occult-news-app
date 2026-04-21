import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata = {
  title: "利用規約",
  description:
    "OCCULT WIRE の利用規約。ご利用前に必ずお読みください。AI生成コンテンツの扱い、禁止事項、未成年の利用について等を規定しています。",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "利用規約 | OCCULT WIRE",
    description: "OCCULT WIRE の利用規約。",
    url: "/terms",
  },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <Breadcrumb
        items={[{ name: "ホーム", href: "/" }, { name: "利用規約" }]}
      />
      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-8 text-sm leading-relaxed">
        <h1 className="mb-6 text-xl font-bold text-accent">利用規約</h1>

        <p className="mb-6 text-foreground/80">
          本規約は、OCCULT WIRE（https://occult.ainiwa.jp/
          、以下「本サイト」）の利用条件を定めるものです。本サイトをご利用いただくすべての方は、本規約に同意したものとみなされます。
        </p>

        <section id="purpose" className="mb-8">
          <h2 className="mb-2 border-l-2 border-accent pl-3 text-lg font-bold">
            第1条（目的）
          </h2>
          <p className="text-foreground/80">
            本規約は、本サイトが提供する情報およびコンテンツ（以下「本サービス」）を利用する際の条件を定めることを目的とします。
          </p>
        </section>

        <section id="content-nature" className="mb-8">
          <h2 className="mb-2 border-l-2 border-accent pl-3 text-lg font-bold">
            第2条（コンテンツの性質）
          </h2>
          <p className="mb-3 text-foreground/80">
            本サイトのAIキャラクター「シュナ」「ライカ」によるコメント・考察・読み物は、
            <strong className="text-accent">すべてAIによる創作・エンタメ目的のコンテンツ</strong>
            です。史実・科学的事実・断定的な予言としての性質を持ちません。
          </p>
          <p className="text-foreground/80">
            免責事項の詳細は{" "}
            <Link
              href="/legal#disclaimer"
              className="text-cyan underline underline-offset-2 hover:text-accent"
            >
              運営・プライバシー・免責
            </Link>
            {" "}をご参照ください。
          </p>
        </section>

        <section id="minors" className="mb-8">
          <h2 className="mb-2 border-l-2 border-accent pl-3 text-lg font-bold">
            第3条（未成年の利用について）
          </h2>
          <p className="mb-3 text-foreground/80">
            本サイトは13歳未満のお子様を主たる対象としていません。13歳未満の方が本サービスを利用する場合は、必ず保護者の同意と監督の下でご利用ください。
          </p>
          <p className="mb-3 text-foreground/80">
            本サイトは陰謀論・怪異・事件史などを題材としており、一部の記事には刺激的な内容が含まれることがあります。未成年の方、およびその保護者の方は、この点をご理解のうえ閲覧可否をご判断ください。
          </p>
          <p className="text-foreground/80">
            未成年の方がお問い合わせをされる場合は、保護者の同意を得たうえで送信してください。
          </p>
        </section>

        <section id="prohibitions" className="mb-8">
          <h2 className="mb-2 border-l-2 border-accent pl-3 text-lg font-bold">
            第4条（禁止事項）
          </h2>
          <p className="mb-3 text-foreground/80">
            利用者は、本サービスの利用にあたり、以下の行為を行ってはなりません。
          </p>
          <ul className="mb-3 list-disc space-y-1 pl-5 text-foreground/80">
            <li>法令または公序良俗に違反する行為</li>
            <li>本サイトの運営を妨害する行為（過度なクローリング、サーバへの攻撃等を含む）</li>
            <li>本サイトのコンテンツを無断で複製・転載・二次配布する行為</li>
            <li>本サイトの記事・考察を、投資判断・防災避難判断・医療判断・法的判断の根拠として第三者に提示する行為</li>
            <li>本サイトのコンテンツを用いて、特定の個人・団体を中傷・侮辱する行為</li>
            <li>他の利用者、第三者、または運営者の権利を侵害する行為</li>
            <li>その他、運営者が不適切と判断する行為</li>
          </ul>
        </section>

        <section id="ip" className="mb-8">
          <h2 className="mb-2 border-l-2 border-accent pl-3 text-lg font-bold">
            第5条（知的財産権）
          </h2>
          <p className="mb-3 text-foreground/80">
            本サイト内のAI考察・読み物・デザイン・キャラクター（シュナ/ライカ）の著作権は運営者に帰属します。
          </p>
          <p className="text-foreground/80">
            ニュース見出し等の引用は、著作権法第32条の引用の要件を満たす範囲で行っています。権利侵害等の問題がある場合は
            {" "}
            <Link
              href="/contact"
              className="text-cyan underline underline-offset-2 hover:text-accent"
            >
              お問い合わせ
            </Link>
            {" "}からご連絡ください。
          </p>
        </section>

        <section id="service-changes" className="mb-8">
          <h2 className="mb-2 border-l-2 border-accent pl-3 text-lg font-bold">
            第6条（サービス内容の変更・停止）
          </h2>
          <p className="text-foreground/80">
            運営者は、利用者への事前通知なく、本サービスの内容を変更・追加・停止することがあります。これにより利用者に生じた損害について、運営者は一切の責任を負いません。
          </p>
        </section>

        <section id="terms-changes" className="mb-8">
          <h2 className="mb-2 border-l-2 border-accent pl-3 text-lg font-bold">
            第7条（規約の変更）
          </h2>
          <p className="text-foreground/80">
            運営者は、必要に応じて本規約を変更することができます。変更後の規約は、本ページに掲示された時点から効力を生じます。
          </p>
        </section>

        <section id="governing-law" className="mb-10">
          <h2 className="mb-2 border-l-2 border-accent pl-3 text-lg font-bold">
            第8条（準拠法・管轄）
          </h2>
          <p className="text-foreground/80">
            本規約は日本法に準拠して解釈されるものとし、本サービスに関して紛争が生じた場合は、運営者の住所地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。
          </p>
        </section>

        <section className="text-xs text-muted">
          <p>施行日: 2026年4月21日</p>
          <p className="mt-2">
            関連ページ:{" "}
            <Link
              href="/legal"
              className="underline underline-offset-2 hover:text-accent"
            >
              運営・プライバシー・免責
            </Link>
            {" / "}
            <Link
              href="/contact"
              className="underline underline-offset-2 hover:text-accent"
            >
              お問い合わせ
            </Link>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
