import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CONTACT_FORM_URL = "https://forms.gle/iwojsAVDU1p2eeMf6";

export const metadata = {
  title: "お問い合わせ",
  description:
    "OCCULT WIRE へのお問い合わせ・権利侵害のご連絡・掲載依頼などはこちらから。",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "お問い合わせ | OCCULT WIRE",
    description: "OCCULT WIRE へのお問い合わせはこちら。",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-10">
        <h1 className="text-xl font-bold mb-4 text-accent">お問い合わせ</h1>
        <p className="mb-6 text-sm leading-relaxed text-foreground/80">
          OCCULT WIRE に関するご質問・権利侵害のご連絡・掲載依頼などは、
          下記のフォームまたはメールよりお送りください。
          内容によってはご返信に数日いただく場合があります。
        </p>

        <a
          href={CONTACT_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-lg border border-accent/50 bg-accent/15 py-3 text-center text-sm font-bold text-accent transition-colors hover:bg-accent/25 mb-6"
        >
          お問い合わせフォームを開く →
        </a>

        <div className="rounded-lg border border-card-border bg-card p-4 text-sm leading-relaxed">
          <p className="mb-2 text-foreground/80">
            フォームが利用できない場合は、下記のメールアドレスまでご連絡ください。
          </p>
          <a
            href="mailto:shunaraika@gmail.com"
            className="break-all text-cyan underline underline-offset-2"
          >
            shunaraika@gmail.com
          </a>
        </div>

        <section className="mt-8 text-[11px] leading-relaxed text-muted">
          <p>
            ご連絡いただいた情報は、お問い合わせ対応の目的のみに使用します。
            詳細は{" "}
            <Link href="/legal" className="underline underline-offset-2 hover:text-accent">
              プライバシーポリシー
            </Link>{" "}
            をご参照ください。
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
