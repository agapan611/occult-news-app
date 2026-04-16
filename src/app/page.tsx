import Header from "@/components/Header";
import ArticleCard from "@/components/ArticleCard";
import { getAllArticles } from "@/lib/articles";

export default function Home() {
  const days = getAllArticles();

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-lg flex-1">
        {days.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-muted">
            <p className="text-4xl mb-4">&#128065;</p>
            <p className="text-sm">まだ記事がありません</p>
            <p className="text-xs mt-1">スケジュールタスクが記事を生成するまでお待ちください</p>
          </div>
        ) : (
          days.map((day) => (
            <section key={day.date}>
              <div className="sticky top-14 z-40 border-b border-card-border bg-background/90 backdrop-blur-sm px-4 py-2">
                <time className="text-xs font-bold text-accent">
                  {formatDate(day.date)}
                </time>
              </div>
              {day.articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </section>
          ))
        )}
      </main>
      <footer className="border-t border-card-border py-6 text-center text-xs text-muted">
        <p>OCCULT WIRE - AI考察はエンタメです。事実とは異なる場合があります。</p>
      </footer>
    </>
  );
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00+09:00");
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const weekday = weekdays[d.getDay()];
  return `${month}月${day}日（${weekday}）`;
}
